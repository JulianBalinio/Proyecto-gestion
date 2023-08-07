from inventario.models import Category, Product
from django.test import TestCase


class InventarioSetup(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Cigarrillos")

        self.product = Product.objects.create(
            name="Lucky Strike", stock=20, price=200, category=self.category)
        self.product1 = Product.objects.create(
            name="Coca Cola", stock=30, price=700, category=self.category)
        self.product2 = Product.objects.create(
            name="Jorgelin", stock=40, price=600, category=self.category)
