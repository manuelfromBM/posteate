// src/features/publicaciones/hooks/usePublicacion.ts
import { useQuery } from '@tanstack/react-query';
import { publicacionesApi } from '../services/publicacionesApi';

export function usePublicacion(slug: string) {
  return useQuery({
    queryKey: ['publicacion', slug],
    queryFn: () => publicacionesApi.obtenerPorSlug(slug),
    staleTime: 1000 * 60 * 5,
  });
}
