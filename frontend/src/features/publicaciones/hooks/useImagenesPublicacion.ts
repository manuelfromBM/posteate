"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { ImagenPublicacion } from "../types";

interface SubirImagenParams {
  publicacionId: number;
  archivo: File;
  orden: number;
}

async function subirImagen({
  publicacionId,
  archivo,
  orden,
}: SubirImagenParams): Promise<ImagenPublicacion> {
  const formData = new FormData();
  formData.append("publicacion", String(publicacionId));
  formData.append("imagen", archivo);
  formData.append("orden", String(orden));

  const { data } = await api.post<ImagenPublicacion>("/imagenes-publicacion/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

async function eliminarImagen(id: number): Promise<void> {
  await api.delete(`/imagenes-publicacion/${id}/`);
}

export function useImagenesPublicacion() {
  const queryClient = useQueryClient();

  const subir = useMutation({ mutationFn: subirImagen });
  const eliminar = useMutation({
    mutationFn: eliminarImagen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publicaciones"] });
    },
  });

  return { subir, eliminar };
}
