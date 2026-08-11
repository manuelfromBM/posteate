from django.contrib import admin

from .models import Categoria, Subcategoria


class SubcategoriaInline(admin.TabularInline):
    model = Subcategoria
    extra = 1
    prepopulated_fields = {"slug": ("nombre",)}


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ["nombre", "slug", "orden"]
    prepopulated_fields = {"slug": ("nombre",)}
    search_fields = ["nombre"]
    inlines = [SubcategoriaInline]


@admin.register(Subcategoria)
class SubcategoriaAdmin(admin.ModelAdmin):
    list_display = ["nombre", "categoria", "slug"]
    list_filter = ["categoria"]
    prepopulated_fields = {"slug": ("nombre",)}
    search_fields = ["nombre"]
