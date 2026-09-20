"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogin } from "../hooks/useLogin";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const router = useRouter();
  const { login, isSubmitting, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const exito = await login({ username, password });
    if (exito) {
      router.push("/");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="username">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          className={styles.input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
