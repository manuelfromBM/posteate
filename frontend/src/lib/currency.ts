const formatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatMoneda(valorTexto: string | null): string | null {
  if (!valorTexto) return null;
  const valor = Number(valorTexto);
  if (Number.isNaN(valor)) return null;
  return formatter.format(valor);
}
