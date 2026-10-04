import type { Usuario } from "./types";

const STORAGE_KEY = "posteate_auth_usuario";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getUsuario(): Usuario | null {
  const guardado = window.localStorage.getItem(STORAGE_KEY);
  if (!guardado) return null;
  try {
    return JSON.parse(guardado) as Usuario;
  } catch {
    return null;
  }
}

export function getUsuarioServerSnapshot(): Usuario | null {
  return null;
}

export function setUsuario(usuario: Usuario): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
  emit();
}

export function logout(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  emit();
}
