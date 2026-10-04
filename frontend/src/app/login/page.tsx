import { LoginForm } from "@/features/usuarios/components/LoginForm";

import styles from "./page.module.css";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registrado?: string }>;
}) {
  const { registrado } = await searchParams;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ingresar</h1>
      {registrado === "1" && (
        <p className={styles.successBanner}>
          Cuenta creada con éxito. Ahora puedes iniciar sesión.
        </p>
      )}
      <LoginForm />
    </div>
  );
}
