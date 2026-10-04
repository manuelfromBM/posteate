"use client";

import { RequireAuth } from "@/features/usuarios/components/RequireAuth";
import { PublicacionForm } from "@/features/publicaciones/components/PublicacionForm";

import styles from "./page.module.css";

export default function NuevaPublicacionPage() {
  return (
    <RequireAuth>
      <div className={styles.page}>
        <h1 className={styles.title}>Publicar anuncio</h1>
        <p className={styles.subtitle}>
          Completa los datos de tu publicación. Podrás editarla o cerrarla más adelante.
        </p>
        <PublicacionForm modo="crear" />
      </div>
    </RequireAuth>
  );
}
