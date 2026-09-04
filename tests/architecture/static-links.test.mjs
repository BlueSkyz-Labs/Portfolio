import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("static link checker script exists and is wired", () => {
  assert.equal(existsSync("scripts/check-static-links.mjs"), true);
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(
    pkg.scripts["check:static-links"],
    "node scripts/check-static-links.mjs",
  );
  const hook = readFileSync(".githooks/pre-commit", "utf8");
  assert.match(hook, /check:static-links/);
});
