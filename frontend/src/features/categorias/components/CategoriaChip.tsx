import Link from "next/link";

import type { Categoria } from "../types";
import styles from "./CategoriaChip.module.css";

export function CategoriaChip({ categoria }: { categoria: Categoria }) {
  return (
    <Link href={`/publicaciones/${categoria.slug}`} className={styles.chip}>
      <span className={styles.icono} aria-hidden="true">
        {categoria.icono}
      </span>
      <span>{categoria.nombre}</span>
    </Link>
  );
}
