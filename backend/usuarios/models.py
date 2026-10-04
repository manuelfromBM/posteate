from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True)
    whatsapp = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.username
