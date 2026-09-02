import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const SRC_ROOT = fileURLToPath(new URL("../../src/", import.meta.url));

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

const srcFiles = walk(SRC_ROOT);

function filesMatching(pattern) {
  return srcFiles
    .filter((path) => pattern.test(readFileSync(path, "utf8")))
    .map((path) => relative(SRC_ROOT, path));
}

test("public src does not ship known-dead socials, mail, or a foreign blueskyz.com", () => {
  assert.deepEqual(filesMatching(/x\.com\/blueskyz/i), []);
  assert.deepEqual(filesMatching(/linkedin\.com\/company\/blueskyz-labs/i), []);
  assert.deepEqual(filesMatching(/hello@blueskyz\.io/i), []);
  assert.deepEqual(filesMatching(/mailto:/i), []);
  assert.deepEqual(filesMatching(/https?:\/\/(?:www\.)?blueskyz\.com/i), []);
});

test("public src does not point canonical site copy at the NXDOMAIN tonydemo host", () => {
  assert.deepEqual(filesMatching(/portfolio\.tonydemo\.com/i), []);
});

test("Sổ Trọ page exists with patched hypothesis hero, not the Excel/gõ-cửa lock", () => {
  const page = srcFiles.find((path) => path.endsWith("/so-tro/page.tsx"));
  assert.ok(page, "src/app/so-tro/page.tsx must exist");

  const related = srcFiles.filter((path) => path.includes("so-tro"));
  const source = related.map((path) => readFileSync(path, "utf8")).join("\n");

  assert.match(source, /Phần mềm quản lý nhà trọ/);
  assert.match(source, /Chốt tiền điện từng phòng/);
  assert.match(source, /Tách phí cho rõ/);
  assert.match(source, /Không làm căng mất khách/);
  assert.match(source, /Excel và Zalo đang là mặc định/);
  assert.doesNotMatch(source, /Hết tối mùng 1 cầm file Excel đi từng phòng/);
  assert.doesNotMatch(source, /Sổ cho người giữ dãy/);
});

test("public src does not invent schema, hreflang, cobalt, or GTM-forbidden channels", () => {
  assert.deepEqual(filesMatching(/AggregateRating/i), []);
  assert.deepEqual(filesMatching(/"@type"\s*:\s*"Review"/i), []);
  assert.deepEqual(filesMatching(/hreflang/i), []);
  assert.deepEqual(filesMatching(/alternates\s*:\s*\{[\s\S]*languages/i), []);
  assert.deepEqual(filesMatching(/zalo\.me/i), []);
  assert.deepEqual(filesMatching(/VietQR/i), []);
  assert.deepEqual(filesMatching(/NĐ\s*141|Nghị định\s*141/i), []);
  assert.deepEqual(filesMatching(/cobalt/i), []);
});

test("Sổ Trọ stays a single indexable page with no unique-attribute or doorway routes", () => {
  const pages = srcFiles
    .filter((path) => path.endsWith("/page.tsx"))
    .map((path) => relative(SRC_ROOT, path))
    .sort();
  assert.deepEqual(pages, ["app/page.tsx", "app/so-tro/page.tsx"]);

  const related = srcFiles.filter((path) => path.includes("so-tro"));
  const source = related.map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(
    source,
    /unique attributes|điểm độc|tính năng độc quyền/i,
  );
  assert.doesNotMatch(source, /index:\s*false|noindex/i);
});
