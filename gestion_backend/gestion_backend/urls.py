from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from user.views import UserSignIn, UserSignUp

schema_view = get_schema_view(
    openapi.Info(
        title="GESTION API",
        default_version='v1',
        description="API documentation",
        terms_of_service="https://www.myapp.com/terms/",
        contact=openapi.Contact(email="contact@myapp.com"),
        license=openapi.License(name="Licencia"),
    ),
    public=False,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include('inventario.urls', namespace='inventario')),
    path('user/', include('user.urls')),
    path('sign_in/', UserSignIn.as_view(), name='sign_in'),
    path('sign_up/', UserSignUp.as_view(), name='sign_up'),
    path('ventas/', include('ventas.urls'))
]

if settings.DEBUG:
    urlpatterns += [
        path('swagger/', schema_view.with_ui('swagger',
             cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc',
             cache_timeout=0), name='schema-redoc'),
        path('admin/', admin.site.urls),
    ]
