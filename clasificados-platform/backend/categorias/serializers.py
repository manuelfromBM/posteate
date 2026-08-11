from rest_framework import serializers

from .models import Categoria, Subcategoria


class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = ["id", "categoria", "nombre", "slug"]


class CategoriaSerializer(serializers.ModelSerializer):
    subcategorias = SubcategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ["id", "nombre", "slug", "icono", "orden", "subcategorias"]
