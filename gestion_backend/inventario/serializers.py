# Serializadores para el front
from rest_framework import serializers
from .models import Producto, Categoria


class ProductoSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id',
            'name',
            'code',
            'stock',
            'price',
            'category',
        ]

    def get_category(self, obj):
        return obj.category.name if obj.category else None


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
