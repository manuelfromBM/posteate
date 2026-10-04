"use client";

import Link from "next/link";

import { useAuth } from "../hooks/useAuth";
import styles from "./HeaderAuthActions.module.css";

export function HeaderAuthActions() {
  const { usuario, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Link href="/registro" className={styles.registro}>
          Crear cuenta
        </Link>
        <Link href="/login" className={styles.login}>
          Ingresar
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/publicaciones/nueva" className={styles.login}>
        + Publicar
      </Link>
      <Link href="/mis-publicaciones" className={styles.registro}>
        Mis publicaciones
      </Link>
      <span className={styles.usuario}>Hola, {usuario?.username}</span>
      <button type="button" className={styles.logout} onClick={logout}>
        Salir
      </button>
    </>
  );
}
