"use client";

import { use } from "react";

import { PublicacionForm } from "@/features/publicaciones/components/PublicacionForm";
import { usePublicacion } from "@/features/publicaciones/hooks/usePublicacion";
import { RequireAuth } from "@/features/usuarios/components/RequireAuth";
import { useAuth } from "@/features/usuarios/hooks/useAuth";

import styles from "./page.module.css";

function EditarPublicacionContenido({ slug }: { slug: string }) {
  const { usuario } = useAuth();
  const { data, isLoading, isError } = usePublicacion(slug);

  if (isLoading) return <p>Cargando publicación...</p>;
  if (isError || !data) return <p>No se encontró la publicación.</p>;

  if (data.usuario_nombre !== usuario?.username) {
    return <p className={styles.sinPermiso}>No tienes permiso para editar esta publicación.</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Editar publicación</h1>
      <PublicacionForm modo="editar" publicacionInicial={data} />
    </div>
  );
}

export default function EditarPublicacionPage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <RequireAuth>
      <EditarPublicacionContenido slug={slug} />
    </RequireAuth>
  );
}
