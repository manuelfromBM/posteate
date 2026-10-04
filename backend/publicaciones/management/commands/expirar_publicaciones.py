from django.core.management.base import BaseCommand
from django.utils import timezone

from publicaciones.models import EstadoPublicacion, Publicacion


class Command(BaseCommand):
    help = "Marca como finalizadas las publicaciones cuya fecha de expiración ya pasó."

    def handle(self, *args, **options) -> None:
        actualizadas = (
            Publicacion.objects.filter(
                fecha_expiracion__lt=timezone.now(),
            )
            .exclude(estado=EstadoPublicacion.FINALIZADO)
            .update(estado=EstadoPublicacion.FINALIZADO)
        )
        self.stdout.write(
            self.style.SUCCESS(f"{actualizadas} publicación(es) marcada(s) como finalizada(s).")
        )
