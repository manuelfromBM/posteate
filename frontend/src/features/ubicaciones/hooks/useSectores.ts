import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { Sector } from "../types";

interface SectoresResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sector[];
}

async function fetchSectores(): Promise<SectoresResponse> {
  const { data } = await api.get<SectoresResponse>("/sectores/");
  return data;
}

export function useSectores() {
  return useQuery({
    queryKey: ["sectores"],
    queryFn: fetchSectores,
  });
}
