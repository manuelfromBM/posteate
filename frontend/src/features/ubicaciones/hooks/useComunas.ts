import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { Comuna } from "../types";

interface ComunasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comuna[];
}

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
