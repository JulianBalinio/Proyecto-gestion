import re
from django.core.exceptions import ValidationError

def validate_password(value):
    if len(value) < 8:
        raise ValidationError('La contraseña debe tener al menos 8 caracteres.')

    if not any(char.isupper() for char in value):
        raise ValidationError('La contraseña debe contener al menos una letra mayúscula.')

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
        raise ValidationError('La contraseña debe contener al menos un caracter especial (por ejemplo: !@#$%^&*(),.?":{}|<>).')
