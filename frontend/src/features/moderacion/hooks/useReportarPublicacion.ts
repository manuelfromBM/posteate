"use client";

import type { Publicacion } from "@/features/publicaciones/types";

import { agregarReporte } from "../store";
import type { ReporteMotivo } from "../types";

export function useReportarPublicacion() {
  function reportar(input: {
    publicacion: Publicacion;
    categoriaSlug: string;
    motivo: ReporteMotivo;
    comentario: string;
    reportadoPor: string;
  }) {
    agregarReporte(input);
  }

  return { reportar };
}
