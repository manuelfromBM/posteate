import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { ComunasResponse } from "../types";

async function fetchComunas(): Promise<ComunasResponse> {
  const { data } = await api.get<ComunasResponse>("/comunas/");
  return data;
}

export function useComunas() {
  return useQuery({
    queryKey: ["comunas"],
    queryFn: fetchComunas,
  });
}
