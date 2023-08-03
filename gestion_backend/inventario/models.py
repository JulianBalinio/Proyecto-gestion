from django.db import models
from user.models import User

# El modelo Category representa las categorías a las que pueden pertenecer los productos

class Category(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)

    def __str__(self):
        return self.name
    

'''El modelo Product representa los productos en tu sistema. Cada producto tiene un nombre, un código,
un stock (cantidad en inventario), un precio y está asociado a una categoría'''

class Product(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    code = models.CharField(max_length=20, null=False, blank=False)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

''' El modelo Inventory representa el inventario de un usuario específico. Tiene una relación uno a uno con un usuario
y está relacionado con los productos a través del modelo ProductInventory '''

class Inventory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='ProductInventory')

    def __str__ (self):
        return f"Inventario de {self.user}"

# El modelo ProductInventory establece una relación entre un inventario y un producto específico
# Almacena la cantidad de un producto en un inventario determinado

class ProductInventory(models.Model):
    user_inventory = models.ForeignKey(
        Inventory, 
        on_delete=models.CASCADE, 
        related_name='inventory_product'
        )
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product} - Cantidad: {self.quantity}"