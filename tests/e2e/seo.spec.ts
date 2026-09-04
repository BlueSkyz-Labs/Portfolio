import { expect, test } from "@playwright/test";

test("home exposes canonical, OG, and Organization JSON-LD", async ({
  page,
}) => {
  await page.goto("/");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /\/$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /BlueSkyz Labs/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/social\/og-default\.png$/,
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const parsed = jsonLd.map((raw) => JSON.parse(raw));
  expect(parsed.some((entry) => entry["@type"] === "Organization")).toBe(true);
  expect(parsed.some((entry) => entry["@type"] === "WebSite")).toBe(true);
});

test("robots and sitemap are public and exclude staging hard-codes", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toMatch(/Sitemap:/);
  expect(robotsBody).not.toMatch(/portfolio\.tonydemo\.com/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("<urlset");
  expect(sitemapBody).toContain("/products/");
  expect(sitemapBody).toContain("/about/");
  expect(sitemapBody).not.toMatch(/portfolio\.tonydemo\.com/);
});
