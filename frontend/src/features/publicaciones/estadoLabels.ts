import { EstadoPublicacion } from "./types";

export const ESTADO_LABELS: Record<EstadoPublicacion, string> = {
  [EstadoPublicacion.Disponible]: "Disponible",
  [EstadoPublicacion.Vendido]: "Vendido",
  [EstadoPublicacion.Arrendado]: "Arrendado",
  [EstadoPublicacion.Finalizado]: "Finalizado",
};

export const ESTADO_OPCIONES = Object.values(EstadoPublicacion);
