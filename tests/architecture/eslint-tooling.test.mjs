import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("lint tooling uses zero-warning ESLint with Astro flat config", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.match(pkg.scripts.lint, /--max-warnings=0/);
  assert.equal(pkg.devDependencies["eslint-config-next"], undefined);
  assert.equal(pkg.devDependencies["@eslint/eslintrc"], undefined);
  assert.ok(pkg.devDependencies["eslint-plugin-astro"]);

  const config = readFileSync("eslint.config.mjs", "utf8");
  assert.match(config, /eslint-plugin-astro/);
  assert.doesNotMatch(config, /FlatCompat/);
  assert.doesNotMatch(config, /next\/core-web-vitals/);
  assert.doesNotMatch(config, /next\/typescript/);
});
