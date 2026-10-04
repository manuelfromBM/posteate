import type { Publicacion } from "@/features/publicaciones/types";

export enum ReporteMotivo {
  Spam = "SPAM",
  Fraude = "FRAUD",
  Inapropiado = "INAPPROPRIATE",
  CategoriaIncorrecta = "WRONG_CATEGORY",
  Desactualizado = "OUTDATED",
  Otro = "OTHER",
}

export enum ReporteEstado {
  Pendiente = "PENDING",
  EnRevision = "REVIEWING",
  Resuelto = "RESOLVED",
  Descartado = "DISMISSED",
}

export interface Reporte {
  id: number;
  publicacion: Publicacion;
  categoriaSlug: string;
  motivo: ReporteMotivo;
  comentario: string;
  reportadoPor: string;
  estado: ReporteEstado;
  fecha_creacion: string;
}
