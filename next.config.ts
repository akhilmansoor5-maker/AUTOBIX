import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root sits above this folder, so pin Turbopack to the app itself.
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
