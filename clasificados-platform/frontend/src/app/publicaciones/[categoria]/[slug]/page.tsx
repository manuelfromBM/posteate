"use client";

import { use } from "react";

import { usePublicacion } from "@/features/publicaciones/hooks/usePublicacion";

export default function PublicacionDetallePage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { slug } = use(params);
  const { data, isLoading, isError } = usePublicacion(slug);

  if (isLoading) return <p>Cargando publicación...</p>;
  if (isError || !data) return <p>No se encontró la publicación.</p>;

  return (
    <main>
      <h1>{data.titulo}</h1>
      <p>{data.descripcion}</p>
      {data.precio && <p>Precio: ${data.precio}</p>}
      <p>Estado: {data.estado}</p>
      <p>Ubicación: {data.ubicacion_nombre}</p>
      <p>Contacto: {data.contacto}</p>
    </main>
  );
}
