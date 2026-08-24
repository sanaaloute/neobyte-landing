import type { MetadataRoute } from "next";

const baseUrl = "https://neobytech.net";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/products", "/services", "/contact", "/about", "/policy"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );
}
