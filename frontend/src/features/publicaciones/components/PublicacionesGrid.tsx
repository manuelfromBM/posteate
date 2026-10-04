import { Publicacion } from "../types";
import { PublicacionCard } from "./card/PublicacionCard";
import styles from "./PublicacionesGrid.module.css";

interface PublicacionesGridProps {
  publicaciones: Publicacion[];
}

export function PublicacionesGrid({ publicaciones }: PublicacionesGridProps) {
  // 🛡️ Si no es un array o viene vacío, muestra el mensaje amigable en vez de romperse
  if (!publicaciones || !Array.isArray(publicaciones) || publicaciones.length === 0) {
    return <p className="text-center p-4 text-gray-500">No hay publicaciones para mostrar en este momento.</p>;
  }

  return (
    <div className={styles.grid}>
      {publicaciones.map((publicacion) => (
        <PublicacionCard
          key={publicacion.id}
          publicacion={publicacion}
        />
      ))}
    </div>
  );
}
