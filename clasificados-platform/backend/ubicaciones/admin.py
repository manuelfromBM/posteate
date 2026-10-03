from django.contrib import admin
from .models import Region, Comuna, Sector 

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "numero_romano")
    prepopulated_fields = {"slug": ("nombre",)}

@admin.register(Comuna)
class ComunaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "region")
    list_filter = ("region",)
    prepopulated_fields = {"slug": ("nombre",)}

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ("nombre", "comuna")
    list_filter = ("comuna__region", "comuna")
    prepopulated_fields = {"slug": ("nombre",)}
