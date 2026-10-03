import Link from "next/link";
import { formatFechaRelativa } from "@/lib/date";
import type { Publicacion } from "../../types"; // Ajustada la ruta relativa hacia tus types
import styles from "./PublicacionCard.module.css";

// Formateador genérico para CLP (sin centavos)
function  formatMoneda(valorTexto: string | null): string | null {
  if (!valorTexto) return null;
  const valor = Number(valorTexto);
  if (Number.isNaN(valor)) return null;
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export function PublicacionCard({ publicacion }: { publicacion: Publicacion }) {
  const precioFormateado = formatMoneda(publicacion.precio);
  const recompensaFormateada = formatMoneda(publicacion.recompensa);

  // 🌟 Usamos el slug real que viene de Django para armar la URL del enrutador dinámico
  const rutaCategoria = publicacion.categoria_slug || "general";

  return (
    <Link
      href={`/publicaciones/${rutaCategoria}/${publicacion.slug}`}
      className={styles.card}
    >
      <div className={styles.top}>
        <span className={styles.categoria}>{publicacion.categoria_nombre}</span>
        <span className={styles.fecha}>
          {formatFechaRelativa(publicacion.fecha_publicacion)}
        </span>
      </div>
      
      <h3 className={styles.titulo}>{publicacion.titulo}</h3>
      <p className={styles.descripcion}>{publicacion.descripcion}</p>
      
      <div className={styles.footer}>
        <span className={styles.ubicacion}>📍 {publicacion.ubicacion_nombre}</span>
        
        {/* Muestra precio si existe (Arriendos, Compra/Venta) */}
        {precioFormateado && <span className={styles.precio}>{precioFormateado}</span>}
        
        {/* Muestra recompensa si existe (Mascotas Perdidas) */}
        {recompensaFormateada && (
          <span className={styles.recompensa}>💰 Recompensa: {recompensaFormateada}</span>
        )}
      </div>
    </Link>
  );
}
