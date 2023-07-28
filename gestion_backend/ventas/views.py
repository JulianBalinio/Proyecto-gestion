from rest_framework.views import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
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

    def perform_create(self, serializer):
        serializer.save()