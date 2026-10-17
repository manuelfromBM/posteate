import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/api";

import type { Usuario } from "../types";

async function fetchUsuarioActual(): Promise<Usuario | null> {
  try {
    const { data } = await api.get<Usuario>("/usuarios/me/");
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}

export function useUsuarioActual() {
  return useQuery({
    queryKey: ["usuario-actual"],
    queryFn: fetchUsuarioActual,
    retry: false,
    staleTime: 1000 * 60,
  });
}
