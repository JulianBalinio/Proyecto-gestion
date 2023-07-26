# Se definen urls para inventario
from django.urls import path, include
from .views import ProductosViewSet
from rest_framework.routers import DefaultRouter

app_name = 'productos'
router = DefaultRouter()

router.register(
    r'productos', ProductosViewSet, basename='productos'
)

urlpatterns = [path('', include(router.urls))]
