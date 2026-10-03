"use client";

import { use } from "react";
import { PublicacionesRecientes } from "@/features/publicaciones";

export default function PublicacionesPorCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  // Capitalizamos estéticamente el título de la categoría
  const tituloCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          📍 {tituloCategoria} en Melipilla
        </h1>
        <p style={{ color: "#666" }}>Filtrado por la categoría seleccionada</p>
      </header>

      {/* 🚀 Reutilizamos tu orquestador pasándole la categoría como filtro */}
      <PublicacionesRecientes categoria={categoria} />
    </main>
  );
}
