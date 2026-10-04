"use client";

import { use } from "react";

import { FeedPublicaciones } from "@/features/publicaciones";

export default function PublicacionesPorCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  return <FeedPublicaciones categoriaInicial={categoria} />;
}
