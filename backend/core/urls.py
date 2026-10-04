from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView  # 🌟 Importamos para la redirección

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("usuarios.urls")),
    path("api/", include("ubicaciones.urls")),
    path("api/", include("categorias.urls")),
    path("api/", include("publicaciones.urls")),
    
    # 🌟 Redirige la raíz '/' automáticamente a '/api/' para evitar el 404
    path("", RedirectView.as_view(url="/api/", permanent=False), name="index"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
