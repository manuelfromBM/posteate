"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { EstadoPublicacion, Publicacion } from "../types";

interface CambiarEstadoParams {
  slug: string;
  estado: EstadoPublicacion;
}

async function cambiarEstado({ slug, estado }: CambiarEstadoParams): Promise<Publicacion> {
  const { data } = await api.patch<Publicacion>(`/publicaciones/${slug}/`, { estado });
  return data;
}

export function useCambiarEstadoPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cambiarEstado,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["publicaciones"] });
      queryClient.invalidateQueries({ queryKey: ["publicacion", data.slug] });
    },
  });
}
