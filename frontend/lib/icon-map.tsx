"use client";

import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

const iconNames = [
  "Brain",
  "MessageSquare",
  "Bot",
  "Smartphone",
  "Globe",
  "Monitor",
  "Shield",
  "Cloud",
  "Server",
  "CheckCircle2",
  "Target",
  "Users",
  "Award",
  "Zap",
  "Heart",
  "MapPin",
  "Phone",
  "Mail",
  "Calendar",
  "Clock",
  "Briefcase",
  "ArrowRight",
  "ExternalLink",
  "Download",
  "Quote",
  "Home",
  "Send",
  "Sparkles",
  "Sun",
  "Moon",
  "Menu",
  "X",
  "Github",
  "Linkedin",
  "Twitter",
] as const;

export type IconName = (typeof iconNames)[number];

export function getIcon(name: string): LucideIcon {
  const Icon = (Icons as Record<string, LucideIcon>)[name];
  return Icon || Icons.Brain;
}




