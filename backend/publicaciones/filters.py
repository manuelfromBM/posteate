from typing import Any
import django_filters
from django.db.models import Q

from .models import Publicacion


class PublicacionFilter(django_filters.FilterSet):
    # Usamos '__slug' para interceptar el texto plano enviado por Next.js
    categoria = django_filters.CharFilter(field_name="categoria__slug", lookup_expr="exact")
    subcategoria = django_filters.CharFilter(field_name="subcategoria__slug", lookup_expr="exact")
    
    precio_min = django_filters.NumberFilter(field_name="precio", lookup_expr="gte")
    precio_max = django_filters.NumberFilter(field_name="precio", lookup_expr="lte")
    q = django_filters.CharFilter(method="filtrar_busqueda")

    class Meta:
        model = Publicacion
        fields = ["estado", "comuna", "sector"]

    def filtrar_busqueda(self, queryset: Any, name: str, value: Any) -> Any:
        return queryset.filter(Q(titulo__icontains=value) | Q(descripcion__icontains=value))
