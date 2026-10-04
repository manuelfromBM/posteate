from typing import cast

from rest_framework import permissions, viewsets

from usuarios.models import Usuario

from .filters import PublicacionFilter
from .models import ImagenPublicacion, Publicacion
from .serializers import ImagenPublicacionSerializer, PublicacionSerializer


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return True
        usuario = cast(Usuario, request.user)
        return obj.usuario_id == usuario.pk


class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.select_related(
        "categoria", "subcategoria", "comuna", "usuario"
    ).prefetch_related("imagenes")
    
    serializer_class = PublicacionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_class = PublicacionFilter
    search_fields = ["titulo", "descripcion"]
    ordering_fields = ["precio", "fecha_publicacion"]
    lookup_field = "slug"

    def perform_create(self, serializer) -> None:
        serializer.save(usuario=self.request.user)


class ImagenPublicacionViewSet(viewsets.ModelViewSet):
    queryset = ImagenPublicacion.objects.select_related("publicacion").all()
    serializer_class = ImagenPublicacionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["publicacion"]
