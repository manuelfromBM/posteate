"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useCategorias } from "@/features/categorias/hooks/useCategorias";
import { useComunas } from "@/features/ubicaciones/hooks/useComunas";

import { usePublicaciones } from "../hooks/usePublicaciones";
import { EstadoPublicacion, type PublicacionConCategoria, type PublicacionesFiltros } from "../types";
import styles from "./BuscadorPublicaciones.module.css";
import { PublicacionesGrid } from "./PublicacionesGrid";

const DEBOUNCE_MS = 400;

export function BuscadorPublicaciones({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();

  const [q, setQ] = useState(initialQuery);
  const [qDebounced, setQDebounced] = useState(initialQuery);
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [soloDisponibles, setSoloDisponibles] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setQDebounced(q.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [q]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (qDebounced) params.set("q", qDebounced);
    const query = params.toString();
    router.replace(query ? `/buscar?${query}` : "/buscar", { scroll: false });
  }, [qDebounced, router]);

  const { data: categoriasData } = useCategorias();
  const { data: comunasData } = useComunas();

  const filtros = useMemo<PublicacionesFiltros>(
    () => ({
      q: qDebounced || undefined,
      categoria: categoria || undefined,
      ubicacion: ubicacion || undefined,
      precio_min: precioMin ? Number(precioMin) : undefined,
      precio_max: precioMax ? Number(precioMax) : undefined,
      estado: soloDisponibles ? EstadoPublicacion.Disponible : undefined,
    }),
    [qDebounced, categoria, ubicacion, precioMin, precioMax, soloDisponibles]
  );

  const { data, isLoading, isFetching, isError } = usePublicaciones(filtros);

  const categoriaSlugPorId = useMemo(() => {
    const mapa = new Map<number, string>();
    categoriasData?.results.forEach((cat) => mapa.set(cat.id, cat.slug));
    return mapa;
  }, [categoriasData]);

  const resultados: PublicacionConCategoria[] = useMemo(
    () =>
      (data?.results ?? []).map((publicacion) => ({
        publicacion,
        categoriaSlug: categoriaSlugPorId.get(publicacion.categoria) ?? "otros",
      })),
    [data, categoriaSlugPorId]
  );

  const hayFiltrosActivos = Boolean(categoria || ubicacion || precioMin || precioMax || !soloDisponibles);

  function limpiarFiltros() {
    setCategoria("");
    setUbicacion("");
    setPrecioMin("");
    setPrecioMax("");
    setSoloDisponibles(true);
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.searchBar} onSubmit={(event) => event.preventDefault()} role="search">
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <input
          className={styles.searchInput}
          type="search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Busca por ejemplo: bicicleta, arriendo, pega de garzón..."
          autoFocus
        />
      </form>

      <div className={styles.filtros}>
        <select
          className={styles.select}
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categoriasData?.results.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={ubicacion}
          onChange={(event) => setUbicacion(event.target.value)}
          aria-label="Filtrar por sector"
        >
          <option value="">Todos los sectores</option>
          {comunasData?.results.map((comuna) => (
            <option key={comuna.id} value={comuna.id}>
              {comuna.nombre}
            </option>
          ))}
        </select>

        <div className={styles.rangoPrecio}>
          <input
            className={styles.inputPrecio}
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Precio mín."
            value={precioMin}
            onChange={(event) => setPrecioMin(event.target.value)}
            aria-label="Precio mínimo"
          />
          <span className={styles.rangoSeparador}>–</span>
          <input
            className={styles.inputPrecio}
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Precio máx."
            value={precioMax}
            onChange={(event) => setPrecioMax(event.target.value)}
            aria-label="Precio máximo"
          />
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={soloDisponibles}
            onChange={(event) => setSoloDisponibles(event.target.checked)}
          />
          Solo disponibles
        </label>

        {hayFiltrosActivos && (
          <button type="button" className={styles.limpiar} onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        )}
      </div>

      <div className={styles.resultadosHeader}>
        {isLoading ? (
          <span className={styles.resultadosCount}>Buscando...</span>
        ) : (
          <span className={styles.resultadosCount}>
            {data?.count ?? 0} publicación{data?.count === 1 ? "" : "es"}
            {qDebounced && (
              <>
                {" "}
                para <strong>&quot;{qDebounced}&quot;</strong>
              </>
            )}
          </span>
        )}
        {isFetching && !isLoading && <span className={styles.actualizando}>Actualizando...</span>}
      </div>

      {isError && (
        <p className={styles.errorEstado}>
          Ocurrió un error al buscar publicaciones. Intenta nuevamente.
        </p>
      )}

      {!isError && isLoading && (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      )}

      {!isError && !isLoading && (
        <PublicacionesGrid
          publicaciones={resultados}
          mensajeVacio={
            qDebounced || hayFiltrosActivos
              ? "No encontramos publicaciones con esos criterios. Prueba ajustando la búsqueda o los filtros."
              : "Escribe algo para empezar a buscar."
          }
        />
      )}
    </div>
  );
}
