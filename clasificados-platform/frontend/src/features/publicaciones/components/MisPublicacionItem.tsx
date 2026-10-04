"use client";

import Link from "next/link";
import { useState } from "react";

import { formatFechaRelativa } from "@/lib/date";

import { ESTADO_LABELS, ESTADO_OPCIONES } from "../estadoLabels";
import { useCambiarEstadoPublicacion } from "../hooks/useCambiarEstadoPublicacion";
import { useEliminarPublicacion } from "../hooks/useEliminarPublicacion";
import { EstadoPublicacion, type Publicacion } from "../types";
import styles from "./MisPublicacionItem.module.css";

export function MisPublicacionItem({
  publicacion,
  categoriaSlug,
}: {
  publicacion: Publicacion;
  categoriaSlug: string;
}) {
  const cambiarEstado = useCambiarEstadoPublicacion();
  const eliminar = useEliminarPublicacion();
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
  const [eliminada, setEliminada] = useState(false);

  if (eliminada) return null;

  async function handleEliminar() {
    await eliminar.mutateAsync(publicacion.slug);
    setEliminada(true);
  }

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <Link
          href={`/publicaciones/${categoriaSlug}/${publicacion.slug}`}
          className={styles.titulo}
        >
          {publicacion.titulo}
        </Link>
        <span className={styles.meta}>
          {publicacion.categoria_nombre} · {formatFechaRelativa(publicacion.fecha_publicacion)}
        </span>
      </div>

      <select
        className={styles.estadoSelect}
        value={publicacion.estado}
        onChange={(event) =>
          cambiarEstado.mutate({
            slug: publicacion.slug,
            estado: event.target.value as EstadoPublicacion,
          })
        }
        disabled={cambiarEstado.isPending}
      >
        {ESTADO_OPCIONES.map((opcion) => (
          <option key={opcion} value={opcion}>
            {ESTADO_LABELS[opcion]}
          </option>
        ))}
      </select>

      <div className={styles.acciones}>
        <Link
          href={`/publicaciones/${categoriaSlug}/${publicacion.slug}/editar`}
          className={styles.accionBtn}
        >
          Editar
        </Link>
        {confirmandoEliminar ? (
          <>
            <button
              type="button"
              className={styles.accionBtnPeligro}
              onClick={handleEliminar}
              disabled={eliminar.isPending}
            >
              {eliminar.isPending ? "Eliminando..." : "Confirmar"}
            </button>
            <button
              type="button"
              className={styles.accionBtn}
              onClick={() => setConfirmandoEliminar(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.accionBtn}
            onClick={() => setConfirmandoEliminar(true)}
          >
            Eliminar
          </button>
        )}
      </div>
    </li>
  );
}
