"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCategorias } from "@/features/categorias/hooks/useCategorias";
import { useComunas } from "@/features/ubicaciones/hooks/useComunas";

import { ESTADO_LABELS, ESTADO_OPCIONES } from "../estadoLabels";
import { useActualizarPublicacion } from "../hooks/useActualizarPublicacion";
import { useCrearPublicacion } from "../hooks/useCrearPublicacion";
import { useImagenesPublicacion } from "../hooks/useImagenesPublicacion";
import { EstadoPublicacion, type ImagenPublicacion, type Publicacion } from "../types";
import styles from "./PublicacionForm.module.css";

interface ImagenNueva {
  archivo: File;
  previewUrl: string;
}

export function PublicacionForm({
  modo,
  publicacionInicial,
}: {
  modo: "crear" | "editar";
  publicacionInicial?: Publicacion;
}) {
  const router = useRouter();
  const { data: categoriasData } = useCategorias();
  const { data: comunasData } = useComunas();
  const crear = useCrearPublicacion();
  const actualizar = useActualizarPublicacion();
  const { subir, eliminar } = useImagenesPublicacion();

  const [titulo, setTitulo] = useState(publicacionInicial?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(publicacionInicial?.descripcion ?? "");
  const [categoria, setCategoria] = useState<number | "">(publicacionInicial?.categoria ?? "");
  const [subcategoria, setSubcategoria] = useState<number | "">(
    publicacionInicial?.subcategoria ?? ""
  );
  const [precio, setPrecio] = useState(publicacionInicial?.precio ?? "");
  const [estado, setEstado] = useState<EstadoPublicacion>(
    publicacionInicial?.estado ?? EstadoPublicacion.Disponible
  );
  const [ubicacion, setUbicacion] = useState<number | "">(publicacionInicial?.ubicacion ?? "");
  const [contacto, setContacto] = useState(publicacionInicial?.contacto ?? "");
  const [imagenesExistentes, setImagenesExistentes] = useState<ImagenPublicacion[]>(
    publicacionInicial?.imagenes ?? []
  );
  const [imagenesNuevas, setImagenesNuevas] = useState<ImagenNueva[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categoriaSeleccionada = categoriasData?.results.find((c) => c.id === categoria);
  const subcategorias = categoriaSeleccionada?.subcategorias ?? [];

  const isSubmitting = crear.isPending || actualizar.isPending || subir.isPending;

  function handleImagenesSeleccionadas(event: React.ChangeEvent<HTMLInputElement>) {
    const archivos = Array.from(event.target.files ?? []);
    const nuevas = archivos.map((archivo) => ({
      archivo,
      previewUrl: URL.createObjectURL(archivo),
    }));
    setImagenesNuevas((actuales) => [...actuales, ...nuevas]);
    event.target.value = "";
  }

  function quitarImagenNueva(index: number) {
    setImagenesNuevas((actuales) => actuales.filter((_, i) => i !== index));
  }

  async function quitarImagenExistente(id: number) {
    await eliminar.mutateAsync(id);
    setImagenesExistentes((actuales) => actuales.filter((imagen) => imagen.id !== id));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!titulo.trim() || !descripcion.trim() || !categoria || !ubicacion || !contacto.trim()) {
      setError("Completa los campos obligatorios.");
      return;
    }

    const input = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      categoria: Number(categoria),
      subcategoria: subcategoria ? Number(subcategoria) : null,
      precio: precio ? String(precio) : null,
      estado,
      ubicacion: Number(ubicacion),
      contacto: contacto.trim(),
    };

    try {
      const publicacion =
        modo === "crear"
          ? await crear.mutateAsync(input)
          : await actualizar.mutateAsync({ slug: publicacionInicial!.slug, input });

      const ordenBase = imagenesExistentes.length;
      for (const [index, { archivo }] of imagenesNuevas.entries()) {
        await subir.mutateAsync({
          publicacionId: publicacion.id,
          archivo,
          orden: ordenBase + index,
        });
      }

      const categoriaSlug =
        categoriasData?.results.find((c) => c.id === publicacion.categoria)?.slug ?? "";
      router.push(`/publicaciones/${categoriaSlug}/${publicacion.slug}`);
    } catch (err) {
      const status = isAxiosError(err) ? err.response?.status : undefined;
      if (status === 401 || status === 403) {
        setError(
          "El backend rechazó la solicitud porque todavía no existe un login real conectado " +
            "(esta sesión es simulada). El formulario queda listo para cuando exista autenticación real."
        );
      } else {
        setError("No se pudo guardar la publicación. Intenta nuevamente.");
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="titulo">
          Título
        </label>
        <input
          id="titulo"
          className={styles.input}
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className={styles.textarea}
          rows={5}
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="categoria">
            Categoría
          </label>
          <select
            id="categoria"
            className={styles.input}
            value={categoria}
            onChange={(event) => {
              setCategoria(event.target.value ? Number(event.target.value) : "");
              setSubcategoria("");
            }}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categoriasData?.results.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="subcategoria">
            Subcategoría <span className={styles.opcional}>(opcional)</span>
          </label>
          <select
            id="subcategoria"
            className={styles.input}
            value={subcategoria}
            onChange={(event) =>
              setSubcategoria(event.target.value ? Number(event.target.value) : "")
            }
            disabled={subcategorias.length === 0}
          >
            <option value="">Sin subcategoría</option>
            {subcategorias.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="precio">
            Precio <span className={styles.opcional}>(opcional)</span>
          </label>
          <input
            id="precio"
            type="number"
            min="0"
            className={styles.input}
            value={precio ?? ""}
            onChange={(event) => setPrecio(event.target.value)}
            placeholder="Ej: 15000"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            className={styles.input}
            value={estado}
            onChange={(event) => setEstado(event.target.value as EstadoPublicacion)}
          >
            {ESTADO_OPCIONES.map((opcion) => (
              <option key={opcion} value={opcion}>
                {ESTADO_LABELS[opcion]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="ubicacion">
          Ubicación
        </label>
        <select
          id="ubicacion"
          className={styles.input}
          value={ubicacion}
          onChange={(event) => setUbicacion(event.target.value ? Number(event.target.value) : "")}
          required
        >
          <option value="">Selecciona una comuna</option>
          {comunasData?.results.map((comuna) => (
            <option key={comuna.id} value={comuna.id}>
              {comuna.nombre} ({comuna.ciudad_nombre})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contacto">
          Contacto
        </label>
        <input
          id="contacto"
          className={styles.input}
          value={contacto}
          onChange={(event) => setContacto(event.target.value)}
          placeholder="Teléfono, WhatsApp o correo"
          required
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>
          Imágenes <span className={styles.opcional}>(opcional)</span>
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagenesSeleccionadas}
          className={styles.fileInput}
        />
        {(imagenesExistentes.length > 0 || imagenesNuevas.length > 0) && (
          <div className={styles.previews}>
            {imagenesExistentes.map((imagen) => (
              <div key={imagen.id} className={styles.preview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagen.imagen} alt="" className={styles.previewImg} />
                <button
                  type="button"
                  className={styles.previewRemove}
                  onClick={() => quitarImagenExistente(imagen.id)}
                  disabled={eliminar.isPending}
                >
                  ✕
                </button>
              </div>
            ))}
            {imagenesNuevas.map((imagen, index) => (
              <div key={imagen.previewUrl} className={styles.preview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagen.previewUrl} alt="" className={styles.previewImg} />
                <button
                  type="button"
                  className={styles.previewRemove}
                  onClick={() => quitarImagenNueva(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting
          ? "Guardando..."
          : modo === "crear"
            ? "Publicar anuncio"
            : "Guardar cambios"}
      </button>
    </form>
  );
}
