export interface Industry {
  id: string;
  icon: string;
}

// Labels live in the locale files under `industries.items.<id>`.
export const industries: Industry[] = [
  { id: "financial", icon: "Landmark" },
  { id: "commerce", icon: "Store" },
  { id: "education", icon: "GraduationCap" },
  { id: "legal", icon: "Scale" },
  { id: "agriculture", icon: "Leaf" },
  { id: "enterprise", icon: "Building2" },
  { id: "security", icon: "Shield" },
  { id: "emerging", icon: "Globe" },
];
