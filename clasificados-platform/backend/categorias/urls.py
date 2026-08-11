from rest_framework.routers import DefaultRouter

from .views import CategoriaViewSet, SubcategoriaViewSet

router = DefaultRouter()
router.register("categorias", CategoriaViewSet, basename="categoria")
router.register("subcategorias", SubcategoriaViewSet, basename="subcategoria")

urlpatterns = router.urls
