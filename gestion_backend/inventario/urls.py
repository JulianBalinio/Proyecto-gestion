# Se definen urls para inventario
from django.urls import path
from .views import ProductosAPIView

urlpatterns = [
    path('productos/', ProductosAPIView.as_view(), name='productos'),
]