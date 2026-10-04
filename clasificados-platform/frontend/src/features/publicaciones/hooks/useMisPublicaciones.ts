"use client";

import { useMemo } from "react";

import { useAuth } from "@/features/usuarios/hooks/useAuth";

import { usePublicaciones } from "./usePublicaciones";

// La API todavía no expone un filtro por usuario (ver PublicacionFilter en
// el backend), así que se listan las publicaciones de la primera página y
// se filtran en el cliente comparando con el username de la sesión.
export function useMisPublicaciones() {
  const { usuario } = useAuth();
  const query = usePublicaciones();

  const publicaciones = useMemo(() => {
    if (!usuario || !query.data) return [];
    return query.data.results.filter(
      (publicacion) => publicacion.usuario_nombre === usuario.username
    );
  }, [query.data, usuario]);

  return { ...query, publicaciones };
}
