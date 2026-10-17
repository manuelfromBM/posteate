"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { NuevaPublicacion, Publicacion } from "../types";

async function crearPublicacion(datos: NuevaPublicacion): Promise<Publicacion> {
  const { data } = await api.post<Publicacion>("/publicaciones/", datos);
  return data;
}

export function useCrearPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearPublicacion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publicaciones"] });
    },
  });
}
