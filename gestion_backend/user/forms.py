from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError 
from .models import User  # Importa tu modelo de usuario personalizado


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')  # Incluye 'password1' y 'password2'

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 != password2:
            raise ValidationError("Las contraseñas no coinciden. Inténtalo de nuevo.")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])  # Utiliza password1, ya que es la contraseña validada
        if commit:
            user.save()
        return user