# from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from rest_framework.views import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action, APIView, api_view
from drf_yasg.utils import swagger_auto_schema
from .models import Product, Category, Suppliers, Brands
from .serializers import ProductoSerializer, CategorySerializer, BrandSerializer, SupplierSerializer, ProductUpdateSerializer


class ProductosViewSet(ViewSet):
    queryset = Product.objects.all()

    @swagger_auto_schema(operation_description="Obtener todos los productos.")
    def list(self, request):
        productos = Product.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Obtener un producto.")
    def retrieve(self, request, pk=None):
        try:
            producto = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductoSerializer(instance=producto)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Obtener opciones para agregar/editar productos.")
    @action(detail=False, methods=["GET"])
    def options(self, request):
        categories = Category.objects.all()
        suppliers = Suppliers.objects.all()
        brands = Brands.objects.all()

        category_serializer = CategorySerializer(categories, many=True)
        suppliers_serializer = SupplierSerializer(suppliers, many=True)
        brands_serializer = BrandSerializer(brands, many=True)

        options_data = {
            'categories': category_serializer.data,
            'suppliers': suppliers_serializer.data,
            'brands': brands_serializer.data,
        }

        return Response(options_data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=ProductoSerializer)
    def create(self, request):
        producto = request.data
        serializer = ProductoSerializer(data=producto)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ProductoSerializer)
    def update(self, request, pk=None):
        try:
            producto = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ProductUpdateSerializer, operation_description='Actualizar precios.')
    @action(detail=False, methods=["POST"])
    def update_prices(self, request):
        serializer = ProductUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        products = self.queryset

        if serializer.validated_data.get('category'):
            products = products.filter(
                category=serializer.validated_data['category'])

        if serializer.validated_data.get('brand'):
            products = products.filter(
                brand=serializer.validated_data['brand'])

        serializer.update_prices(products)

        return Response({'message': 'Precios actualizados correctamente.'}, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Borrar producto en base a su ID.")
    def destroy(self, request, pk=None):
        try:
            producto = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BaseCreateView(APIView):
    serializer_class = None
    model_class = None

    def create(self, request):
        instance_data = request.data
        serializer = self.serializer_class(data=instance_data)

        if serializer.is_valid():
            instance_name = instance_data.get('name')

            if self.model_class.objects.filter(name=instance_name).exists():
                return Response({'error': f'Esta {self.model_class.__name__} ya se encuentra definida.'}, status=status.HTTP_204_NO_CONTENT)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': 'Categoria ya definida'}, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(ViewSet, BaseCreateView):
    serializer_class = CategorySerializer
    model_class = Category

    @swagger_auto_schema(operation_description="Obtener todas las categorías.")
    def list(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=CategorySerializer)
    def create(self, request):
        # llamado a la funcion create de la clase BaseCreateView con super()
        return super().create(request)


class BrandViewSet(ViewSet, BaseCreateView):
    serializer_class = BrandSerializer
    model_class = Brands

    @swagger_auto_schema(operation_description="Obtener todas las marcas")
    def list(self, request):
        brands = Brands.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=BrandSerializer)
    def create(self, request):
        # llamado a la funcion create de la clase BaseCreateView con super()
        return super().create(request)


class SupplierViewSet(ViewSet):
    @swagger_auto_schema(operation_description="Obtener todas los proveedores")
    def list(self, request):
        suppliers = Suppliers.objects.all()
        serializer = BrandSerializer(suppliers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=SupplierSerializer)
    def create(self, request):
        supplier = request.data
        serializer = SupplierSerializer(data=supplier)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
