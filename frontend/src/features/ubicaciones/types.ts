export interface Comuna {
  id: number;
  nombre: string;
  ciudad: number;
  ciudad_nombre: string;
  slug: string;
}

export interface ComunasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comuna[];
}
