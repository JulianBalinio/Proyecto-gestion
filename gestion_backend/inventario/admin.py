# En este archivo se registran los modelos para la vista de Django-Admin
from django.contrib import admin
from .models import Category, Product, Inventory

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Inventory)