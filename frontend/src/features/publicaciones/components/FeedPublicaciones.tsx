"use client";

import { useState } from "react";

import { useCategorias } from "@/features/categorias/hooks/useCategorias";
import { useSectores } from "@/features/ubicaciones/hooks/useSectores";

import { usePublicaciones } from "../hooks/usePublicaciones";
import { FiltrosPublicaciones, ORDEN_RECIENTES } from "./FiltrosPublicaciones";
import styles from "./FeedPublicaciones.module.css";
import { PublicacionesGrid } from "./PublicacionesGrid";

interface FeedPublicacionesProps {
  categoriaInicial?: string;
  queryInicial?: string;
}

export function FeedPublicaciones({ categoriaInicial, queryInicial }: FeedPublicacionesProps) {
  const [categoria, setCategoria] = useState<string | null>(categoriaInicial ?? null);
  const [sector, setSector] = useState<number | null>(null);
  const [orden, setOrden] = useState<string>(ORDEN_RECIENTES);

  const { data: categorias } = useCategorias();
  const { data: sectores } = useSectores();
  const { data, isPending, isError, error } = usePublicaciones({
    categoria: categoria ?? undefined,
    sector: sector ?? undefined,
    ordering: orden,
    q: queryInicial || undefined,
  });

  function limpiarFiltros() {
    setCategoria(null);
    setSector(null);
    setOrden(ORDEN_RECIENTES);
  }

  const publicaciones = data?.results ?? [];

  return (
    <div className={styles.layout}>
      <FiltrosPublicaciones
        categorias={categorias?.results ?? []}
        categoriaSeleccionada={categoria}
        onCategoriaChange={setCategoria}
        sectores={sectores?.results ?? []}
        sectorSeleccionado={sector}
        onSectorChange={setSector}
        orden={orden}
        onOrdenChange={setOrden}
        onLimpiar={limpiarFiltros}
      />

      <section className={styles.feed}>
        <div className={styles.feedHead}>
          <h1>Qué está pasando en Melipilla</h1>
          {!isPending && !isError && (
            <p className={styles.resultados}>
              {publicaciones.length}{" "}
              {publicaciones.length === 1
                ? "publicación encontrada"
                : "publicaciones encontradas"}
            </p>
          )}
        </div>

        {isPending && <p className={styles.estado}>Cargando publicaciones...</p>}

        {isError && (
          <p className={styles.estadoError}>
            Error al conectar con el servidor:{" "}
            {error instanceof Error ? error.message : "Error desconocido"}
          </p>
        )}

        {!isPending && !isError && <PublicacionesGrid publicaciones={publicaciones} />}
      </section>
    </div>
  );
}
