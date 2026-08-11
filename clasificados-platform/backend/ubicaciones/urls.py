from rest_framework.routers import DefaultRouter

from .views import CiudadViewSet, ComunaViewSet

router = DefaultRouter()
router.register("ciudades", CiudadViewSet, basename="ciudad")
router.register("comunas", ComunaViewSet, basename="comuna")

urlpatterns = router.urls
