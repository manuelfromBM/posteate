from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    icono = models.CharField(max_length=50, blank=True)
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ["orden", "nombre"]

    def __str__(self) -> str:
        return self.nombre


class Subcategoria(models.Model):
    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, related_name="subcategorias"
    )
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        verbose_name = "Subcategoría"
        verbose_name_plural = "Subcategorías"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return f"{self.categoria.nombre} > {self.nombre}"
