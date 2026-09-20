import { CategoriasRow } from "@/features/categorias/components/CategoriasRow";
import { categoriasMock } from "@/features/categorias/mocks";
import { PublicacionesRecientes } from "@/features/publicaciones/components/PublicacionesRecientes";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Lo que pasa en Melipilla, en un solo lugar</h1>
        <p className={styles.heroSubtitle}>
          Publica, encuentra y descubre información local: compra y venta, arriendos,
          empleos, eventos y más.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Categorías</h2>
        <CategoriasRow categorias={categoriasMock} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Publicaciones recientes</h2>
        <PublicacionesRecientes />
      </section>
    </div>
  );
}
