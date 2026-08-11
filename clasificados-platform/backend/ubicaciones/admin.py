from django.contrib import admin

from .models import Ciudad, Comuna


@admin.register(Ciudad)
class CiudadAdmin(admin.ModelAdmin):
    list_display = ["nombre", "region", "slug"]
    prepopulated_fields = {"slug": ("nombre",)}
    search_fields = ["nombre", "region"]


@admin.register(Comuna)
class ComunaAdmin(admin.ModelAdmin):
    list_display = ["nombre", "ciudad", "slug"]
    list_filter = ["ciudad"]
    prepopulated_fields = {"slug": ("nombre",)}
    search_fields = ["nombre"]
