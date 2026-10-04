from rest_framework import permissions, viewsets

from .models import Categoria, Subcategoria
from .serializers import CategoriaSerializer, SubcategoriaSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.prefetch_related("subcategorias").all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["nombre"]


class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = Subcategoria.objects.select_related("categoria").all()
    serializer_class = SubcategoriaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["categoria"]
    search_fields = ["nombre"]
