import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
};

export default nextConfig;

// Lets the Next.js dev server integrate with the OpenNext Cloudflare
// adapter (local bindings support). No-op outside development.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
