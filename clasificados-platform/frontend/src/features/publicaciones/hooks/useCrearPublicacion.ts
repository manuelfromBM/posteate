"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { NuevaPublicacionInput, Publicacion } from "../types";

async function crearPublicacion(input: NuevaPublicacionInput): Promise<Publicacion> {
  const { data } = await api.post<Publicacion>("/publicaciones/", input);
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
