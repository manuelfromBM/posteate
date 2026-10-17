"use client";

import Link from "next/link";

import { PublicarForm } from "@/features/publicaciones/components/PublicarForm";
import { useUsuarioActual } from "@/features/usuarios/hooks/useUsuarioActual";

import styles from "./page.module.css";

export default function PublicarPage() {
  const { data: usuario, isPending } = useUsuarioActual();

  if (isPending) {
    return <p className={styles.estado}>Cargando...</p>;
  }

  if (!usuario) {
    return (
      <div className={styles.estado}>
        <p>Debes iniciar sesión para publicar.</p>
        <Link href="/login" className={styles.link}>
          Ir a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Publicar un aviso</h1>
      <PublicarForm />
    </div>
  );
}
