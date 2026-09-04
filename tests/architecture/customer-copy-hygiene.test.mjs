import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

function readPages() {
  const dir = "src/pages";
  const files = readdirSync(dir, { recursive: true })
    .map(String)
    .filter((name) => name.endsWith(".astro"));
  return files.map((name) => readFileSync(join(dir, name), "utf8")).join("\n");
}

test("customer-facing pages ban internal path and env jargon", () => {
  const pages = readPages();
  const featured = readFileSync(
    "src/components/sections/FeaturedProducts.astro",
    "utf8",
  );
  const corpus = `${pages}\n${featured}`;
  assert.doesNotMatch(corpus, /docs\/evidence/);
  assert.doesNotMatch(corpus, /PUBLIC_CONTACT_EMAIL/);
  assert.doesNotMatch(corpus, /PUBLIC_SECURITY_EMAIL/);
  assert.doesNotMatch(corpus, /PUBLIC_SITE_URL/);
});

test("muted text token meets WCAG AA on Porcelain", () => {
  const css = readFileSync("src/styles/global.css", "utf8");
  const match = css.match(/--text-muted:\s*(#[0-9a-fA-F]{6})/);
  assert.ok(match, "muted token hex required");
  const hex = match[1].toLowerCase();
  assert.notEqual(hex, "#64748b");

  const toRgb = (value) => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = ([r, g, b]) =>
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  const ratio = (fg, bg) => {
    const L1 = luminance(toRgb(fg));
    const L2 = luminance(toRgb(bg));
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  };
  assert.ok(
    ratio(hex, "#f7f8fa") >= 4.5,
    `muted ${hex} on Porcelain must be ≥4.5:1`,
  );
});

test("JSON-LD serialization escapes script breakouts", () => {
  const seo = readFileSync("src/lib/seo.ts", "utf8");
  const layout = readFileSync("src/layouts/BaseLayout.astro", "utf8");
  assert.match(seo, /safeJsonLd/);
  assert.match(seo, /\\\\u003c/);
  assert.match(layout, /safeJsonLd\(/);
  assert.doesNotMatch(layout, /set:html=\{JSON\.stringify/);
});

test("product status chrome avoids universal pills and all-caps", () => {
  const status = readFileSync(
    "src/components/product/ProductStatus.astro",
    "utf8",
  );
  assert.doesNotMatch(status, /rounded-full/);
  assert.doesNotMatch(status, /\buppercase\b/);
  assert.match(status, /radius-card|rounded-\[/);
});

test("support empty state offers corporate email fallback wiring", () => {
  const support = readFileSync("src/pages/support.astro", "utf8");
  assert.match(support, /SITE\.contactEmail/);
  assert.match(support, /href="\/contact\/"/);
  assert.match(support, /href="\/security\/"/);
});

test("privacy page summarizes practical trust answers", () => {
  const privacy = readFileSync("src/pages/privacy.astro", "utf8");
  assert.match(privacy, /What is collected/i);
  assert.match(privacy, /Why/i);
  assert.match(privacy, /How it is used/i);
  assert.match(privacy, /Deletion/i);
  assert.doesNotMatch(privacy, /tracking cookies are required/i);
});
