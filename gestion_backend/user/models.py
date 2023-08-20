import uuid
from datetime import timedelta, timezone
from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class User(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    email_address = models.EmailField(unique=True, null=False, blank=False, error_messages={
                                      'unique': 'Correo electrónico en uso.'})
    phone = models.CharField(max_length=15, unique=True, null=False, blank=False, error_messages={
                             'unique': 'Número de teléfono ya registrado.'})
    password = models.CharField(max_length=16)
    failed_login_attempts = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    register_code = models.CharField(max_length=6, blank=True, null=True)
    register_code_created_at = models.DateTimeField(blank=True, null=True)
    reset_password_token = models.UUIDField(default=uuid.uuid4, editable=False)
    reset_password_token_created_at = models.DateTimeField(
        null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.set_password(self.password)
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
        self.save

    def is_reset_password_token_valid(self):
        if not self.reset_password_token_created_at:
            return False
        expiration_time = self.reset_password_token_created_at + \
            timedelta(hours=1)  # Expira después de 1 hora
        return expiration_time >= timezone.now()
