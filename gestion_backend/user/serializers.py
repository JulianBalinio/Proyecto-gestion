from rest_framework import serializers
from .models import User
from .validators import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email_address',
            'phone',
            'password'
        ]

class LoginSerializer(serializers.Serializer):
    email_address = serializers.EmailField()
    password = serializers.CharField(max_length=32)