import axios from 'axios';
import { Publicacion, PublicacionesResponse } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0',
});

export const publicacionesApi = {
  obtenerTodas: async (filtros?: { categoria?: string }): Promise<Publicacion[]> => {
    const { data } = await api.get<PublicacionesResponse>('/publicaciones/', {
      params: filtros,
    });
    
    // Devolvemos estrictamente el array de publicaciones alojado en .results
    return data.results; 
  },

  obtenerPorSlug: async (slug: string): Promise<Publicacion> => {
    const { data } = await api.get<Publicacion>(`/publicaciones/${slug}/`);
    return data;
  }
};
