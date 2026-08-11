"use client";

import Link from "next/link";
import { use } from "react";

import { usePublicaciones } from "@/features/publicaciones/hooks/usePublicaciones";

export default function PublicacionesPorCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);
  const { data, isLoading, isError } = usePublicaciones({ categoria });

  if (isLoading) return <p>Cargando publicaciones...</p>;
  if (isError) return <p>Ocurrió un error al cargar las publicaciones.</p>;

  return (
    <main>
      <h1>Publicaciones: {categoria}</h1>
      <ul>
        {data?.results.map((publicacion) => (
          <li key={publicacion.id}>
            <Link href={`/publicaciones/${categoria}/${publicacion.slug}`}>
              {publicacion.titulo}
            </Link>
            {publicacion.precio && <span> — ${publicacion.precio}</span>}
            <span> ({publicacion.estado})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
