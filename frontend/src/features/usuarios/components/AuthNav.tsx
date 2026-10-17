"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLogout } from "../hooks/useLogout";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import styles from "./AuthNav.module.css";

export function AuthNav() {
  const { data: usuario, isPending } = useUsuarioActual();
  const logout = useLogout();
  const router = useRouter();

  async function handleLogout() {
    await logout.mutateAsync();
    router.push("/");
  }

  if (isPending) {
    return <span className={styles.placeholder} />;
  }

  if (!usuario) {
    return (
      <Link href="/login" className={styles.navLink}>
        Ingresar
      </Link>
    );
  }

  return (
    <>
      <span className={styles.usuario}>{usuario.username}</span>
      <button type="button" className={styles.salir} onClick={handleLogout}>
        Salir
      </button>
    </>
  );
}
