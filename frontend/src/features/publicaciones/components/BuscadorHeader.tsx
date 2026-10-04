"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./BuscadorHeader.module.css";

export function BuscadorHeader({ queryInicial = "" }: { queryInicial?: string }) {
  const [valor, setValor] = useState(queryInicial);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const destino = valor.trim() ? `/?q=${encodeURIComponent(valor.trim())}` : "/";
    router.push(destino);
  }

  return (
    <form className={styles.buscador} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Buscar en Melipilla: arriendos, empleos, servicios..."
        aria-label="Buscar"
      />
    </form>
  );
}
