# backend/publicaciones/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PublicacionViewSet, ImagenPublicacionViewSet

# Creamos un router específico para este módulo
router = DefaultRouter()

# Registramos el endpoint 'publicaciones' apuntando a su ViewSet correspondiente
router.register(r"publicaciones", PublicacionViewSet, basename="publicacion")
router.register(r"imagenes-publicacion", ImagenPublicacionViewSet, basename="imagen-publicacion")

urlpatterns = [
    # Incluye de forma nativa todas las rutas generadas por el router (GET, POST, GET por ID, etc.)
    path("", include(router.urls)),
]
