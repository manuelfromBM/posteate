from django.db import models

class Region(models.Model):
    nombre = models.CharField(max_length=100)  # Ej: "Región Metropolitana de Santiago"
    numero_romano = models.CharField(max_length=10, blank=True)  
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Región"
        verbose_name_plural = "Regiones"
        ordering = ["id"]  # Ordenadas por su orden geográfico/histórico

    def __str__(self) -> str:
        return self.nombre


class Comuna(models.Model):
    nombre = models.CharField(max_length=100)  # Ej: "Melipilla"
    region: models.ForeignKey[Region] = models.ForeignKey(
        Region, on_delete=models.CASCADE, related_name="comunas"
    )
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Comuna"
        verbose_name_plural = "Comunas"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


class Sector(models.Model):
    nombre = models.CharField(max_length=100)  
    comuna: models.ForeignKey[Comuna] = models.ForeignKey(
        Comuna, on_delete=models.CASCADE, related_name="sectores"
    )
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Sector / Barrio"
        verbose_name_plural = "Sectores / Barrios"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return f"{self.nombre} ({self.comuna.nombre})"
