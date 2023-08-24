from django.db import models
from inventario.models import Product
from user.models import User


class Client(models.Model):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    dni = models.CharField(max_length=10, null=False, blank=False)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_date = models.DateField(blank=False, null=False)
    # No se si iria en orderDetails, pero como Orders maneja aspecto generales de la orden, clavo aca total_prices
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Order #{self.pk} - Date:{self.order_date}"


class OrderDetails(models.Model):
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(to=Order, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
