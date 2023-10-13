from django.db import models
from inventario.models import Product
from user.models import User


class Client(models.Model):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    email_address = models.EmailField(unique=True, null=False, blank=False, error_messages={
        'unique': 'El correo electrónico ya se encuentra asociado a un cliente.'
    })
    phone = models.CharField(max_length=15, unique=True, null=False, blank=False, error_messages={
        'unique': 'El número de teléfono ya se encuentra asociado a un cliente.'
    })
    street_address = models.CharField(max_length=100, null=False, blank=False)
    debt = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    credit = models.DecimalField(max_digits=10, decimal_places=2, default=0)


class Order(models.Model):
    # OPCIONES = [
    #     ('porcentaje', 'Porcentaje'),
    #     ('precio', 'Precio'),
    # ]
    # discount_type = models.CharField(max_length=10, choices=OPCIONES)
    order_date = models.DateTimeField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Orden #{self.pk} - Fecha y Hora: {self.order_date}"


class OrderDetails(models.Model):
    order = models.ForeignKey(to=Order, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
