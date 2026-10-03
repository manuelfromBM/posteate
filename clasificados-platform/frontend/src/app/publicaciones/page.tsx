// src/app/publicaciones/page.tsx
import { PublicacionesRecientes } from "@/features/publicaciones";

export default function PublicacionesGlobalFeedPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>📍 Avisos Recientes en Melipilla</h1>
        <p style={{ color: '#666' }}>Explora todas las novedades de la comunidad sin filtros</p>
      </header>

      <PublicacionesRecientes />

    </main>
  );
}
