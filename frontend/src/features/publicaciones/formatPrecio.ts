export function formatPrecio(precio: string | null): string | null {
  if (!precio) return null;
  const valor = Number(precio);
  if (Number.isNaN(valor)) return null;
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}
