export type ProductStatus = "live" | "in-development";
export type ProductVisual = "legal" | "commerce" | "stocks" | "builder";

export interface Product {
  id: string;
  // Rendered by ProductMockup — stylized product visuals, not stock photos.
  visual: ProductVisual;
  status: ProductStatus;
  // Public URL, shown as an external "visit" link and as the mockup label.
  link?: string;
  // Domain shown in the mockup browser chrome (defaults to `link` host).
  label?: string;
  // Local screenshots of the real product, shown as a slidable gallery.
  screenshots?: string[];
  // Distribution channels for products without a web URL (proper nouns).
  channels?: string[];
  // Shown on the home page showcase.
  featured?: boolean;
}

// Text content lives in the locale files under `products.items.<id>`.
export const products: Product[] = [
  {
    id: "yawoto",
    visual: "legal",
    status: "live",
    link: "https://yawoto.neobytech.net",
    screenshots: ["/products/yawoto.png"],
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
    id: "brvmAgent",
    visual: "stocks",
    status: "live",
    channels: ["Telegram", "WhatsApp"],
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
