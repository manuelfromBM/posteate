import Link from "next/link";

import { formatFechaRelativa } from "@/lib/date";

import { formatPrecio } from "../formatPrecio";
import type { Publicacion } from "../types";
import styles from "./PublicacionCard.module.css";

export function PublicacionCard({
  publicacion,
  categoriaSlug,
}: {
  publicacion: Publicacion;
  categoriaSlug: string;
}) {
  const precioFormateado = formatPrecio(publicacion.precio);

  return (
    <Link
      href={`/publicaciones/${categoriaSlug}/${publicacion.slug}`}
      className={styles.card}
    >
      <div className={styles.top}>
        <span className={styles.categoria}>{publicacion.categoria_nombre}</span>
        <span className={styles.fecha}>
          {formatFechaRelativa(publicacion.fecha_publicacion)}
        </span>
      </div>
      <h3 className={styles.titulo}>{publicacion.titulo}</h3>
      <p className={styles.descripcion}>{publicacion.descripcion}</p>
      <div className={styles.footer}>
        <span className={styles.ubicacion}>📍 {publicacion.ubicacion_nombre}</span>
        {precioFormateado && <span className={styles.precio}>{precioFormateado}</span>}
      </div>
    </Link>
  );
}
