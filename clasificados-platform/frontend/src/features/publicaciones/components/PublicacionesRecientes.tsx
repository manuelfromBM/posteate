"use client";

import { usePublicaciones } from "../hooks/usePublicaciones";
import { PublicacionesGrid } from "./PublicacionesGrid";

interface PublicacionesRecientesProps {
  categoria?: string; // Opcional, por si reutilizas este componente en las páginas filtradas
}

export function PublicacionesRecientes({ categoria }: PublicacionesRecientesProps) {
  // Traemos las publicaciones reales de la BD a través de nuestro hook
  const { data: publicaciones, isPending, isError, error } = usePublicaciones({ categoria });

  if (isPending) {
    return <p className="text-center p-4">Cargando publicaciones de Melipilla...</p>;
  }

  if (isError) {
    return (
      <p className="text-center p-4 text-red-500">
        Error al conectar con el servidor: {error instanceof Error ? error.message : "Error desconocido"}
      </p>
    );
  }

  return <PublicacionesGrid publicaciones={publicaciones} />;
}
