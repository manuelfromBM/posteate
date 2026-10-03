"use client";

import { use } from "react";
import { usePublicacion } from "@/features/publicaciones/hooks/usePublicacion";

// Formateador dinámico para CLP chileno
function formatMoneda(valorTexto: string | null): string | null {
  if (!valorTexto) return null;
  const valor = Number(valorTexto);
  if (Number.isNaN(valor)) return null;
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export default function PublicacionDetallePage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { slug } = use(params);
  const { data: publicacion, isLoading, isError } = usePublicacion(slug);

  if (isLoading) return <p className="text-center p-8">Cargando publicación...</p>;
  if (isError || !publicacion) return <p className="text-center p-8 text-red-500">No se encontró la publicación.</p>;

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <article style={{ border: "1px solid #eee", padding: "2rem", borderRadius: "12px", backgroundColor: "#fff" }}>
        <span style={{ fontSize: "0.85rem", color: "#3182ce", fontWeight: "bold", textTransform: "uppercase" }}>
          {publicacion.categoria_nombre}
        </span>
        
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0 1.5rem 0" }}>
          {publicacion.titulo}
        </h1>
        
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#2d3748", marginBottom: "2rem", whiteSpace: "pre-line" }}>
          {publicacion.descripcion}
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid #eee", paddingTop: "1.5rem" }}>
          {/* Muestra condicionalmente el precio si aplica */}
          {publicacion.precio && (
            <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
              Precio: <span style={{ color: "#2b6cb0" }}>{formatMoneda(publicacion.precio)}</span>
            </p>
          )}

          {/* Muestra condicionalmente la recompensa de mascotas si aplica */}
          {publicacion.recompensa && (
            <p style={{ fontSize: "1.25rem", fontWeight: "600", color: "#e53e3e" }}>
              💰 Recompensa: {formatMoneda(publicacion.recompensa)}
            </p>
          )}

          <p><strong>Ubicación:</strong> 📍 {publicacion.ubicacion_nombre}</p>
          <p><strong>Estado del aviso:</strong> {publicacion.estado}</p>
          <p><strong>Publicado por:</strong> {publicacion.usuario_nombre}</p>
          <p><strong>Contacto Directo:</strong> {publicacion.contacto}</p>
        </div>
      </article>
    </main>
  );
}
