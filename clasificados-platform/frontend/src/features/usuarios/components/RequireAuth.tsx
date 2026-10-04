"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  return <>{children}</>;
}
