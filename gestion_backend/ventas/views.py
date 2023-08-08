from django.db import transaction
from rest_framework.views import Response
from rest_framework import status, generics
from rest_framework.viewsets import ViewSet
from drf_yasg.utils import swagger_auto_schema
from .models import OrderDetails
from .serializers import OrderDetailsSerializer

class OrderViewset(ViewSet):
    @swagger_auto_schema(operation_description="Obtener todas las ordenes de compra.")
    def list(self, request):
        orders = OrderDetails.objects.all()
        serializer = OrderDetailsSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Obtener una orden de compra.")
    def retrieve(self, request, pk=None):
        try:
            order = OrderDetails.objects.get(pk=pk)
        except OrderDetails.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrderDetailsSerializer(instance=order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #Create
    @swagger_auto_schema(operation_description="Crear orden de compra.")
    def create(self, request):
        serializer = OrderDetailsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Delete
    @swagger_auto_schema(operation_description="Eliminar orden de compra.")
    def delete(self, request, pk=None):
        try:
            order = OrderDetails.objects.get(pk=pk)
            order.delete()
            return Response({'message': 'Orden eliminada exitosamente.'})
        except OrderDetails.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        
    #Update
    @swagger_auto_schema(operation_description="Actualizar orden de compra.")
    def update(self, request, pk=None):
        try:
            order = OrderDetails.objects.get(pk=pk)
        except OrderDetails.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrderDetailsSerializer(instance=order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #List con filtrado
    @swagger_auto_schema(operation_description="Filtrar ordenes de compra.")
    def filter_list(self, request):
        status_filter = request.query_params.get('status', None)
        date_filter = request.query_params.get('date', None)

        orders = OrderDetails.objects.all()
        if status_filter:
            orders = orders.filter(status=status_filter)
        if date_filter:
            orders = orders.filter(date=date_filter)

        serializer = OrderDetailsSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderDetailsSerializer

    def perform_create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
    
        with transaction.atomic():
            order = serializer.save() #Crear la orden

            #Validacion y actualizacion de stock
            for order_item in order.orderdetails_set.all():
                product = order_item.product
                quantity = order_item.quantity

                #Chequear si el stock es suficiente para agregar a la orden
                if product.stock < quantity:
                    #Eliminar orden si no cumple el stock
                    order.delete()
                    return Response({'error': 'El stock de alguno de los productos es insuficiente con la cantidad solicitada.'}, status=status.HTTP_400_BAD_REQUEST)
                
                product.stock -= quantity #Se actualiza el stock en base a la cantidad enviada a la orden                
                product.save()
                    
            return Response({'message': 'Orden creada con éxito.'}, status=status.HTTP_201_CREATED)
