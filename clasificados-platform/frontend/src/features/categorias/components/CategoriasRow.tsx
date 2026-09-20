import type { Categoria } from "../types";
import { CategoriaChip } from "./CategoriaChip";
import styles from "./CategoriasRow.module.css";

export function CategoriasRow({ categorias }: { categorias: Categoria[] }) {
  return (
    <div className={styles.row}>
      {categorias.map((categoria) => (
        <CategoriaChip key={categoria.id} categoria={categoria} />
      ))}
    </div>
  );
}
