from django.db import models


class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Ciudad"
        verbose_name_plural = "Ciudades"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


class Comuna(models.Model):
    nombre = models.CharField(max_length=100)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE, related_name="comunas")
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Comuna"
        verbose_name_plural = "Comunas"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return f"{self.nombre}, {self.ciudad.nombre}"
