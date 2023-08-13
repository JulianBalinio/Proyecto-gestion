# Serializadores para el front
from django.db.models import F
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


class PriceUpdateSerializer(serializers.Serializer):
    update_type = serializers.ChoiceField(choices=['price', 'percentage'])
    new_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False)
    percentage = serializers.DecimalField(
        max_digits=5, decimal_places=2, required=False)


class ProductUpdateSerializer(serializers.Serializer):
    category = serializers.CharField(required=False)
    brand = serializers.CharField(required=False)
    price_update = PriceUpdateSerializer()

    def update_prices(self, products):
        update_data = self.validated_data.get('price_update', {})  # Obtener los datos de actualización, o un diccionario vacío si no está presente
        update_type = update_data.get('update_type')
        new_price = update_data.get('new_price')
        percentage = update_data.get('percentage')

        if update_type == 'price':
            if not new_price:
                raise serializers.ValidationError(
                    {'error': 'Se requiere el precio de actualización para finalizar la acción.'})
            products.update(price=F('price') + new_price)
        elif update_type == 'percentage':
            if not percentage:
                raise serializers.ValidationError(
                    {'error': 'El porcentaje de actualización es requerido para finalizar la acción.'})
            products.update(price=F('price') * (1 + percentage / 100))

        return products
