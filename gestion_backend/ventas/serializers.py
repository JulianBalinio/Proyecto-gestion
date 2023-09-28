from rest_framework import serializers
from .models import OrderDetails


class OrderDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderDetails
        fields = [
            'id',
            'order',
            'client',
            'product',
            'quantity',
        ]
        extra_kwargs = {
            'id': {'required': False},
            'client': {'required': False},
            'order': {'required': False}
        }
