import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export function getIcon(name: string): LucideIcon {
  const Icon = (Icons as Record<string, LucideIcon>)[name];
  return Icon || Icons.Brain;
}


