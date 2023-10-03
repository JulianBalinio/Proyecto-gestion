from rest_framework import serializers
from .models import User
from inventario.models import Inventory
from .validators import validate_password
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserTokenSerializer(serializers.Serializer):
    access = serializers.SerializerMethodField()

    class Meta:
        model = User

    def get_access(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {
            'access': str(refresh.access_token),
        }


class InventarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, validators=[validate_password])
    inventory = InventarySerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'password',
            'inventory'
        ]


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=32)


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(max_length=32, write_only=True)
    new_password = serializers.CharField(
        max_length=32, write_only=True, validators=[validate_password])


class PasswordRequest(serializers.Serializer):
    email_address = serializers.EmailField()
