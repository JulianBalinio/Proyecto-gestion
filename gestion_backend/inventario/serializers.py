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
        extra_kwargs = {
            'id': {'required': False}
        }


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
        extra_kwargs = {
            'id': {'required': False},
            'balance': {'required': False}
        }


class ProductoSerializer(serializers.ModelSerializer):
    category_label = serializers.SerializerMethodField()
    brand_label = serializers.SerializerMethodField()
    supplier_label = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'code',
            'stock',
            'price',
            'category',
            'category_label',
            'brand',
            'brand_label',
            'supplier',
            'supplier_label',
            'last_edit_date'
        ]
        extra_kwargs = {
            'category': {'required': False},
            'category_label': {'required': False},
            'brand': {'required': False},
            'supplier': {'required': False},
        }

    def get_category_label(self, obj):
        return obj.category.name if obj.category else None
    
    def get_brand_label(self, obj):
        return obj.brand.name if obj.brand else None
    
    def get_supplier_label(self, obj):
        return obj.supplier.name if obj.supplier else None
