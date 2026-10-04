"use client";

import { useSyncExternalStore } from "react";

import { actualizarEstadoReporte, getReportes, subscribe } from "../store";
import { ReporteEstado } from "../types";

// TODO: reemplazar por llamadas reales a la API cuando exista el endpoint de reportes.
export function useReportes() {
  const reportes = useSyncExternalStore(subscribe, getReportes, getReportes);

  return {
    reportes,
    marcarEnRevision: (id: number) => actualizarEstadoReporte(id, ReporteEstado.EnRevision),
    resolver: (id: number) => actualizarEstadoReporte(id, ReporteEstado.Resuelto),
    descartar: (id: number) => actualizarEstadoReporte(id, ReporteEstado.Descartado),
  };
}
