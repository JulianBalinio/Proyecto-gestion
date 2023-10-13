from django.urls import path
from .views import OrderViewset, OrderDetailsViewset

urlpatterns = [
    path('orders/', OrderViewset.as_view({'get': 'list', 'post': 'create'}), name='order-list'),
    path('orders/<int:pk>/', OrderViewset.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'delete'}), name='order-data'), ##Corregir nombre
    path('order_details/<int:pk>/', OrderDetailsViewset.as_view({'get': 'retrieve'}), name='order-details')
]
