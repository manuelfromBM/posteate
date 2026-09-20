"use client";

import { useState } from "react";

import type { LoginCredentials } from "../types";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: reemplazar por una llamada real a la API cuando el backend esté conectado.
  async function login(credentials: LoginCredentials): Promise<boolean> {
    setError(null);

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Ingresa tu usuario y contraseña.");
      return false;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);

    return true;
  }

  return { login, isSubmitting, error };
}
