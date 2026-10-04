export interface Subcategoria {
  id: number;
  categoria: number;
  nombre: string;
  slug: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  icono: string;
  orden: number;
  subcategorias: Subcategoria[];
}
