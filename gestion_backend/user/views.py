import uuid
from datetime import timedelta
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from .models import User
from .serializers import LoginSerializer, ChangePasswordSerializer, CustomUserTokenSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomUserTokenSerializer


class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Token válido'}, status=status.HTTP_200_OK)


class UserSignIn(generics.GenericAPIView):
    serializer_class = LoginSerializer

    @method_decorator(ratelimit(key='ip', rate='10/h', method=['POST'], block=True))
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Se busca al usuario en base al correo
        user = User.objects.filter(
            email=serializer.validated_data['email']).first()

        if user is None:
            return Response({'error': 'El usuario no existe.'}, status=status.HTTP_404_NOT_FOUND)

        # Corrobora si las credenciales/datos son válidos
        if user is not None and not user.check_password(serializer.validated_data['password']):
            # Incrementar el contador de intentos fallidos de inicio de sesión
            user.failed_login_attempts += 1
            user.save()
            # Si hay 10 o más intentos fallidos, bloquear el inicio de sesión
            if user.failed_login_attempts >= 10:
                user.is_active = False
                user.save()

            return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Restablecer el contador de intentos fallidos si el inicio de sesión es exitoso
        user.is_active = True
        user.failed_login_attempts = 0
        user.save()

        # Se genera un token de actualización para el usuario
        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)

        # El token de acceso se devuelve como respuesta
        return Response({'access_token': access_token, 'refresh_token': refresh_token}, status=status.HTTP_200_OK)


class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Buscar al usuario actual basado en el token de autenticación
        user = request.user
        try:
            # Cambiar la contraseña del usuario
            user.change_password(
                serializer.validated_data['current_password'], serializer.validated_data['new_password'])
            return Response({'detail': 'Contraseña cambiada exitosamente.'}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Se obtiene correo del usuario

        try:
            # Se busca el usuario que coincida con el correo en la base de datos
            user = User.objects.get(email_address=email)

            # Se busca si el usuario esta verificado
            if not user.is_verified:
                return Response({'error': 'La dirección de correo electrónico no se encuentra verificada.'}, status=status.HTTP_400_BAD_REQUEST)

            # Se genera el token de reseteo en caso de que se encuentre
            user.reset_password_token = uuid.uuid4()
            # Se guarda el momento de creacion del token
            user.reset_password_token_created_at = timezone.now()
            user.save()

            # Enviar correo al usuario
            subject = 'Restablecimiento de contraseña.'
            message = f'Haga clic en el siguiente enlace para restablecer su contraseña.'
            from_email = 'gestion_noreply@gestion.com'  # CAMBIAR CORREO
            recipient_list = [user.email_address]
            # Se envia el correo con los datos antes declarados
            send_mail(subject, message, from_email, recipient_list)

            return Response({'message': 'Se ha enviado un correo electrónico para restablecer la contraseña.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'La dirección de correo electrónico no se encuentra registrada.'})


# @csrf_exempt
class ResetPasswordView(APIView):
    @ratelimit(key='ip', rate='3/h', method='POST', block=True)
    def post(self, request):
        # Se obtiene el token de reseteo y la contraseña
        reset_token = request.data.get('reset_token')
        new_password = request.data.get('new_password')
        try:
            # Se busca en la db el usuario que coincida con el token
            user = User.objects.get(reset_password_token=reset_token)

            # Cambiar a generar link

            # Se verifica si el usuario esta activo
            if not user.is_active:
                return Response({'error': 'El usuario no se encuentra activo.'}, status=status.HTTP_400_BAD_REQUEST)
            # Se verifica que el token de restablecimiento no haya expirado
            if user.reset_password_token_created_at + timedelta(minutes=30) < timezone.now():
                return Response({'error': 'El token de restablecimiento de contraseña ha expirado.'}, status=status.HTTP_400_BAD_REQUEST)

            # Restablecimiento de contraseña y almacenamiento de la misma
            user.set_password(new_password)
            # Se genera nuevo token de restablecimiento
            user.reset_password_token = uuid.uuid4()
            user.reset_password_token_created_at = None  # None, el token ya no es necesario
            user.save()

            # Enviar correo electrónico de confirmación al usuario
            subject = 'Contraseña restablecida'
            message = 'Su contraseña ha sido cambiada exitosamente.'
            from_email = 'gestion_noreply@gestion.com'  # CAMBIAR CORREO
            recipient_list = [user.email_address]
            send_mail(subject, message, from_email, recipient_list)

            return Response({'message': 'La contraseña ha sido restablecida correctamente.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'El token de restablecimiento es inválido.'}, status=status.HTTP_404_NOT_FOUND)


# @csrf_exempt  # Proteccion contra CSRF (Cross-Site Request Forgery)
class UserLogout(APIView):
    # Solo los usuarios autenticados pueden entrar a esta APIView
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Obtener el token de actualización
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({'error': 'Falta el token de actualización.'}, status=status.HTTP_400_BAD_REQUEST)
            # Revocar el token de actualización y acceso
            refresh = RefreshToken(refresh_token)
            # Se revoca token de acceso. Cierra la sesion y no se puede utilizar para solicitudes protegidas
            refresh.blacklist()
            # Redirigir a la página de inicio de sesión después del cierre de sesión exitoso
            return Response({'detail': 'Cierre de sesión exitoso.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': 'Error al cerrar la sesión.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
