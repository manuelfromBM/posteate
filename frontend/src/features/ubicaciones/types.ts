export interface Sector {
  id: number;
  nombre: string;
  comuna: number;
  comuna_nombre: string;
  slug: string;
}

export interface Comuna {
  id: number;
  nombre: string;
  region: number;
  region_nombre: string;
  slug: string;
}
