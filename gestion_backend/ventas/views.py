from inventario.serializers import ProductoSerializer
from .serializers import OrderDetailsSerializer
from .models import Order, OrderDetails, Product
from drf_yasg.utils import swagger_auto_schema
from django.utils.translation import activate
from django.http import JsonResponse
from django.db.models import Sum
from decimal import Decimal
from datetime import timedelta
from rest_framework.views import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.utils import timezone
import pytz
import locale


class OrderViewset(ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="Obtener todas las ordenes de compra.")
    def list(self, request):
       # Establecer la localización en español
        locale.setlocale(locale.LC_TIME, 'es_ES.utf8')

        # Filtrar las órdenes del usuario
        orders = Order.objects.filter(user=request.user)

        # Obtener los detalles de la orden y sumar las cantidades
        order_details = OrderDetails.objects.filter(order__in=orders).values(
            'order').annotate(total_quantity=Sum('quantity'))

        # Diccionario de reemplazo de caracteres con tilde
        tilde_replacements = {
            'mi\u00c3\u00a9rcoles': 'Miércoles',
            's\u00c3\u00a1bado': 'Sábado',
            'lunes': 'Lunes',
            'martes': 'Martes',
            'jueves': 'Jueves',
            'viernes': 'Viernes',
            'domingo': 'Domingo',
        }

        result = []
        for order_detail in order_details:
            order_id = order_detail['order']
            total_quantity = order_detail['total_quantity']

            order_date = Order.objects.get(pk=order_id).order_date
            local_order_date = order_date.astimezone(
                pytz.timezone('America/Argentina/Buenos_Aires'))

            # Formatear la fecha y hora en el formato deseado
            formatted_date = local_order_date.strftime(
                "%A %d de %B a las %H:%M")

            # Reemplazar caracteres con tilde
            for tilde_char, replacement in tilde_replacements.items():
                formatted_date = formatted_date.replace(
                    tilde_char, replacement)
                print(formatted_date)

            # Obtener el total_price de la orden
            total_price = Order.objects.get(pk=order_id).total_price

            result.append({
                'id': order_id,
                'date': formatted_date,
                'totalQuantity': total_quantity,
                'totalPrice': total_price,
            })

        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_description="Crear orden de compra.")
    def create(self, request):
        order_details = request.data.get('order', [])
        serializer = OrderDetailsSerializer(data=order_details, many=True)

        if serializer.is_valid():
            with transaction.atomic():
                # Calcular el total_price
                total_price = Decimal('0')
                insufficient_stock_products = []

                for detail in serializer.validated_data:
                    product = detail['product']
                    quantity = detail['quantity']

                    # Verificar el stock del producto
                    if product.stock < quantity:
                        insufficient_stock_products.append(product.name)
                        continue

                    total_price += product.price * quantity

                # Si hay productos con stock insuficiente, generar un mensaje de error
                if insufficient_stock_products:
                    error_message = f"No hay suficiente stock para los siguientes productos: {', '.join(insufficient_stock_products)}"
                    return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

                # Crear la orden con total_price
                order = Order.objects.create(
                    user=request.user,
                    order_date=timezone.localtime(),
                    total_price=total_price
                )

                # Crear los detalles de la orden y reducir el stock de los productos
                order_details = [OrderDetails(
                    order=order, **item) for item in serializer.validated_data]
                OrderDetails.objects.bulk_create(order_details)

                for detail in serializer.validated_data:
                    product = detail['product']
                    quantity = detail['quantity']
                    product.stock -= quantity
                    product.save()

            return Response({'message': 'Orden creada con éxito.'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description="Eliminar orden de compra.")
    def delete(self, request, pk=None):
        """
        Elimina una orden de compra según su ID.
        Parámetros:
        - pk (int): ID de la orden de compra.

        Respuestas posibles:
        - Éxito:
            - Código de estado: 200
            - Contenido: {'message': 'Orden eliminada exitosamente.'}
        - No encontrado:
            - Código de estado: 404
            - Contenido: {'error': 'Orden no encontrada.'}

        """
        try:
            order = OrderDetails.objects.get(pk=pk)
            order.delete()
            return Response({'message': 'Orden eliminada exitosamente.'})
        except OrderDetails.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_description="Actualizar orden de compra.")
    def update(self, request, pk=None):
        """
        Actualiza una orden de compra según su ID.

        Parámetros:
        - pk (int): ID de la orden de compra.
        - orderdetails_set (list): Lista de items de la orden con productos y cantidades.
        Respuestas posibles:
        - Éxito:
            - Código de estado: 200
            - Contenido: Detalles de la orden de compra actualizada.
        - Errores de validación:
            - Código de estado: 400
            - Contenido: Errores de validación del serializador.
        - Errores de stock:
            - Código de estado: 409
            - Contenido: {'errors': [lista de errores de stock]}
        - No encontrado:
            - Código de estado: 404
            - Contenido: {'error': 'Orden no encontrada.'}

        """
        try:
            order = OrderDetails.objects.get(pk=pk)
        except OrderDetails.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderDetailsSerializer(instance=order, data=request.data)

        if serializer.is_valid():
            order_data = serializer.validated_data
            order_items = order_data.get('orderdetails_set', [])
            errors = validate_stock(order_items)

            if errors:
                return Response({'errors': errors}, status=status.HTTP_409_CONFLICT)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(operation_description="Filtrar ordenes de compra.")
    def filter_list(self, request):
        """
        Filtra las órdenes de compra según el estado y/o la fecha.
        Parámetros de consulta:
        - status (str, opcional): Estado de la orden.
        - date (str, opcional): Fecha de la orden en formato YYYY-MM-DD.

        Respuesta exitosa:
        - Código de estado: 200
        - Contenido: Lista de órdenes de compra filtradas.

        """
        status_filter = request.query_params.get('status', None)
        date_filter = request.query_params.get('date', None)

        orders = OrderDetails.objects.all()
        if status_filter:
            orders = orders.filter(status=status_filter)
        if date_filter:
            orders = orders.filter(date=date_filter)

        serializer = OrderDetailsSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderDetailsViewset(ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="Obtener los detalles de una orden a partir de su ID")
    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Orden no encontrada.'}, status=status.HTTP_404_NOT_FOUND)

         # Obtén los detalles de la orden para esa orden específica
        order_details = OrderDetails.objects.filter(order=order)

        # Crea una lista de objetos ProductSerializer para cada producto en los detalles de la orden
        product_ids = [
            order_detail.product.id for order_detail in order_details]
        products = Product.objects.filter(id__in=product_ids)
        product_data = ProductoSerializer(products, many=True).data

        # Crea una respuesta JSON que incluye nombre del producto, precio y cantidad
        response_data = []
        for order_detail in order_details:
            product_info = next(
                (product for product in product_data if product['id'] == order_detail.product.id), None)

            if product_info:
                # Convertir precio a número
                price = float(product_info['price'])
                quantity = order_detail.quantity
                # Calcular el total como número
                total = float(price * quantity)

                # Formatear el total con dos decimales
                total_formatted = "{:.2f}".format(total)

                response_data.append({
                    'id': product_info['id'],
                    'product': product_info['name'],
                    'price': product_info['price'],
                    'quantity': order_detail.quantity,
                    'total': total_formatted
                })

        return Response(response_data, status=status.HTTP_200_OK)


def validate_stock(order_items):
    """
    Realiza la validación del stock para los items de una orden de compra.
    Parámetros:
    - order_items (list): Lista de items de la orden.
    Retorna:
    - Lista de errores de stock.
    """
    errors = []

    for order_item in order_items:
        product = order_item['product']
        quantity = order_item['quantity']

        if product.stock < quantity:
            errors.append(
                f'Stock insuficiente para {product.name}. Cantidad requerida: {quantity}. Stock disponible: {product.stock}')

    return errors
