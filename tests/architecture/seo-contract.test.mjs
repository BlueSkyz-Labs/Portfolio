import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("SEO helpers keep absolute URLs and Organization JSON-LD truthful", async () => {
  const seo = await import("../../src/lib/seo.ts");
  assert.equal(
    seo.absoluteUrl("https://example.com", "/products/"),
    "https://example.com/products/",
  );
  assert.equal(
    seo.absoluteUrl("https://example.com/", "about/"),
    "https://example.com/about/",
  );

  const org = seo.organizationJsonLd("https://example.com/");
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "BlueSkyz Labs");
  assert.equal(org.url, "https://example.com/");
});

test("BaseLayout wires canonical, OG, and structured data without staging hard-codes", () => {
  const layout = readFileSync("src/layouts/BaseLayout.astro", "utf8");
  assert.match(layout, /rel="canonical"/);
  assert.match(layout, /og:image/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /organizationJsonLd/);
  assert.match(layout, /websiteJsonLd/);
  assert.doesNotMatch(layout, /portfolio\.tonydemo\.com/);
  assert.doesNotMatch(layout, /workers\.dev/);
});

test("robots and sitemap endpoints exist and reference public routes only", () => {
  assert.equal(existsSync("src/pages/robots.txt.ts"), true);
  assert.equal(existsSync("src/pages/sitemap.xml.ts"), true);
  const robots = readFileSync("src/pages/robots.txt.ts", "utf8");
  const sitemap = readFileSync("src/pages/sitemap.xml.ts", "utf8");
  assert.match(robots, /Sitemap:/);
  assert.match(sitemap, /getPublicProducts/);
  assert.match(sitemap, /PUBLIC_STATIC_PATHS/);
  assert.doesNotMatch(sitemap, /portfolio\.tonydemo\.com/);
});

test("default OG asset is committed masterbrand art", () => {
  assert.equal(existsSync("public/social/og-default.png"), true);
});
