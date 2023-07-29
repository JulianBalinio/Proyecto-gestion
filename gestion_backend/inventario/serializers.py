# Serializadores para el front
from rest_framework import serializers
from .models import Producto, Categoria


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            'id',
            'name',
            'stock',
            'price',
            'category',
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = [
            'id',
            'name',
        ]
        extra_kwargs = {
            'id': {'required': False}
        }
