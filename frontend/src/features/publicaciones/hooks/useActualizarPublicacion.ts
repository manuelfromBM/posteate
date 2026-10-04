"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { NuevaPublicacionInput, Publicacion } from "../types";

interface ActualizarPublicacionParams {
  slug: string;
  input: Partial<NuevaPublicacionInput>;
}

async function actualizarPublicacion({
  slug,
  input,
}: ActualizarPublicacionParams): Promise<Publicacion> {
  const { data } = await api.patch<Publicacion>(`/publicaciones/${slug}/`, input);
  return data;
}

export function useActualizarPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: actualizarPublicacion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["publicaciones"] });
      queryClient.invalidateQueries({ queryKey: ["publicacion", data.slug] });
    },
  });
}
