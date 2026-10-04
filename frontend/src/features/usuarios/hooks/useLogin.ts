"use client";

import { useState } from "react";

import { useAuth } from "./useAuth";
import type { LoginCredentials } from "../types";

// El backend todavía no expone un endpoint de login (ver docs/notas de la
// conversación). Esta sesión es simulada: no valida la contraseña contra el
// servidor, solo guarda al usuario localmente para poder construir las
// pantallas que dependen de "estar autenticado". Reemplazar por una llamada
// real cuando exista autenticación en el backend.
export function useLogin() {
  const { setUsuario } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credentials: LoginCredentials): Promise<boolean> {
    setError(null);

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Ingresa tu usuario y contraseña.");
      return false;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);

    setUsuario({
      id: 0,
      username: credentials.username.trim(),
      email: "",
      first_name: "",
      last_name: "",
      telefono: "",
      whatsapp: "",
      direccion: "",
      avatar: null,
      fecha_nacimiento: null,
    });

    return true;
  }

  return { login, isSubmitting, error };
}
