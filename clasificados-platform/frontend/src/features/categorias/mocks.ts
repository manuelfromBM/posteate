import type { Categoria } from "./types";

export const categoriasMock: Categoria[] = [
  { id: 1, nombre: "Compra y venta", slug: "compra-y-venta", icono: "🛒", orden: 1, subcategorias: [] },
  { id: 2, nombre: "Arriendos y propiedades", slug: "arriendos-y-propiedades", icono: "🏠", orden: 2, subcategorias: [] },
  { id: 3, nombre: "Vehículos", slug: "vehiculos", icono: "🚗", orden: 3, subcategorias: [] },
  { id: 4, nombre: "Empleos", slug: "empleos", icono: "💼", orden: 4, subcategorias: [] },
  { id: 5, nombre: "Servicios", slug: "servicios", icono: "🛠️", orden: 5, subcategorias: [] },
  { id: 6, nombre: "Eventos", slug: "eventos", icono: "🎉", orden: 6, subcategorias: [] },
  { id: 7, nombre: "Mascotas", slug: "mascotas", icono: "🐾", orden: 7, subcategorias: [] },
  { id: 8, nombre: "Perdidos y encontrados", slug: "perdidos-y-encontrados", icono: "🔍", orden: 8, subcategorias: [] },
  { id: 9, nombre: "Promociones", slug: "promociones", icono: "🏷️", orden: 9, subcategorias: [] },
  { id: 10, nombre: "Avisos comunitarios", slug: "avisos-comunitarios", icono: "📣", orden: 10, subcategorias: [] },
  { id: 11, nombre: "Noticias / información local", slug: "noticias-informacion-local", icono: "📰", orden: 11, subcategorias: [] },
  { id: 12, nombre: "Otros", slug: "otros", icono: "✨", orden: 12, subcategorias: [] },
];
