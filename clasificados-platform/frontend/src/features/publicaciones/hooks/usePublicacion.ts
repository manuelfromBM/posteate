import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { Publicacion } from "../types";

async function fetchPublicacion(slug: string): Promise<Publicacion> {
  const { data } = await api.get<Publicacion>(`/publicaciones/${slug}/`);
  return data;
}

export function usePublicacion(slug: string) {
  return useQuery({
    queryKey: ["publicacion", slug],
    queryFn: () => fetchPublicacion(slug),
    enabled: Boolean(slug),
  });
}
