import type { APIRoute } from "astro";
import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const prerender = true;

export const GET: APIRoute = () => {
  const isLocalFallback =
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(SITE.url);
  const sitemap = absoluteUrl(SITE.url, "/sitemap.xml");
  const body = isLocalFallback
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : ["User-agent: *", "Allow: /", `Sitemap: ${sitemap}`, ""].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
