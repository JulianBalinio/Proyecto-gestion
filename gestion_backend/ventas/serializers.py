from rest_framework import serializers
from .models import OrderDetails, Product, Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_date',)


class OrderDetailsSerializer(serializers.ModelSerializer):
    order_date = serializers.SerializerMethodField()

    class Meta:
        model = OrderDetails
        fields = [
            'id',
            'order',
            'client',
            'product',
            'quantity',
            'order_date'
        ]
        extra_kwargs = {
            'id': {'required': False},
            'client': {'required': False},
            'order': {'required': False}
        }

    def get_order_date(self, obj):
        return obj.order.order_date

    def create(self, validated_data):
        # Obtiene el ID del producto de la data validada
        product_id = validated_data.get('product')

        # Busca la instancia de producto correspondiente al ID
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError(
                {'product': f'Producto con ID {product_id} no encontrado.'})

        # Actualiza la data validada con la instancia de producto
        validated_data['product'] = product

        # Crea y devuelve el detalle de la orden
        return OrderDetails.objects.create(**validated_data)
