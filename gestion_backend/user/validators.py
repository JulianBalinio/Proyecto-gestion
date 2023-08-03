import re
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


def validate_password(value):
    if len(value) < 8:
        raise ValidationError(
            'La contraseña debe tener al menos 8 caracteres.')

    if not any(char.isupper() for char in value):
        raise ValidationError(
            'La contraseña debe contener al menos una letra mayúscula.')

    if not any(char.islower() for char in value):
        raise ValidationError(
            'La contraseña debe contener al menos una letra minúscula.')

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
        raise ValidationError(
            'La contraseña debe contener al menos un caracter especial.')


name_validator = RegexValidator(
    regex=r'^[a-zA-Z]+$',
    message='El nombre debe contener solo letras.'
)

phone_validator = RegexValidator(
    regex=r'^(\+?54|0)(\d{10}|\d{2,4}\s?\d{6,10})$',
    message='El número de teléfono debe tener un formato válido'
)
