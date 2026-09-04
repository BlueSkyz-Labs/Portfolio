import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Playwright browser install is an explicit package script", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.match(pkg.scripts["test:e2e:install"] ?? "", /playwright install/);
  const readme = readFileSync("README.md", "utf8");
  assert.match(readme, /test:e2e:install/);
});
