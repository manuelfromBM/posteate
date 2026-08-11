import django_filters
from django.db.models import Q

from .models import Publicacion


class PublicacionFilter(django_filters.FilterSet):
    precio_min = django_filters.NumberFilter(field_name="precio", lookup_expr="gte")
    precio_max = django_filters.NumberFilter(field_name="precio", lookup_expr="lte")
    q = django_filters.CharFilter(method="filtrar_busqueda")

    class Meta:
        model = Publicacion
        fields = [
            "categoria",
            "subcategoria",
            "estado",
            "ubicacion",
            "precio_min",
            "precio_max",
            "q",
        ]

    def filtrar_busqueda(self, queryset, name, value):
        return queryset.filter(Q(titulo__icontains=value) | Q(descripcion__icontains=value))
