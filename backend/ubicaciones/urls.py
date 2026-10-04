# Ejemplo de cómo debería verse en tu urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import RegionViewSet, ComunaViewSet, SectorViewSet

router = DefaultRouter()
router.register(r"regiones", RegionViewSet)
router.register(r"comunas", ComunaViewSet)
router.register(r"sectores", SectorViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
