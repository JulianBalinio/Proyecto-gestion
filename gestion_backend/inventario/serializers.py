# Serializadores para el front
from rest_framework import serializers
from .models import Product, Category, Brands, Suppliers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]
        extra_kwargs = {
            'id': {'required': False}
        }


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brands
        fields = [
            'id',
            'name',
        ]


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suppliers
        fields = [
            'id',
            'name',
            'address',
            'phone',
            'balance'
        ]


class ProductoSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'code',
            'stock',
            'price',
            'category_id',
            'category',
            'last_edit_date'
        ]
