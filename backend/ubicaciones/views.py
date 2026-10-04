from rest_framework import permissions, viewsets

from .models import Ciudad, Comuna
from .serializers import CiudadSerializer, ComunaSerializer


class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["region"]
    search_fields = ["nombre"]


class ComunaViewSet(viewsets.ModelViewSet):
    queryset = Comuna.objects.select_related("ciudad").all()
    serializer_class = ComunaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["ciudad"]
    search_fields = ["nombre"]
