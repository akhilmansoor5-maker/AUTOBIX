import type { NextConfig } from "next";

/**
 * Project sites are served from /<repo>/. Set GITHUB_PAGES=true for that build.
 * Local `next dev` stays at the root so the existing URLs keep working.
 */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.GITHUB_PAGES === "true" && repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  // Static HTML in `out/`, which is what GitHub Pages can host.
  output: "export",
  // /services/index.html rather than /services.html, so Pages resolves the route.
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // The repo root sits above this folder, so pin Turbopack to the app itself.
  turbopack: {
    root: __dirname,
  },
  // The image optimizer needs a server. Pages has none, so ship the files as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
