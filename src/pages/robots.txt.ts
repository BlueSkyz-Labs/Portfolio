import type { APIRoute } from "astro";
import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import { isNonProductionSiteUrl } from "@/lib/truth";

export const prerender = true;

export const GET: APIRoute = () => {
  const disallowIndexing = isNonProductionSiteUrl(SITE.url);
  const sitemap = absoluteUrl(SITE.url, "/sitemap.xml");
  const body = disallowIndexing
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : ["User-agent: *", "Allow: /", `Sitemap: ${sitemap}`, ""].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
