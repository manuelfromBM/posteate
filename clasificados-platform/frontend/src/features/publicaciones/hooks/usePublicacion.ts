// src/features/publicaciones/hooks/usePublicaciones.ts
import { useQuery } from '@tanstack/react-query';
import { publicacionesApi } from '../services/publicacionesApi';

export function usePublicaciones(filtros?: { categoria?: string }) {
  return useQuery({
    queryKey: ['publicaciones', filtros],
    queryFn: () => publicacionesApi.obtenerTodas(filtros),
    staleTime: 1000 * 60 * 5,
  });
}
