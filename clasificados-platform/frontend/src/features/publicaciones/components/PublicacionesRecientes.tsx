"use client";

import { usePublicacion } from "../hooks/usePublicacion";
import { publicacionesRecientesMock } from "../mocks";
import { PublicacionesGrid } from "./PublicacionesGrid";

const SLUG_CONECTADO_AL_BACKEND = "se-busca-ayudante-de-bodega";

export function PublicacionesRecientes() {
  const { data: publicacionReal } = usePublicacion(SLUG_CONECTADO_AL_BACKEND);

  const publicaciones = publicacionesRecientesMock.map((item) =>
    item.publicacion.slug === SLUG_CONECTADO_AL_BACKEND && publicacionReal
      ? { ...item, publicacion: publicacionReal }
      : item
  );

  return <PublicacionesGrid publicaciones={publicaciones} />;
}
