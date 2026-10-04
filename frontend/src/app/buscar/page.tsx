import { BuscadorPublicaciones } from "@/features/publicaciones/components/BuscadorPublicaciones";

import styles from "./page.module.css";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Buscar publicaciones</h1>
      <BuscadorPublicaciones initialQuery={q ?? ""} />
    </div>
  );
}
