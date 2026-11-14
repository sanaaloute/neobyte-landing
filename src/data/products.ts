export type ProductStatus = "live" | "in-development";
export type ProductVisual = "legal" | "commerce" | "stocks" | "builder";
export type ProductFormFactor = "web" | "phone";

export interface Product {
  id: string;
  // Rendered by ProductMockup — stylized product visuals, not stock photos.
  visual: ProductVisual;
  // "web" (default) renders browser chrome; "phone" renders a phone frame
  // for mobile-app products.
  formFactor?: ProductFormFactor;
  status: ProductStatus;
  // Public URL, shown as an external "visit" link and as the mockup label.
  link?: string;
  // Domain shown in the mockup browser chrome (defaults to `link` host).
  label?: string;
  // Local screenshots of the real product, shown as a slidable gallery.
  screenshots?: string[];
  // Availability badges (proper nouns), e.g. mobile platforms for app products.
  channels?: string[];
  // Store URLs keyed by channel name (e.g. "Android" → Play Store link).
  // Channels without a link render as static chips.
  storeLinks?: Partial<Record<string, string>>;
  // Shown on the home page showcase.
  featured?: boolean;
}

// Text content lives in the locale files under `products.items.<id>`.
export const products: Product[] = [
  {
    id: "yawoto",
    visual: "legal",
    formFactor: "phone",
    status: "live",
    link: "https://yawoto.neobytech.net",
    channels: ["Android", "iOS"],
    featured: true,
  },
  {
    id: "barkosem",
    visual: "commerce",
    status: "live",
    link: "https://www.barkosem.com",
    label: "barkosem.com",
    screenshots: ["/products/barkosem.png"],
    featured: true,
  },
  {
    id: "koraBourse",
    visual: "stocks",
    formFactor: "phone",
    status: "live",
    channels: ["Android", "iOS"],
  },
  {
    id: "aiWebBuilder",
    visual: "builder",
    status: "live",
    link: "https://www.ai-web-builder.com/en",
    label: "ai-web-builder.com/en",
    screenshots: ["/products/ai-web-builder.png"],
  },
];

// Products highlighted on the home page.
export const featuredProducts = products.filter((p) => p.featured);
