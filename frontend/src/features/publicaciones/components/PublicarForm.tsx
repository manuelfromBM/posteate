"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useCategorias } from "@/features/categorias/hooks/useCategorias";
import { useComunas } from "@/features/ubicaciones/hooks/useComunas";
import { useSectores } from "@/features/ubicaciones/hooks/useSectores";

import { useCrearPublicacion } from "../hooks/useCrearPublicacion";
import { useSubirImagen } from "../hooks/useSubirImagen";
import { SelectorImagenes } from "./SelectorImagenes";
import styles from "./PublicarForm.module.css";

function aNumeroONull(valor: string): number | null {
  if (!valor.trim()) return null;
  const n = Number(valor);
  return Number.isNaN(n) ? null : n;
}

export function PublicarForm() {
  const router = useRouter();
  const { data: categorias } = useCategorias();
  const { data: comunas } = useComunas();
  const { data: sectores } = useSectores();
  const crearPublicacion = useCrearPublicacion();
  const subirImagen = useSubirImagen();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [subcategoriaId, setSubcategoriaId] = useState("");
  const [precio, setPrecio] = useState("");
  const [recompensa, setRecompensa] = useState("");
  const [comunaId, setComunaId] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [contacto, setContacto] = useState("");
  const [archivos, setArchivos] = useState<File[]>([]);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  const [errorImagenes, setErrorImagenes] = useState<string | null>(null);
  const [subiendoImagenes, setSubiendoImagenes] = useState(false);

  const subcategoriasDisponibles = useMemo(() => {
    const categoria = categorias?.results.find((c) => String(c.id) === categoriaId);
    return categoria?.subcategorias ?? [];
  }, [categorias, categoriaId]);

  const sectoresDisponibles = useMemo(() => {
    if (!comunaId) return [];
    return (sectores?.results ?? []).filter((s) => String(s.comuna) === comunaId);
  }, [sectores, comunaId]);

  function handleComunaChange(valor: string) {
    setComunaId(valor);
    setSectorId("");
  }

  function handleCategoriaChange(valor: string) {
    setCategoriaId(valor);
    setSubcategoriaId("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorValidacion(null);
    setErrorImagenes(null);

    if (!titulo.trim() || !descripcion.trim() || !categoriaId || !comunaId) {
      setErrorValidacion("Completa título, descripción, categoría y comuna.");
      return;
    }

    let publicacion;
    try {
      publicacion = await crearPublicacion.mutateAsync({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        categoria: Number(categoriaId),
        subcategoria: subcategoriaId ? Number(subcategoriaId) : null,
        precio: aNumeroONull(precio),
        recompensa: aNumeroONull(recompensa),
        comuna: Number(comunaId),
        sector: sectorId ? Number(sectorId) : null,
        contacto: contacto.trim() || undefined,
      });
    } catch {
      // el error de mutación ya queda reflejado via crearPublicacion.isError
      return;
    }

    if (archivos.length > 0) {
      setSubiendoImagenes(true);
      let fallidas = 0;
      for (let i = 0; i < archivos.length; i += 1) {
        try {
          await subirImagen.mutateAsync({
            publicacionId: Number(publicacion.id),
            archivo: archivos[i],
            orden: i,
          });
        } catch {
          fallidas += 1;
        }
      }
      setSubiendoImagenes(false);
      if (fallidas > 0) {
        setErrorImagenes(
          `La publicación se creó, pero ${fallidas} de ${archivos.length} imagen(es) no se pudieron subir.`
        );
      }
    }

    router.push(`/publicaciones/${publicacion.categoria_slug}/${publicacion.slug}`);
  }

  const errorEnvio =
    crearPublicacion.error instanceof AxiosError
      ? crearPublicacion.error.response?.status === 401
        ? "Tu sesión expiró. Vuelve a iniciar sesión e intenta de nuevo."
        : "No se pudo crear la publicación. Revisa los datos e intenta de nuevo."
      : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="titulo">
          Título *
        </label>
        <input
          id="titulo"
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className={styles.campo}>
        <label className={styles.label} htmlFor="descripcion">
          Descripción *
        </label>
        <textarea
          id="descripcion"
          className={styles.textarea}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={5}
        />
      </div>

      <div className={styles.fila}>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="categoria">
            Categoría *
          </label>
          <select
            id="categoria"
            className={styles.select}
            value={categoriaId}
            onChange={(e) => handleCategoriaChange(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            {categorias?.results.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label className={styles.label} htmlFor="subcategoria">
            Subcategoría
          </label>
          <select
            id="subcategoria"
            className={styles.select}
            value={subcategoriaId}
            onChange={(e) => setSubcategoriaId(e.target.value)}
            disabled={subcategoriasDisponibles.length === 0}
          >
            <option value="">Sin especificar</option>
            {subcategoriasDisponibles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.fila}>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="precio">
            Precio (CLP)
          </label>
          <input
            id="precio"
            type="number"
            min="0"
            className={styles.input}
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Déjalo vacío para 'Consultar'"
          />
        </div>

        <div className={styles.campo}>
          <label className={styles.label} htmlFor="recompensa">
            Recompensa (CLP)
          </label>
          <input
            id="recompensa"
            type="number"
            min="0"
            className={styles.input}
            value={recompensa}
            onChange={(e) => setRecompensa(e.target.value)}
            placeholder="Opcional"
          />
        </div>
      </div>

      <div className={styles.fila}>
        <div className={styles.campo}>
          <label className={styles.label} htmlFor="comuna">
            Comuna *
          </label>
          <select
            id="comuna"
            className={styles.select}
            value={comunaId}
            onChange={(e) => handleComunaChange(e.target.value)}
          >
            <option value="">Selecciona una comuna</option>
            {comunas?.results.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campo}>
          <label className={styles.label} htmlFor="sector">
            Sector
          </label>
          <select
            id="sector"
            className={styles.select}
            value={sectorId}
            onChange={(e) => setSectorId(e.target.value)}
            disabled={sectoresDisponibles.length === 0}
          >
            <option value="">Sin especificar</option>
            {sectoresDisponibles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.campo}>
        <label className={styles.label} htmlFor="contacto">
          Contacto
        </label>
        <input
          id="contacto"
          className={styles.input}
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          placeholder="Teléfono, WhatsApp o email (opcional)"
          maxLength={100}
        />
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>Imágenes</label>
        <SelectorImagenes archivos={archivos} onChange={setArchivos} />
      </div>

      {(errorValidacion || errorEnvio || errorImagenes) && (
        <p className={styles.error}>{errorValidacion ?? errorEnvio ?? errorImagenes}</p>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={crearPublicacion.isPending || subiendoImagenes}
      >
        {crearPublicacion.isPending
          ? "Publicando..."
          : subiendoImagenes
            ? "Subiendo imágenes..."
            : "Publicar"}
      </button>
    </form>
  );
}
