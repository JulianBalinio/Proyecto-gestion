# from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from rest_framework.views import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action, APIView, api_view
from drf_yasg.utils import swagger_auto_schema
from .models import Product, Category, Suppliers, Brands, Inventory, ProductInventory
from .serializers import ProductoSerializer, CategorySerializer, BrandSerializer, SupplierSerializer, ProductUpdateSerializer


class ProductosViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()

    @swagger_auto_schema(operation_description="Obtener todos los productos asociados a un usuario")
    def list(self, request):
        try:
            inventory = Inventory.objects.get(user=request.user)
        except Inventory.DoesNotExist:
            return Response(
                {"detail": "El inventario del usuario no existe."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Obtén los productos asociados al inventario del usuario
        productos = Product.objects.filter(
            productinventory__inventory_user=inventory)

        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Obtener opciones para agregar/editar productos asociados a un usuario")
    @action(detail=False, methods=["GET"])
    def options(self, request):
        categories = Category.objects.filter(user=request.user)
        suppliers = Suppliers.objects.filter(user=request.user)
        brands = Brands.objects.filter(user=request.user)

        category_serializer = CategorySerializer(categories, many=True)
        suppliers_serializer = SupplierSerializer(suppliers, many=True)
        brands_serializer = BrandSerializer(brands, many=True)

        options_data = {
            'category': category_serializer.data,
            'supplier': suppliers_serializer.data,
            'brand': brands_serializer.data,
        }

        return Response(options_data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=ProductoSerializer)
    def create(self, request):
        # Al crear un producto deberia comprobar si existe el inventario del usuario logueado
        try:
            inventory = Inventory.objects.get(user=request.user)
        except Inventory.DoesNotExist:
            return Response(
                {"detail": "El inventario del usuario no existe."},
                status=status.HTTP_404_NOT_FOUND
            )

        product = request.data
        serializer = ProductoSerializer(data=product)
        if serializer.is_valid():
            product = serializer.save()

            # Crea una relación entre el producto y el inventario del usuario
            ProductInventory.objects.create(
                inventory_user=inventory, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ProductoSerializer)
    def update(self, request, pk=None):
        try:
            # Buscar el producto a través de la relación con ProductInventory
            product_inventory = ProductInventory.objects.get(
                inventory_user__user=request.user, product_id=pk)
        except ProductInventory.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        # Obtener el producto asociado
        product = product_inventory.product

        # Actualizar el producto con los nuevos datos
        serializer = ProductoSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    ##TODO: Informar al usuario si intenta actualizar precios de categoria/marca/proveedor creados 
    ## pero los mismos no contienen ningun dato.
    @swagger_auto_schema(request_body=ProductUpdateSerializer, operation_description='Actualizar precios.')
    @action(detail=False, methods=["PUT"])
    def update_prices(self, request):
        serializer = ProductUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            inventory = Inventory.objects.get(user=request.user)
        except Inventory.DoesNotExist:
            return Response({'error': 'El inventario del usuario no existe.'}, status=status.HTTP_404_NOT_FOUND)

        products = Product.objects.filter(
            productinventory__inventory_user=inventory)

        if serializer.validated_data.get('category'):
            products = products.filter(
                category=serializer.validated_data['category'])

        if serializer.validated_data.get('supplier'):
            products = products.filter(
                supplier=serializer.validated_data['supplier'])

        if serializer.validated_data.get('brand'):
            products = products.filter(
                brand=serializer.validated_data['brand'])

        serializer.update_prices(products)

        return Response({'message': 'Precios actualizados correctamente.'}, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Borrar producto asociado a un usuario en base a su ID.")
    def destroy(self, request, pk=None):
        try:
            # Busco el producto a través de la relación con ProductInventory
            product_inventory = ProductInventory.objects.get(
                inventory_user__user=request.user, product_id=pk)
        except ProductInventory.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        product_inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # DEPRECATED: NO SE ESTA USANDO POR EL MOMENTO
    # @swagger_auto_schema(operation_description="Obtener un producto.")
    # def retrieve(self, request, pk=None):
    #     try:
    #         producto = Product.objects.get(pk=pk)
    #     except Product.DoesNotExist:
    #         return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    #     serializer = ProductoSerializer(instance=producto)
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class BaseCreateView(APIView):
    serializer_class = None
    model_class = None

    def create(self, request):
        instance_data = request.data
        serializer = self.serializer_class(data=instance_data)

        if serializer.is_valid():
            instance_name = instance_data.get('name')

            if self.model_class.objects.filter(user=request.user, name=instance_name).exists():
                return Response({'error': f'{self.model_class.__name__} ya se encuentra definido.'}, status=status.HTTP_204_NO_CONTENT)

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


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
        return super().create(request)


class SupplierViewSet(ViewSet, BaseCreateView):
    serializer_class = SupplierSerializer
    model_class = Suppliers

    @swagger_auto_schema(operation_description="Obtener todas los proveedores")
    def list(self, request):
        suppliers = Suppliers.objects.all()
        serializer = BrandSerializer(suppliers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=SupplierSerializer)
    def create(self, request):
        return super().create(request)
    
    # def create(self, request):
    #     supplier = request.data
    #     serializer = SupplierSerializer(data=supplier)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
