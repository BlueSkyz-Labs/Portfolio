import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const SO_TRO_ROOT = fileURLToPath(
  new URL("../../src/app/so-tro/", import.meta.url),
);
const HOME_LAYOUT = fileURLToPath(
  new URL("../../src/app/(studio)/layout.tsx", import.meta.url),
);
const SO_TRO_LAYOUT = fileURLToPath(
  new URL("../../src/app/so-tro/layout.tsx", import.meta.url),
);
const HOME_TOKENS = fileURLToPath(
  new URL("../../src/app/globals.css", import.meta.url),
);

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      files.push(...walk(path));
      continue;
    }
    if (/\.(ts|tsx|js|mjs|css)$/.test(extname(path))) {
      files.push(path);
    }
  }
  return files;
}

test(" /so-tro uses the live Experience bar, not atelier gold or the superseded canvas", () => {
  const source = walk(SO_TRO_ROOT)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert.match(source, /index-8nE8pp8F\.css/);
  assert.match(source, /#f6f6f3/);
  assert.match(source, /#a67c2e/);
  assert.match(source, /#0f4c5c/);
  assert.match(source, /#0f172a/);
  assert.match(source, /Be_Vietnam_Pro|Be Vietnam Pro/);
  assert.match(source, /--ui-radius-control:\s*18px/);
  assert.match(source, /--ui-radius-card:\s*24px/);
  assert.match(source, /<html[\s\S]*lang=["']vi-VN["']/);
  assert.match(source, /--text-4xl:\s*2\.5rem/);
  assert.match(source, /--text-base:\s*1\.25rem/);

  assert.doesNotMatch(source, /#f7f5f0/i);
  assert.doesNotMatch(source, /#b08d3c/i);
  assert.doesNotMatch(source, /#C9A962/i);
  assert.doesNotMatch(source, /Cormorant/);
  assert.doesNotMatch(source, /DM_Sans|DM Sans/);
  assert.doesNotMatch(source, /\bInter\b/);
  assert.doesNotMatch(source, /system-ui,\s*-apple-system/);
});

test("/so-tro owns its document shell and does not mount atelier Header/Footer", () => {
  const layout = readFileSync(SO_TRO_LAYOUT, "utf8");
  assert.match(layout, /<html[\s\S]*lang=["']vi-VN["']/);
  assert.doesNotMatch(layout, /@\/components\/layout\/Header/);
  assert.doesNotMatch(layout, /@\/components\/layout\/Footer/);
  assert.doesNotMatch(layout, /Begin a project/);
  assert.doesNotMatch(layout, /NAV_LINKS/);
  assert.doesNotMatch(layout, /bg-ink-void/);
});

test("home atelier plane B gold and serif stay on the root chrome", () => {
  const layout = readFileSync(HOME_LAYOUT, "utf8");
  const tokens = readFileSync(HOME_TOKENS, "utf8");
  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /DM_Sans/);
  assert.match(tokens, /#C9A962|#c9a962/);
  assert.match(tokens, /#0A0A0A|#0a0a0a/);
});
