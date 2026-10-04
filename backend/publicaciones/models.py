from django.conf import settings
from django.db import models
from django.utils.text import slugify
from typing import TYPE_CHECKING, Optional, Any

if TYPE_CHECKING:
    from categorias.models import Categoria, Subcategoria  
    from ubicaciones.models import Comuna, Sector


class EstadoPublicacion(models.TextChoices):
    ACTIVO = "activo", "Activo / Vigente"
    PAUSADO = "pausado", "Pausado"
    RESUELTO = "resuelto", "Resuelto / Terminado"
    EXPIRADO = "expirado", "Expirado"


class Publicacion(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    descripcion = models.TextField()
    
    categoria: models.ForeignKey["Categoria"] = models.ForeignKey(
        "categorias.Categoria", on_delete=models.PROTECT, related_name="publicaciones"
    )
    subcategoria: models.ForeignKey[Optional["Subcategoria"]] = models.ForeignKey(
        "categorias.Subcategoria",
        on_delete=models.PROTECT,
        related_name="publicaciones",
        null=True,
        blank=True,
    )
    
    precio = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    recompensa = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)
    
    estado = models.CharField(
        max_length=20,
        choices=EstadoPublicacion.choices,
        default=EstadoPublicacion.ACTIVO,
    )
    
    # 1. Comuna ahora es obligatoria (para búsquedas generales)
    comuna: models.ForeignKey["Comuna"] = models.ForeignKey(
        "ubicaciones.Comuna", 
        on_delete=models.PROTECT, 
        related_name="publicaciones"
    )
    
    # 2. Sector pasa a ser Opcional. 
    sector: models.ForeignKey[Optional["Sector"]] = models.ForeignKey(
        "ubicaciones.Sector", 
        on_delete=models.PROTECT, 
        related_name="publicaciones",
        null=True,
        blank=True
    )
    
    usuario: models.ForeignKey[Any] = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="publicaciones"
    )
    
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    fecha_expiracion = models.DateTimeField(null=True, blank=True)
    contacto = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Publicación"
        verbose_name_plural = "Publicaciones"
        ordering = ["-fecha_publicacion"]

    def __str__(self) -> str:
        return self.titulo

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            base_slug = slugify(self.titulo)[:200]
            slug = base_slug
            suffix = 1
            while Publicacion.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                suffix += 1
                slug = f"{base_slug}-{suffix}"
            self.slug = slug
        super().save(*args, **kwargs)


class ImagenPublicacion(models.Model):
    publicacion: models.ForeignKey[Publicacion] = models.ForeignKey(
        Publicacion, on_delete=models.CASCADE, related_name="imagenes"
    )
    imagen = models.ImageField(upload_to="publicaciones/")
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Imagen de publicación"
        verbose_name_plural = "Imágenes de publicación"
        ordering = ["orden"]

    def __str__(self) -> str:
        return f"Imagen de {self.publicacion.titulo}"
