from django.db import models

# Claves de íconos soportadas por el frontend (lucide-react).
# Si agregas una clave nueva aquí, agrégala también en
# frontend/src/features/categorias/icons.tsx.
ICONOS_DISPONIBLES = [
    ("home", "Casa"),
    ("shopping-bag", "Bolsa de compras"),
    ("car", "Auto"),
    ("briefcase", "Maletín"),
    ("wrench", "Llave inglesa"),
    ("party-popper", "Fiesta"),
    ("paw-print", "Huella de mascota"),
    ("search", "Lupa"),
    ("tag", "Etiqueta"),
    ("megaphone", "Megáfono"),
    ("newspaper", "Periódico"),
    ("sparkles", "Destellos"),
]


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    icono = models.CharField(
        max_length=50,
        blank=True,
        choices=ICONOS_DISPONIBLES,
        help_text="Ícono mostrado en el frontend (lucide-react).",
    )
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
