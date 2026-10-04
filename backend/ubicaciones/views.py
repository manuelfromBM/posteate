from rest_framework import permissions, viewsets
from .models import Region, Comuna, Sector
from .serializers import RegionSerializer, ComunaSerializer, SectorSerializer


class RegionViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar las Regiones.
    """
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["nombre"]


class ComunaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar las Comunas.
    Filtrable por región para búsquedas dinámicas en cascada.
    """
    # Usamos select_related para optimizar las consultas a la base de datos
    queryset = Comuna.objects.select_related("region").all()
    serializer_class = ComunaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["region"]  
    search_fields = ["nombre"]


class SectorViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver o editar los Sectores / Barrios.
    Filtrable por comuna para la selección final del usuario.
    """
    queryset = Sector.objects.select_related("comuna").all()
    serializer_class = SectorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["comuna"]  # Permite filtrar /api/sectores/?comuna=ID
    search_fields = ["nombre"]
