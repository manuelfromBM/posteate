"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

async function eliminarPublicacion(slug: string): Promise<void> {
  await api.delete(`/publicaciones/${slug}/`);
}

export function useEliminarPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarPublicacion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publicaciones"] });
    },
  });
}
