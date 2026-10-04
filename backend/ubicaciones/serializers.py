from rest_framework import serializers

from .models import Ciudad, Comuna


class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = ["id", "nombre", "region", "slug"]


class ComunaSerializer(serializers.ModelSerializer):
    ciudad_nombre = serializers.CharField(source="ciudad.nombre", read_only=True)

    class Meta:
        model = Comuna
        fields = ["id", "nombre", "ciudad", "ciudad_nombre", "slug"]
