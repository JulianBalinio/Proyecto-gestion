from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password, check_password
from user.validators import name_validator, phone_validator


class User(models.Model):

    first_name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        validators=[name_validator]
    )

    last_name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        validators=[name_validator]
    )

    email_address = models.EmailField(
        unique=True,
        error_messages={'unique': 'Correo electrónico en uso.'}
    )

    phone = models.CharField(
        validators=[phone_validator],
        max_length=15,
        unique=True,
        error_messages={'unique': 'Número de teléfono ya registrado.'}
    )

    password = models.CharField(max_length=32)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
