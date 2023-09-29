import random
import string
import uuid
from datetime import timedelta, timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El campo de correo electrónico es obligatorio.")
        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)  # Aquí estableces la contraseña correctamente
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superusuario debe tener is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superusuario debe tener is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, default='')
    name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(unique=True, null=False, blank=False, error_messages={
                                      'unique': 'Correo electrónico en uso.'})
    is_staff = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True) 
    phone = models.CharField(max_length=15, null=False, blank=False)
    password = models.CharField(max_length=16)
    failed_login_attempts = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    register_code = models.CharField(max_length=6, blank=True, null=True)
    register_code_created_at = models.DateTimeField(blank=True, null=True)
    reset_password_token = models.UUIDField(default=uuid.uuid4, editable=False)
    reset_password_token_created_at = models.DateTimeField(
        null=True, blank=True)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()  # Utiliza el UserManager predeterminado

    def __str__(self):
        return f"{self.name}"
    
    def get_by_natural_key(self, username):
        return self.get(username=username)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def save(self, *args, **kwargs):
        if not self.username:
            random_part = ''.join(random.choices(
                string.ascii_letters + string.digits, k=6))
            self.username = f"{self.name}_{random_part}"

        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def change_password(self, current_password, new_password):
        if not check_password(current_password, self.password):
            raise ValueError("Contraseña actual incorrecta.")

        if check_password(new_password, self.password):
            raise ValueError(
                "La nueva contraseña debe ser diferente a la actual.")

        self.password = make_password(new_password)
        self.save()

    def is_reset_password_token_valid(self):
        if not self.reset_password_token_created_at:
            return False
        expiration_time = self.reset_password_token_created_at + \
            timedelta(hours=1)  # Expira después de 1 hora
        return expiration_time >= timezone.now()

