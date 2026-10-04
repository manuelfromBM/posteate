export enum EstadoPublicacion {
  Activo = "activo",
  Pausado = "pausado",
  Resuelto = "resuelto",
  Expirado = "expirado",
}

export interface ImagenPublicacion {
  id: number;
  imagen: string;
  orden: number;
}

export interface Publicacion {
  id: string; 
  titulo: string;
  slug: string;
  descripcion: string;
  categoria: number;
  categoria_nombre: string;
  categoria_slug: string;
  categoria_icono: string;
  subcategoria: number | null;
  subcategoria_nombre: string | null;
  precio: string | null;
  recompensa: string | null;
  estado: EstadoPublicacion;
  comuna: number;
  ubicacion_nombre: string;
  usuario: number;
  usuario_nombre: string;
  fecha_publicacion: string;
  fecha_expiracion: string | null;
  contacto: string;
  imagenes: ImagenPublicacion[];
}

export interface PublicacionesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Publicacion[];
}

export interface PublicacionesFiltros {
  categoria?: string | number;
  subcategoria?: string | number;
  estado?: EstadoPublicacion;
  comuna?: number;
  sector?: number;
  q?: string;
  precio_min?: number;
  precio_max?: number;
  ordering?: string;
  page?: number;
}
