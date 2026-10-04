import type { Categoria } from "@/features/categorias/types";
import { CategoriaIcono } from "@/features/categorias/icons";
import type { Sector } from "@/features/ubicaciones/types";

import styles from "./FiltrosPublicaciones.module.css";

export const ORDEN_RECIENTES = "-fecha_publicacion";
export const ORDEN_PRECIO_ASC = "precio";
export const ORDEN_PRECIO_DESC = "-precio";

interface FiltrosPublicacionesProps {
  categorias: Categoria[];
  categoriaSeleccionada: string | null;
  onCategoriaChange: (slug: string | null) => void;
  sectores: Sector[];
  sectorSeleccionado: number | null;
  onSectorChange: (id: number | null) => void;
  orden: string;
  onOrdenChange: (orden: string) => void;
  onLimpiar: () => void;
}

export function FiltrosPublicaciones({
  categorias,
  categoriaSeleccionada,
  onCategoriaChange,
  sectores,
  sectorSeleccionado,
  onSectorChange,
  orden,
  onOrdenChange,
  onLimpiar,
}: FiltrosPublicacionesProps) {
  return (
    <aside className={styles.filtros}>
      <div className={styles.cabecera}>
        <h2>Filtros</h2>
        <button type="button" className={styles.limpiar} onClick={onLimpiar}>
          Limpiar
        </button>
      </div>

      <div className={styles.grupo}>
        <h3>Categoría</h3>
        <div className={styles.chips}>
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              className={
                categoria.slug === categoriaSeleccionada
                  ? `${styles.chip} ${styles.chipSeleccionado}`
                  : styles.chip
              }
              onClick={() =>
                onCategoriaChange(
                  categoria.slug === categoriaSeleccionada ? null : categoria.slug
                )
              }
            >
              <CategoriaIcono nombre={categoria.icono} size={16} />
              <span>{categoria.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grupo}>
        <h3>Sector</h3>
        <select
          className={styles.select}
          value={sectorSeleccionado ?? ""}
          onChange={(e) =>
            onSectorChange(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Todos los sectores</option>
          {sectores.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grupo}>
        <h3>Ordenar por</h3>
        <select
          className={styles.select}
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
        >
          <option value={ORDEN_RECIENTES}>Más recientes</option>
          <option value={ORDEN_PRECIO_ASC}>Precio: menor a mayor</option>
          <option value={ORDEN_PRECIO_DESC}>Precio: mayor a menor</option>
        </select>
      </div>
    </aside>
  );
}
