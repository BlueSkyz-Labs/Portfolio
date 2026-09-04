import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.PUBLIC_SITE_URL?.trim() || "http://localhost:4321";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
});
