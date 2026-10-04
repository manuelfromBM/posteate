"use client";

import Link from "next/link";

import { formatFechaRelativa } from "@/lib/date";

import { useReportes } from "../hooks/useReportes";
import { MOTIVO_LABELS } from "../motivoLabels";
import { ReporteEstado, type Reporte } from "../types";
import styles from "./ReportesTable.module.css";

const ESTADO_LABELS: Record<ReporteEstado, string> = {
  [ReporteEstado.Pendiente]: "Pendiente",
  [ReporteEstado.EnRevision]: "En revisión",
  [ReporteEstado.Resuelto]: "Resuelto",
  [ReporteEstado.Descartado]: "Descartado",
};

const ESTADO_BADGE_CLASS: Record<ReporteEstado, string> = {
  [ReporteEstado.Pendiente]: styles.badgePending,
  [ReporteEstado.EnRevision]: styles.badgeReviewing,
  [ReporteEstado.Resuelto]: styles.badgeResolved,
  [ReporteEstado.Descartado]: styles.badgeDismissed,
};

function FilaReporte({
  reporte,
  onMarcarEnRevision,
  onResolver,
  onDescartar,
}: {
  reporte: Reporte;
  onMarcarEnRevision: (id: number) => void;
  onResolver: (id: number) => void;
  onDescartar: (id: number) => void;
}) {
  const resuelto =
    reporte.estado === ReporteEstado.Resuelto ||
    reporte.estado === ReporteEstado.Descartado;

  return (
    <tr>
      <td>
        <Link
          href={`/publicaciones/${reporte.categoriaSlug}/${reporte.publicacion.slug}`}
          className={styles.publicacion}
        >
          {reporte.publicacion.titulo}
        </Link>
      </td>
      <td>{MOTIVO_LABELS[reporte.motivo]}</td>
      <td className={styles.comentario}>{reporte.comentario}</td>
      <td>{reporte.reportadoPor}</td>
      <td>{formatFechaRelativa(reporte.fecha_creacion)}</td>
      <td>
        <span className={ESTADO_BADGE_CLASS[reporte.estado]}>
          {ESTADO_LABELS[reporte.estado]}
        </span>
      </td>
      <td>
        <div className={styles.acciones}>
          <button
            type="button"
            className={styles.accionBtn}
            disabled={resuelto || reporte.estado === ReporteEstado.EnRevision}
            onClick={() => onMarcarEnRevision(reporte.id)}
          >
            En revisión
          </button>
          <button
            type="button"
            className={styles.accionBtn}
            disabled={resuelto}
            onClick={() => onResolver(reporte.id)}
          >
            Resolver
          </button>
          <button
            type="button"
            className={styles.accionBtn}
            disabled={resuelto}
            onClick={() => onDescartar(reporte.id)}
          >
            Descartar
          </button>
        </div>
      </td>
    </tr>
  );
}

export function ReportesTable() {
  const { reportes, marcarEnRevision, resolver, descartar } = useReportes();

  if (reportes.length === 0) {
    return <p className={styles.vacio}>No hay reportes por revisar.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Publicación</th>
            <th>Motivo</th>
            <th>Comentario</th>
            <th>Reportado por</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <FilaReporte
              key={reporte.id}
              reporte={reporte}
              onMarcarEnRevision={marcarEnRevision}
              onResolver={resolver}
              onDescartar={descartar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
