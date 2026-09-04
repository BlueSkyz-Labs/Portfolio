import type { APIRoute } from "astro";
import { SITE } from "@/data/site";
import { getPublicProducts } from "@/lib/products";
import { absoluteUrl, PUBLIC_STATIC_PATHS } from "@/lib/seo";

export const prerender = true;

function urlEntry(loc: string): string {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

export const GET: APIRoute = async () => {
  const products = await getPublicProducts();
  const locs = [
    ...PUBLIC_STATIC_PATHS.map((path) => absoluteUrl(SITE.url, path)),
    ...products.map((product) =>
      absoluteUrl(SITE.url, `/products/${product.id}/`),
    ),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...locs.map(urlEntry),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
