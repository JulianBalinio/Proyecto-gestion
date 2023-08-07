from django.contrib import admin
from .models import Category, Product, Inventory, Brands, Suppliers

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Inventory)
admin.site.register(Brands)
admin.site.register(Suppliers)
