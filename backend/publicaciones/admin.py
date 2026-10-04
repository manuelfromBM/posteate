from django.contrib import admin

from .models import ImagenPublicacion, Publicacion


class ImagenPublicacionInline(admin.TabularInline):
    model = ImagenPublicacion
    extra = 1


@admin.register(Publicacion)
class PublicacionAdmin(admin.ModelAdmin):
    list_display = [
        "titulo",
        "categoria",
        "subcategoria",
        "estado",
        "precio",
        "comuna",     
        "sector",     
        "usuario",
        "fecha_publicacion",
        "fecha_expiracion",
    ]
    list_filter = ["estado", "categoria", "subcategoria", "comuna", "sector"] 
    search_fields = ["titulo", "descripcion"]
    prepopulated_fields = {"slug": ("titulo",)}
    inlines = [ImagenPublicacionInline]


@admin.register(ImagenPublicacion)
class ImagenPublicacionAdmin(admin.ModelAdmin):
    list_display = ["publicacion", "orden"]
    list_filter = ["publicacion"]
