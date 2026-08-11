export enum EstadoPublicacion {
  Disponible = "disponible",
  Vendido = "vendido",
  Arrendado = "arrendado",
  Finalizado = "finalizado",
}

export interface ImagenPublicacion {
  id: number;
  imagen: string;
  orden: number;
}

export interface Publicacion {
  id: number;
  titulo: string;
  slug: string;
  descripcion: string;
  categoria: number;
  categoria_nombre: string;
  subcategoria: number | null;
  subcategoria_nombre: string | null;
  precio: string | null;
  estado: EstadoPublicacion;
  ubicacion: number;
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
  ubicacion?: string | number;
  q?: string;
  precio_min?: number;
  precio_max?: number;
  page?: number;
}
