import { LoginForm } from "@/features/usuarios/components/LoginForm";

import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ingresar</h1>
      <LoginForm />
    </div>
  );
}
