import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { PublicacionesFiltros, PublicacionesResponse } from "../types";

async function fetchPublicaciones(
  filtros: PublicacionesFiltros
): Promise<PublicacionesResponse> {
  const { data } = await api.get<PublicacionesResponse>("/publicaciones/", {
    params: filtros,
  });
  return data;
}

export function usePublicaciones(filtros: PublicacionesFiltros = {}) {
  return useQuery({
    queryKey: ["publicaciones", filtros],
    queryFn: () => fetchPublicaciones(filtros),
  });
}
