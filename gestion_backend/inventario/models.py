from django.db import models

class Categoria(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)

class Producto(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    category = models.ForeignKey(to=Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre