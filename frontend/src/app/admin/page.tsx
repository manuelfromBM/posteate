import { ReportesTable } from "@/features/moderacion/components/ReportesTable";

import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Moderación de publicaciones</h1>
      <p className={styles.subtitle}>
        Revisa los reportes de la comunidad y actualiza su estado.
      </p>
      <ReportesTable />
    </div>
  );
}
