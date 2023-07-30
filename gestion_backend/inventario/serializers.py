# Serializadores para el front
from rest_framework import serializers
from .models import Producto, Categoria


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


class ProductoSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='category',
        write_only=True
    )
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id',
            'name',
            'code',
            'stock',
            'price',
            'category_id',
            'category',
        ]
