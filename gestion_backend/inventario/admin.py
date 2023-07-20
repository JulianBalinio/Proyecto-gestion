# En este archivo se registran los modelos para la vista de Django-Admin
from django.contrib import admin
from .models import Categoria, Producto

admin.site.register(Categoria)
admin.site.register(Producto)