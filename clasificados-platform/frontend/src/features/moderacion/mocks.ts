import { publicacionesRecientesMock } from "@/features/publicaciones/mocks";

import { ReporteEstado, ReporteMotivo, type Reporte } from "./types";

export const reportesMock: Reporte[] = [
  {
    id: 1,
    publicacion: publicacionesRecientesMock[0].publicacion,
    categoriaSlug: publicacionesRecientesMock[0].categoriaSlug,
    motivo: ReporteMotivo.CategoriaIncorrecta,
    comentario: "Esto debería estar en Vehículos, no en Compra y venta.",
    reportadoPor: "vecino_anonimo",
    estado: ReporteEstado.Pendiente,
    fecha_creacion: "2026-09-26T14:20:00Z",
  },
  {
    id: 2,
    publicacion: publicacionesRecientesMock[1].publicacion,
    categoriaSlug: publicacionesRecientesMock[1].categoriaSlug,
    motivo: ReporteMotivo.Fraude,
    comentario: "Pide adelanto por transferencia antes de mostrar la propiedad.",
    reportadoPor: "camila",
    estado: ReporteEstado.Pendiente,
    fecha_creacion: "2026-09-27T09:05:00Z",
  },
  {
    id: 3,
    publicacion: publicacionesRecientesMock[0].publicacion,
    categoriaSlug: publicacionesRecientesMock[0].categoriaSlug,
    motivo: ReporteMotivo.Desactualizado,
    comentario: "El vendedor dice que ya no la tiene disponible.",
    reportadoPor: "jorge",
    estado: ReporteEstado.EnRevision,
    fecha_creacion: "2026-09-25T18:40:00Z",
  },
];
