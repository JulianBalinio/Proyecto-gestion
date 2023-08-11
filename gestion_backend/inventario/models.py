from django.db import models
from user.models import User


class Category(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)

    def __str__(self):
        return self.name


class Brands(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)

    def __str__(self):
        return self.name


class Suppliers(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)
    address = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    code = models.CharField(max_length=20)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, null=False, blank=False)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    last_edit_date = models.DateTimeField(blank=True, null=True)
    supplier = models.ForeignKey(
        to=Suppliers, on_delete=models.CASCADE, null=True)
    brand = models.ForeignKey(to=Brands, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


# El modelo Inventory representa el inventario de un usuario específico.


class Inventory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='ProductInventory')

    def __str__(self):
        return f"Inventario de {self.user}"

# El modelo ProductInventory establece una relación entre un inventario y un producto específico
# Almacena la cantidad de un producto en un inventario determinado


class ProductInventory(models.Model):
    inventory_user = models.ForeignKey(
        Inventory,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product} - Cantidad: {self.quantity}"
