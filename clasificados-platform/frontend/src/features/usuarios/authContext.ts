import { createContext } from "react";

import type { Usuario } from "./types";

export interface AuthContextValue {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  setUsuario: (usuario: Usuario) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
