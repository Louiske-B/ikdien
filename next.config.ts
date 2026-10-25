import type { NextConfig } from "next";

// Statische export voor Cloudflare Pages: `npm run build` levert de map `out/` op.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
