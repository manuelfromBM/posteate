const UNIDADES: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

export function formatFechaRelativa(fechaISO: string): string {
  const segundos = (new Date(fechaISO).getTime() - Date.now()) / 1000;

  for (const [unidad, segundosPorUnidad] of UNIDADES) {
    if (Math.abs(segundos) >= segundosPorUnidad) {
      return formatter.format(Math.round(segundos / segundosPorUnidad), unidad);
    }
  }
  return formatter.format(Math.round(segundos / 60), "minute");
}
