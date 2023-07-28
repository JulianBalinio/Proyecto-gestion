from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action, permission_classes
from django.contrib.auth.hashers import make_password

from django.urls import reverse
from .models import User
from .serializers import UserSerializer, LoginSerializer, ChangePasswordSerializer

class UserSignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        raw_password = self.request.data.get('password')
        # Se encripta la contraseña
        serializer.validated_data['password'] = make_password(raw_password)
        super().perform_create(serializer)

class UserSignIn(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Se busca al usuario en base al correo
        user = User.objects.filter(email_address=serializer.validated_data['email_address']).first()

        # Corrobora si las credenciales/datos son válidos
        if user is None or not user.check_password(serializer.validated_data['password']):
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        
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
            user.change_password(serializer.validated_data['current_password'], serializer.validated_data['new_password'])
            return Response({'detail': 'Contraseña cambiada exitosamente.'}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserLogout(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    @permission_classes([IsAuthenticated])
    def logout(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                print(f"refresh_token recibido: {refresh_token}")
                redirect_url = reverse('sign_in') 
                return Response({'detail': 'Cierre de sesión exitoso.', 'redirect_to': redirect_url}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No se actualizo el token.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al cerrar la sesión.'}, status=status.HTTP_400_BAD_REQUEST)
    
    