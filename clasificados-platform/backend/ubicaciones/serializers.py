from rest_framework import serializers
from .models import Region, Comuna, Sector


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ["id", "nombre", "numero_romano", "slug"]


class ComunaSerializer(serializers.ModelSerializer):
    # Trae el nombre de la región de forma directa para el listado en el Frontend
    region_nombre = serializers.CharField(source="region.nombre", read_only=True)

    class Meta:
        model = Comuna
        fields = ["id", "nombre", "region", "region_nombre", "slug"]


class SectorSerializer(serializers.ModelSerializer):
    # Trae el nombre de la comuna de forma directa
    comuna_nombre = serializers.CharField(source="comuna.nombre", read_only=True)

    class Meta:
        model = Sector
        fields = ["id", "nombre", "comuna", "comuna_nombre", "slug"]
