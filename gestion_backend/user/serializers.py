from rest_framework import serializers
from .models import User
from inventario.models import Inventory
from .validators import validate_password


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
            'email_address',
            'phone',
            'password',
            'inventory'
        ]


class LoginSerializer(serializers.Serializer):
    email_address = serializers.EmailField()
    password = serializers.CharField(max_length=32)


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(max_length=32, write_only=True)
    new_password = serializers.CharField(
        max_length=32, write_only=True, validators=[validate_password])


class PasswordRequest(serializers.Serializer):
    email_address = serializers.EmailField()
