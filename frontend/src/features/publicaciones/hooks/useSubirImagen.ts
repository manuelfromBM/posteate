"use client";

import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { ImagenPublicacion } from "../types";

interface SubirImagenInput {
  publicacionId: number;
  archivo: File;
  orden: number;
}

async function subirImagen({ publicacionId, archivo, orden }: SubirImagenInput): Promise<ImagenPublicacion> {
  const formData = new FormData();
  formData.append("publicacion", String(publicacionId));
  formData.append("imagen", archivo);
  formData.append("orden", String(orden));

  const { data } = await api.post<ImagenPublicacion>("/imagenes-publicacion/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export function useSubirImagen() {
  return useMutation({ mutationFn: subirImagen });
}
