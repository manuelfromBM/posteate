import {
  Briefcase,
  Car,
  Home,
  Megaphone,
  Newspaper,
  PartyPopper,
  PawPrint,
  Search,
  Shapes,
  ShoppingBag,
  Sparkles,
  Tag,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Debe coincidir con ICONOS_DISPONIBLES en backend/categorias/models.py
const ICONOS: Record<string, LucideIcon> = {
  home: Home,
  "shopping-bag": ShoppingBag,
  car: Car,
  briefcase: Briefcase,
  wrench: Wrench,
  "party-popper": PartyPopper,
  "paw-print": PawPrint,
  search: Search,
  tag: Tag,
  megaphone: Megaphone,
  newspaper: Newspaper,
  sparkles: Sparkles,
};

const ICONO_POR_DEFECTO = Shapes;

export function CategoriaIcono({ nombre, size = 18 }: { nombre: string; size?: number }) {
  const Icon = ICONOS[nombre] ?? ICONO_POR_DEFECTO;
  return <Icon size={size} aria-hidden="true" />;
}
