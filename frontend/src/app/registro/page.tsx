import Link from "next/link";

import { RegistroForm } from "@/features/usuarios/components/RegistroForm";

import styles from "./page.module.css";

const BENEFICIOS = [
  { icono: "📢", texto: "Publica avisos gratis en tu comunidad" },
  { icono: "🔍", texto: "Encuentra lo que necesitas, sin perderte en grupos de Facebook" },
  { icono: "🤝", texto: "Contacta directo con quien publica, sin intermediarios" },
];

export default function RegistroPage() {
  return (
    <div className={styles.page}>
      <section className={styles.brandPanel}>
        <span className={styles.logo}>Posteate</span>
        <h1 className={styles.headline}>Súmate a la comunidad local</h1>
        <p className={styles.subheadline}>
          Todo lo que se publica, busca y encuentra en tu ciudad, en un solo lugar.
        </p>
        <ul className={styles.beneficios}>
          {BENEFICIOS.map((beneficio) => (
            <li key={beneficio.texto} className={styles.beneficio}>
              <span className={styles.beneficioIcono} aria-hidden="true">
                {beneficio.icono}
              </span>
              <span>{beneficio.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Crear cuenta</h2>
          <p className={styles.formSubtitle}>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className={styles.link}>
              Ingresa aquí
            </Link>
          </p>
          <RegistroForm />
        </div>
      </section>
    </div>
  );
}
