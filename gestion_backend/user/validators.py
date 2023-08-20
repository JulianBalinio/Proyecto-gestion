import re
import secrets
from datetime import timedelta, timezone
from django.core.validators import RegexValidator
from django.core.mail import send_mail
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

def generate_code():
    return str(secrets.randbelow(900000) + 100000)

def send_code_email(user, subject, message_template, code_field, created_at_field):
    """
    Genera y envía un código de verificación por correo electrónico.

    Args:
        user (User): El usuario al que se le enviará el código.
        subject (str): El asunto del correo electrónico.
        message_template (str): Plantilla del mensaje que incluye el código y la fecha de expiración.
        code_field (str): Nombre del campo de código en el modelo User.
        created_at_field (str): Nombre del campo de creación del código en el modelo User.
    """
    code = generate_code()
    
    setattr(user, code_field, code)
    setattr(user, created_at_field , timezone.now())
    user.save()

    code_expiration_time = getattr(user, created_at_field) + timedelta(minutes = 15)

    message = message_template.format(code, code_expiration_time.strftime("%Y-%m-%d %H:%M:%S"))
    from_email = 'gestion_noreply@gestion.com' #CAMBIAR
    recipient_list = [user.email_address]
    send_mail(subject, message, from_email, recipient_list)

def validate_code(user, code, subject, code_field, created_at_field):
    """
    Valida un código de verificación para un usuario específico.

    Args:
        user (User): El usuario cuyo código se va a validar.
        code (str): El código a validar.
        subject (str): El asunto del código (por ejemplo, "Verificación" o "Restablecimiento de contraseña").
        code_field (str): Nombre del campo de código en el modelo User.
        created_at_field (str): Nombre del campo de creación del código en el modelo User.

    Raises:
        ValidationError: Si el código no es válido o ha expirado.
    """
    if not getattr(user, code_field):
        raise ValidationError(f"No hay un código de {subject.lower()} registrado.")
    
    if getattr(user, code_field) != code:
        raise ValidationError(f'Código de {subject.lower()} incorrecto.')
    
    expiration_time = getattr(user, created_at_field) + timedelta(minutes=15)
    if expiration_time <= timezone.now():
        raise ValidationError(f'El código de {subject.lower()} ha expirado.')