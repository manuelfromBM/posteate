from rest_framework.routers import DefaultRouter

from .views import ImagenPublicacionViewSet, PublicacionViewSet

router = DefaultRouter()
router.register("publicaciones", PublicacionViewSet, basename="publicacion")
router.register("imagenes-publicacion", ImagenPublicacionViewSet, basename="imagenpublicacion")

urlpatterns = router.urls
