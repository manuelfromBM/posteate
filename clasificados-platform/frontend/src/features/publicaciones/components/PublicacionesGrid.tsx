import type { PublicacionConCategoria } from "../types";
import { PublicacionCard } from "./PublicacionCard";
import styles from "./PublicacionesGrid.module.css";

export function PublicacionesGrid({
  publicaciones,
  mensajeVacio = "No hay publicaciones para mostrar.",
}: {
  publicaciones: PublicacionConCategoria[];
  mensajeVacio?: string;
}) {
  if (publicaciones.length === 0) {
    return <p className={styles.vacio}>{mensajeVacio}</p>;
  }

  return (
    <div className={styles.grid}>
      {publicaciones.map(({ publicacion, categoriaSlug }) => (
        <PublicacionCard
          key={publicacion.id}
          publicacion={publicacion}
          categoriaSlug={categoriaSlug}
        />
      ))}
    </div>
  );
}
