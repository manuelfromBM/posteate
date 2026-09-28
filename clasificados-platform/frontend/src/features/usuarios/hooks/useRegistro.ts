"use client";

import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { api } from "@/lib/api";

import type { RegistroErrores, RegistroInput, Usuario } from "../types";

async function registrarUsuario(input: RegistroInput): Promise<Usuario> {
  const { data } = await api.post<Usuario>("/usuarios/", input);
  return data;
}

export function useRegistro() {
  const mutation = useMutation({
    mutationFn: registrarUsuario,
  });

  const erroresCampo = isAxiosError<RegistroErrores>(mutation.error)
    ? mutation.error.response?.data
    : undefined;

  return {
    registrar: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    erroresCampo,
  };
}
