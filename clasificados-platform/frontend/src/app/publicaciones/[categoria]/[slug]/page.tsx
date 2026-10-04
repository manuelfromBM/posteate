"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { ReportarPublicacionForm } from "@/features/moderacion/components/ReportarPublicacionForm";
import { formatPrecio } from "@/features/publicaciones/formatPrecio";
import { ESTADO_LABELS, ESTADO_OPCIONES } from "@/features/publicaciones/estadoLabels";
import { useCambiarEstadoPublicacion } from "@/features/publicaciones/hooks/useCambiarEstadoPublicacion";
import { useEliminarPublicacion } from "@/features/publicaciones/hooks/useEliminarPublicacion";
import { usePublicacion } from "@/features/publicaciones/hooks/usePublicacion";
import { EstadoPublicacion } from "@/features/publicaciones/types";
import { useAuth } from "@/features/usuarios/hooks/useAuth";
import { formatFechaRelativa } from "@/lib/date";

import styles from "./page.module.css";

export default function PublicacionDetallePage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria, slug } = use(params);
  const router = useRouter();
  const { usuario, isAuthenticated } = useAuth();
  const { data, isLoading, isError } = usePublicacion(slug);
  const cambiarEstado = useCambiarEstadoPublicacion();
  const eliminar = useEliminarPublicacion();

  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
  const [mostrandoReporte, setMostrandoReporte] = useState(false);

  if (isLoading) return <p>Cargando publicación...</p>;
  if (isError || !data) return <p>No se encontró la publicación.</p>;

  const esDueno = isAuthenticated && data.usuario_nombre === usuario?.username;
  const precioFormateado = formatPrecio(data.precio);

  return (
    <article className={styles.page}>
      {data.imagenes.length > 0 && (
        <div className={styles.galeria}>
          {data.imagenes.map((imagen) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={imagen.id} src={imagen.imagen} alt="" className={styles.imagen} />
          ))}
        </div>
      )}

      <div className={styles.top}>
        <span className={styles.categoria}>{data.categoria_nombre}</span>
        <span className={styles.fecha}>{formatFechaRelativa(data.fecha_publicacion)}</span>
      </div>

      <h1 className={styles.titulo}>{data.titulo}</h1>
      {precioFormateado && <p className={styles.precio}>{precioFormateado}</p>}
      <span className={styles.estadoBadge}>{ESTADO_LABELS[data.estado]}</span>

      <p className={styles.descripcion}>{data.descripcion}</p>

      <dl className={styles.detalles}>
        <div>
          <dt>Ubicación</dt>
          <dd>{data.ubicacion_nombre}</dd>
        </div>
        <div>
          <dt>Contacto</dt>
          <dd>{data.contacto}</dd>
        </div>
        <div>
          <dt>Publicado por</dt>
          <dd>{data.usuario_nombre}</dd>
        </div>
      </dl>

      {esDueno ? (
        <div className={styles.accionesDueno}>
          <Link href={`/publicaciones/${categoria}/${slug}/editar`} className={styles.accionBtn}>
            Editar
          </Link>

          <select
            className={styles.estadoSelect}
            value={data.estado}
            onChange={(event) =>
              cambiarEstado.mutate({ slug, estado: event.target.value as EstadoPublicacion })
            }
            disabled={cambiarEstado.isPending}
          >
            {ESTADO_OPCIONES.map((opcion) => (
              <option key={opcion} value={opcion}>
                {ESTADO_LABELS[opcion]}
              </option>
            ))}
          </select>

          {confirmandoEliminar ? (
            <>
              <button
                type="button"
                className={styles.accionBtnPeligro}
                disabled={eliminar.isPending}
                onClick={() => eliminar.mutate(slug, { onSuccess: () => router.push("/") })}
              >
                {eliminar.isPending ? "Eliminando..." : "Confirmar eliminación"}
              </button>
              <button
                type="button"
                className={styles.accionBtn}
                onClick={() => setConfirmandoEliminar(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.accionBtn}
              onClick={() => setConfirmandoEliminar(true)}
            >
              Eliminar
            </button>
          )}
        </div>
      ) : (
        isAuthenticated && (
          <div className={styles.reporte}>
            {mostrandoReporte ? (
              <ReportarPublicacionForm
                publicacion={data}
                categoriaSlug={categoria}
                onCancelar={() => setMostrandoReporte(false)}
              />
            ) : (
              <button
                type="button"
                className={styles.reportarBtn}
                onClick={() => setMostrandoReporte(true)}
              >
                Reportar publicación
              </button>
            )}
          </div>
        )
      )}
    </article>
  );
}
