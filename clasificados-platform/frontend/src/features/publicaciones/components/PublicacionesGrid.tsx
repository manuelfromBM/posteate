import type { PublicacionRecienteMock } from "../mocks";
import { PublicacionCard } from "./PublicacionCard";
import styles from "./PublicacionesGrid.module.css";

export function PublicacionesGrid({
  publicaciones,
}: {
  publicaciones: PublicacionRecienteMock[];
}) {
  if (publicaciones.length === 0) {
    return <p>No hay publicaciones para mostrar.</p>;
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
