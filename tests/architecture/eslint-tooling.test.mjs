import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("lint tooling uses explicit ESLint CLI with a versioned flat-config bridge", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(packageJson.scripts.lint, "eslint .");
  assert.equal(packageJson.scripts["lint:fix"], "eslint . --fix");
  assert.ok(
    packageJson.devDependencies["@eslint/eslintrc"],
    "FlatCompat must be declared directly instead of relying on a transitive dependency",
  );

  assert.equal(existsSync("eslint.config.mjs"), true);
  assert.equal(existsSync(".eslintrc.json"), false);

  const config = readFileSync("eslint.config.mjs", "utf8");
  assert.match(config, /FlatCompat/);
  assert.match(config, /next\/core-web-vitals/);
  assert.match(config, /next\/typescript/);
  assert.match(config, /\.next\/\*\*/);
  assert.match(config, /out\/\*\*/);

  const lockfile = readFileSync("pnpm-lock.yaml", "utf8");
  assert.match(lockfile, /'@eslint\/eslintrc':\n\s+specifier: \^3\.3\.6/);
});
