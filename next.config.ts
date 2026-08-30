import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,

  // Cloudflare Pages serves the generated `out/` directory as static assets.
  // On-demand Next image optimization requires a server runtime, so static
  // exports keep images unoptimized until a dedicated image pipeline exists.
  images: {
    unoptimized: true,
  },

  // TypeScript & ESLint are strict; fail builds on issues.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
