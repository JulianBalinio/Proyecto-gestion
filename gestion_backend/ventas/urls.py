from django.urls import path
from .views import OrderViewset, OrderCreateView

urlpatterns = [
    path('orders/', OrderViewset.as_view({'get': 'list'}), name='order-list'),
    path('orders/<int:pk>/', OrderViewset.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'delete'}), name='order-detail'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
]
