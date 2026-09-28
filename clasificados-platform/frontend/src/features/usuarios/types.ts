export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginError {
  message: string;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  telefono: string;
  whatsapp: string;
  direccion: string;
  avatar: string | null;
  fecha_nacimiento: string | null;
}

export interface RegistroInput {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  telefono?: string;
  whatsapp?: string;
}

export type RegistroErrores = Partial<Record<keyof RegistroInput | "non_field_errors", string[]>>;
