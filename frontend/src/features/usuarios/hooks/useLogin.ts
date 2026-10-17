"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import { api } from "@/lib/api";

import type { LoginCredentials } from "../types";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  async function login(credentials: LoginCredentials): Promise<boolean> {
    setError(null);

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Ingresa tu usuario y contraseña.");
      return false;
    }

    setIsSubmitting(true);
    try {
      await api.get("/auth/csrf/");
      await api.post("/auth/login/", credentials);
      await queryClient.invalidateQueries({ queryKey: ["usuario-actual"] });
      return true;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos.");
      } else {
        setError("No se pudo iniciar sesión. Intenta nuevamente.");
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { login, isSubmitting, error };
}
