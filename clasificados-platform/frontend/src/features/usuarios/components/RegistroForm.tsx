"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useRegistro } from "../hooks/useRegistro";
import styles from "./RegistroForm.module.css";

const PASSWORD_MIN_LENGTH = 8;

export function RegistroForm() {
  const router = useRouter();
  const { registrar, isSubmitting, erroresCampo } = useRegistro();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmarPassword: "",
    first_name: "",
    last_name: "",
    telefono: "",
  });
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  function actualizarCampo(campo: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((actual) => ({ ...actual, [campo]: event.target.value }));
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorLocal(null);

    if (form.password.length < PASSWORD_MIN_LENGTH) {
      setErrorLocal(`La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`);
      return;
    }

    if (form.password !== form.confirmarPassword) {
      setErrorLocal("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registrar({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        first_name: form.first_name.trim() || undefined,
        last_name: form.last_name.trim() || undefined,
        telefono: form.telefono.trim() || undefined,
      });
      router.push("/login?registrado=1");
    } catch {
      // El detalle del error queda disponible en erroresCampo para mostrarlo por campo.
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="first_name">
            Nombre
          </label>
          <input
            id="first_name"
            className={styles.input}
            value={form.first_name}
            onChange={actualizarCampo("first_name")}
            autoComplete="given-name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="last_name">
            Apellido
          </label>
          <input
            id="last_name"
            className={styles.input}
            value={form.last_name}
            onChange={actualizarCampo("last_name")}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="username">
          Nombre de usuario
        </label>
        <input
          id="username"
          className={styles.input}
          value={form.username}
          onChange={actualizarCampo("username")}
          autoComplete="username"
          required
        />
        {erroresCampo?.username && (
          <p className={styles.fieldError}>{erroresCampo.username[0]}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={form.email}
          onChange={actualizarCampo("email")}
          autoComplete="email"
          required
        />
        {erroresCampo?.email && <p className={styles.fieldError}>{erroresCampo.email[0]}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="telefono">
          Teléfono <span className={styles.opcional}>(opcional)</span>
        </label>
        <input
          id="telefono"
          type="tel"
          className={styles.input}
          value={form.telefono}
          onChange={actualizarCampo("telefono")}
          autoComplete="tel"
          placeholder="+56 9 1234 5678"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={form.password}
            onChange={actualizarCampo("password")}
            autoComplete="new-password"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="confirmarPassword">
            Confirmar contraseña
          </label>
          <input
            id="confirmarPassword"
            type="password"
            className={styles.input}
            value={form.confirmarPassword}
            onChange={actualizarCampo("confirmarPassword")}
            autoComplete="new-password"
            required
          />
        </div>
      </div>

      {(errorLocal || erroresCampo?.non_field_errors) && (
        <p className={styles.error}>{errorLocal ?? erroresCampo?.non_field_errors?.[0]}</p>
      )}

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
