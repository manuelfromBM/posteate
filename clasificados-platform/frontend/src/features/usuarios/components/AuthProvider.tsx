"use client";

import { useSyncExternalStore } from "react";

import { AuthContext } from "../authContext";
import { getUsuario, getUsuarioServerSnapshot, logout, setUsuario, subscribe } from "../authStore";

// Sesión simulada en el navegador: todavía no existe un endpoint de login
// real en el backend, así que no hay cookie/token que validar contra el
// servidor. Ver features/usuarios/hooks/useLogin.ts.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const usuario = useSyncExternalStore(subscribe, getUsuario, getUsuarioServerSnapshot);

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: usuario !== null, setUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
