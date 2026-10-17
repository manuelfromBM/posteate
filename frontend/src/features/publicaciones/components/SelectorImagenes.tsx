"use client";

import { useEffect, useMemo } from "react";

import styles from "./SelectorImagenes.module.css";

interface SelectorImagenesProps {
  archivos: File[];
  onChange: (archivos: File[]) => void;
}

export function SelectorImagenes({ archivos, onChange }: SelectorImagenesProps) {
  const previews = useMemo(
    () => archivos.map((archivo) => URL.createObjectURL(archivo)),
    [archivos]
  );

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  function handleSeleccion(event: React.ChangeEvent<HTMLInputElement>) {
    const nuevos = Array.from(event.target.files ?? []);
    if (nuevos.length > 0) {
      onChange([...archivos, ...nuevos]);
    }
    event.target.value = "";
  }

  function quitar(index: number) {
    onChange(archivos.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.contenedor}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleSeleccion}
        className={styles.input}
      />

      {previews.length > 0 && (
        <div className={styles.grid}>
          {previews.map((url, i) => (
            <div key={url} className={styles.miniatura}>
              {/* eslint-disable-next-line @next/next/no-img-element -- previsualizacion de un File local (blob:), next/image no sirve aqui */}
              <img src={url} alt={`Vista previa ${i + 1}`} />
              <button
                type="button"
                className={styles.quitar}
                onClick={() => quitar(i)}
                aria-label="Quitar imagen"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
