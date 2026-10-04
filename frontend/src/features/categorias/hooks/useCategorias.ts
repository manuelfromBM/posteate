import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { CategoriasResponse } from "../types";

async function fetchCategorias(): Promise<CategoriasResponse> {
  const { data } = await api.get<CategoriasResponse>("/categorias/");
  return data;
}

export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategorias,
  });
}
