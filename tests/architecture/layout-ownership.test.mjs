import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [layoutSource, pageSource] = await Promise.all([
  readFile(
    new URL("../../src/app/(studio)/layout.tsx", import.meta.url),
    "utf8",
  ),
  readFile(new URL("../../src/app/(studio)/page.tsx", import.meta.url), "utf8"),
]);

test("root layout owns the global Header, main, and Footer landmarks", () => {
  assert.match(layoutSource, /<Header\s*\/>/);
  assert.match(layoutSource, /<main\s+id=["']main["']/);
  assert.match(layoutSource, /<Footer\s*\/>/);
});

test("home page does not duplicate root layout landmarks", () => {
  assert.doesNotMatch(pageSource, /components\/layout\/(Header|Footer)/);
  assert.doesNotMatch(pageSource, /<Header\s*\/>/);
  assert.doesNotMatch(pageSource, /<main\b/);
  assert.doesNotMatch(pageSource, /<Footer\s*\/>/);
});
