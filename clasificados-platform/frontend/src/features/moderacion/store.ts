import { reportesMock } from "./mocks";
import { ReporteEstado, type Reporte } from "./types";

// Store en memoria compartido entre el formulario de "reportar" y el panel
// de moderación: no existe todavía un endpoint de reportes en el backend
// (ver docs/CLAUDE.md, dominio "Report"), así que esto vive solo en el
// cliente y se reinicia al recargar la página.
let reportes: Reporte[] = [...reportesMock];
let nextId = reportes.length + 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getReportes(): Reporte[] {
  return reportes;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function agregarReporte(input: Omit<Reporte, "id" | "estado" | "fecha_creacion">): void {
  const nuevo: Reporte = {
    ...input,
    id: nextId++,
    estado: ReporteEstado.Pendiente,
    fecha_creacion: new Date().toISOString(),
  };
  reportes = [nuevo, ...reportes];
  emit();
}

export function actualizarEstadoReporte(id: number, estado: ReporteEstado): void {
  reportes = reportes.map((reporte) => (reporte.id === id ? { ...reporte, estado } : reporte));
  emit();
}
