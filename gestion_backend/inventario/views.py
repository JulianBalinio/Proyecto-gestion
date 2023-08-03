from rest_framework.views import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import Product, Category
from .serializers import ProductoSerializer, CategorySerializer


class ProductosViewSet(ViewSet):
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

    @swagger_auto_schema(operation_description="Borrar producto en base a su ID.")
    def destroy(self, request, pk=None):
        try:
            producto = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryViewSet(ViewSet):
    @swagger_auto_schema(operation_description="Obtener todas las categorías.")
    def list(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=CategorySerializer)
    def create(self, request):
        category = request.data
        serializer = CategorySerializer(data=category)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
