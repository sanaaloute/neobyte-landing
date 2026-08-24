import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  Building2,
  Cloud,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Landmark,
  Leaf,
  Scale,
  Shield,
  ShoppingCart,
  Store,
} from "lucide-react";

// Explicit map of the icons actually used, so bundlers can tree-shake the
// rest of lucide-react.
const iconMap: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Building2,
  Cloud,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Landmark,
  Leaf,
  Scale,
  Shield,
  ShoppingCart,
  Store,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Brain;
}
