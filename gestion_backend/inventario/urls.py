# Se definen urls para inventario
from django.urls import path, include
from .views import ProductosViewSet, CategoryViewSet
from rest_framework.routers import DefaultRouter

app_name = 'inventario'
router = DefaultRouter()

router.register(
    r'productos', ProductosViewSet, basename='productos'
)
router.register(
    r'categories', CategoryViewSet, basename='categories'
)

urlpatterns = [path('', include(router.urls))]
