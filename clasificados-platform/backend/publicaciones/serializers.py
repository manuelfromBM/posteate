from rest_framework import serializers

from .models import ImagenPublicacion, Publicacion


class ImagenPublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenPublicacion
        fields = ["id", "imagen", "orden"]


class PublicacionSerializer(serializers.ModelSerializer):
    imagenes = ImagenPublicacionSerializer(many=True, read_only=True)
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)
    categoria_slug = serializers.CharField(source="categoria.slug", read_only=True)
    categoria_icono = serializers.CharField(source="categoria.icono", read_only=True)
    subcategoria_nombre = serializers.CharField(
        source="subcategoria.nombre", read_only=True, default=None
    )
    
    # 🇨🇱 CORRECCIÓN 1: Cambiamos 'ubicacion.nombre' por 'comuna.nombre' (o 'sector.nombre')
    ubicacion_nombre = serializers.CharField(source="comuna.nombre", read_only=True)
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
            "categoria_slug",
            "categoria_icono",
            "subcategoria",
            "subcategoria_nombre",
            "precio",
            "recompensa",
            "estado",
            "comuna", 
            "ubicacion_nombre",
            "usuario",
            "usuario_nombre",
            "fecha_publicacion",
            "fecha_expiracion",
            "contacto",
            "imagenes",
        ]
        read_only_fields = ["id", "slug", "fecha_publicacion", "usuario"]
