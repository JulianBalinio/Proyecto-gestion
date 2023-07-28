from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer, LoginSerializer

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
        access_token = str(refresh.access_token)

        # El token de acceso se devuelve como respuesta
        return Response({'access_token': access_token}, status=status.HTTP_200_OK)
