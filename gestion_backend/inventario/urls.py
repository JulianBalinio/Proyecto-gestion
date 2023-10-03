# Se definen urls para inventario
from django.urls import path, include
from .views import ProductosViewSet, CategoryViewSet, BrandViewSet, SupplierViewSet
from rest_framework.routers import DefaultRouter

app_name = 'inventario'
router = DefaultRouter()

router.register(
    r'productos', ProductosViewSet, basename='productos'
)
router.register(
    r'categories', CategoryViewSet, basename='categories'
)
router.register(
    r'brands', BrandViewSet, basename='brands'
)
router.register(
    r'suppliers', SupplierViewSet, basename='suppliers'
)



urlpatterns = [
    path('', include(router.urls)),
    ]

