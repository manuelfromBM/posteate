"use client";

import { useState } from "react";

import type { Publicacion } from "@/features/publicaciones/types";
import { useAuth } from "@/features/usuarios/hooks/useAuth";

import { useReportarPublicacion } from "../hooks/useReportarPublicacion";
import { MOTIVO_LABELS, MOTIVO_OPCIONES } from "../motivoLabels";
import { ReporteMotivo } from "../types";
import styles from "./ReportarPublicacionForm.module.css";

export function ReportarPublicacionForm({
  publicacion,
  categoriaSlug,
  onCancelar,
}: {
  publicacion: Publicacion;
  categoriaSlug: string;
  onCancelar: () => void;
}) {
  const { usuario } = useAuth();
  const { reportar } = useReportarPublicacion();

  const [motivo, setMotivo] = useState<ReporteMotivo>(ReporteMotivo.Spam);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!usuario) return;

    reportar({
      publicacion,
      categoriaSlug,
      motivo,
      comentario: comentario.trim(),
      reportadoPor: usuario.username,
    });
    setEnviado(true);
  }

  if (enviado) {
    return (
      <p className={styles.confirmacion}>
        Gracias, revisaremos tu reporte. (Este reporte solo queda registrado en tu navegador;
        todavía no hay un endpoint de reportes en el backend.)
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="motivo">
          Motivo
        </label>
        <select
          id="motivo"
          className={styles.input}
          value={motivo}
          onChange={(event) => setMotivo(event.target.value as ReporteMotivo)}
        >
          {MOTIVO_OPCIONES.map((opcion) => (
            <option key={opcion} value={opcion}>
              {MOTIVO_LABELS[opcion]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="comentario">
          Comentario <span className={styles.opcional}>(opcional)</span>
        </label>
        <textarea
          id="comentario"
          className={styles.textarea}
          rows={3}
          value={comentario}
          onChange={(event) => setComentario(event.target.value)}
        />
      </div>

      <div className={styles.acciones}>
        <button type="submit" className={styles.submit}>
          Enviar reporte
        </button>
        <button type="button" className={styles.cancelar} onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
