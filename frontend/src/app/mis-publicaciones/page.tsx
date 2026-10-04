"use client";

import Link from "next/link";

import { useCategorias } from "@/features/categorias/hooks/useCategorias";
import { MisPublicacionItem } from "@/features/publicaciones/components/MisPublicacionItem";
import { useMisPublicaciones } from "@/features/publicaciones/hooks/useMisPublicaciones";
import { RequireAuth } from "@/features/usuarios/components/RequireAuth";

import styles from "./page.module.css";

function MisPublicacionesContenido() {
  const { publicaciones, isLoading, isError } = useMisPublicaciones();
  const { data: categoriasData } = useCategorias();

  const categoriaSlugPorId = new Map(
    categoriasData?.results.map((categoria) => [categoria.id, categoria.slug]) ?? []
  );

  if (isLoading) return <p>Cargando tus publicaciones...</p>;
  if (isError) return <p>Ocurrió un error al cargar tus publicaciones.</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis publicaciones</h1>
          <p className={styles.subtitle}>
            Publicaciones de la primera página que coinciden con tu usuario.
          </p>
        </div>
        <Link href="/publicaciones/nueva" className={styles.nuevo}>
          + Publicar anuncio
        </Link>
      </div>

      {publicaciones.length === 0 ? (
        <p className={styles.vacio}>Aún no tienes publicaciones. Publica tu primer anuncio.</p>
      ) : (
        <ul className={styles.lista}>
          {publicaciones.map((publicacion) => (
            <MisPublicacionItem
              key={publicacion.id}
              publicacion={publicacion}
              categoriaSlug={categoriaSlugPorId.get(publicacion.categoria) ?? ""}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MisPublicacionesPage() {
  return (
    <RequireAuth>
      <MisPublicacionesContenido />
    </RequireAuth>
  );
}
