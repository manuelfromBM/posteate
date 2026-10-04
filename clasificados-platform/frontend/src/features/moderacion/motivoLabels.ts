import { ReporteMotivo } from "./types";

export const MOTIVO_LABELS: Record<ReporteMotivo, string> = {
  [ReporteMotivo.Spam]: "Spam",
  [ReporteMotivo.Fraude]: "Fraude",
  [ReporteMotivo.Inapropiado]: "Inapropiado",
  [ReporteMotivo.CategoriaIncorrecta]: "Categoría incorrecta",
  [ReporteMotivo.Desactualizado]: "Desactualizado",
  [ReporteMotivo.Otro]: "Otro",
};

export const MOTIVO_OPCIONES = Object.values(ReporteMotivo);
