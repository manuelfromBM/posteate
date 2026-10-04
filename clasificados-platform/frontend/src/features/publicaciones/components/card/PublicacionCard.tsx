import Link from "next/link";

import { colorPorCategoria } from "@/features/categorias/colors";
import { CategoriaIcono } from "@/features/categorias/icons";
import { formatFechaRelativa } from "@/lib/date";
import { formatMoneda } from "@/lib/currency";

import type { Publicacion } from "../../types";
import styles from "./PublicacionCard.module.css";

export function PublicacionCard({ publicacion }: { publicacion: Publicacion }) {
  const precioFormateado = formatMoneda(publicacion.precio);
  const recompensaFormateada = formatMoneda(publicacion.recompensa);
  const rutaCategoria = publicacion.categoria_slug || "general";

  return (
    <Link
      href={`/publicaciones/${rutaCategoria}/${publicacion.slug}`}
      className={styles.card}
    >
      <div
        className={styles.thumb}
        style={{ background: colorPorCategoria(publicacion.categoria_slug) }}
      >
        <CategoriaIcono nombre={publicacion.categoria_icono} size={28} />
        <span className={styles.badge}>{publicacion.categoria_nombre}</span>
        <span className={styles.vigencia}>
          {formatFechaRelativa(publicacion.fecha_publicacion)}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.titulo}>{publicacion.titulo}</h3>

        <div className={styles.meta}>
          {precioFormateado ? (
            <span className={styles.precio}>{precioFormateado}</span>
          ) : (
            <span className={styles.precioNa}>Consultar</span>
          )}
          <span className={styles.ubicacion}>{publicacion.ubicacion_nombre}</span>
        </div>

        {recompensaFormateada && (
          <p className={styles.recompensa}>💰 Recompensa: {recompensaFormateada}</p>
        )}

        <p className={styles.descripcion}>{publicacion.descripcion}</p>
      </div>
    </Link>
  );
}
