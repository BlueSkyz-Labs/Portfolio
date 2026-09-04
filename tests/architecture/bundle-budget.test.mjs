import assert from "node:assert/strict";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync } from "node:zlib";
import test from "node:test";
import {
  CLIENT_JS_HARD_BUDGET_BYTES,
  measureClientJsBudget,
} from "../../scripts/check-client-budget.mjs";

test("client budget sums Brotli bytes of local scripts referenced by dist/index.html", () => {
  const distDir = join(".tmp", "client-budget-fixture");
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(join(distDir, "assets"), { recursive: true });

  const jsBody = "console.log('budget-fixture');";
  writeFileSync(join(distDir, "assets", "tiny.js"), jsBody);
  writeFileSync(
    join(distDir, "index.html"),
    `<!doctype html><html><head><script src="/assets/tiny.js"></script></head><body></body></html>\n`,
  );

  const result = measureClientJsBudget(distDir);
  const expected = brotliCompressSync(Buffer.from(jsBody)).byteLength;

  assert.equal(result.totalBrotliBytes, expected);
  assert.equal(result.budgetBytes, CLIENT_JS_HARD_BUDGET_BYTES);
  assert.equal(result.withinBudget, true);
  assert.ok(result.totalBrotliBytes < 120_000);

  rmSync(distDir, { recursive: true, force: true });
});

test("package exposes check:client-budget and retires Next build-log regression script", async () => {
  const { readFileSync, existsSync } = await import("node:fs");
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assert.match(
    packageJson.scripts["check:client-budget"],
    /check-client-budget/,
  );
  assert.equal(existsSync("scripts/check-bundle-regression.mjs"), false);
});
