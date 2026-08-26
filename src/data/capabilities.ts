export interface Capability {
  id: string;
  icon: string;
  // Illustrative photo shown on cards, from public/pillars/.
  image: string;
  // Item keys resolved from locales: `solutions.pillars.<id>.items`
}

// The four technology pillars. Text content lives in the locale files under
// `solutions.pillars.<id>`.
export const capabilities: Capability[] = [
  { id: "ai", icon: "Brain", image: "/pillars/ai.jpg" },
  { id: "software", icon: "Code2", image: "/pillars/software.jpg" },
  { id: "cloud", icon: "Cloud", image: "/pillars/cloud.jpg" },
  { id: "commerce", icon: "ShoppingCart", image: "/pillars/commerce.jpg" },
];
