from rest_framework import serializers

from .models import ImagenPublicacion, Publicacion


class ImagenPublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenPublicacion
        fields = ["id", "imagen", "orden"]


class PublicacionSerializer(serializers.ModelSerializer):
    imagenes = ImagenPublicacionSerializer(many=True, read_only=True)
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)
    subcategoria_nombre = serializers.CharField(
        source="subcategoria.nombre", read_only=True, default=None
    )
    ubicacion_nombre = serializers.CharField(source="ubicacion.nombre", read_only=True)
    usuario_nombre = serializers.CharField(source="usuario.username", read_only=True)

    class Meta:
        model = Publicacion
        fields = [
            "id",
            "titulo",
            "slug",
            "descripcion",
            "categoria",
            "categoria_nombre",
            "subcategoria",
            "subcategoria_nombre",
            "precio",
            "estado",
            "ubicacion",
            "ubicacion_nombre",
            "usuario",
            "usuario_nombre",
            "fecha_publicacion",
            "fecha_expiracion",
            "contacto",
            "imagenes",
        ]
        read_only_fields = ["id", "slug", "fecha_publicacion", "usuario"]
