from django.db import models
from django.core.validators import RegexValidator

class User(models.Model):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)

    email_address = models.EmailField(
        unique=True,
        error_messages= {'unique': 'Correo electrónico en uso.'}
    )

    phone_regex = r'^(\+?54|0)(\d{10}|\d{2,4}\s?\d{6,10})$'
    phone_validator = RegexValidator(
        regex = phone_regex,
        message = 'El número de teléfono debe tener un formato válido'
    )
    phone = models.CharField(
        validators=[phone_validator], 
        max_length=15, 
        unique=True,
        error_messages={'unique': 'Número de teléfono ya registrado.'}
        )
    password = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
