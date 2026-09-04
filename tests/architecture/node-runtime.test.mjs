import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const EXPECTED_NODE = "24.20.0";
const EXPECTED_PNPM_MAJOR = "11";

test("repository pins the supported Node LTS runtime for Astro builds", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const readme = readFileSync("README.md", "utf8");
  const nodeVersion = readFileSync(".node-version", "utf8").trim();

  assert.equal(pkg.engines.node, `>=${EXPECTED_NODE}`);
  assert.equal(nodeVersion, EXPECTED_NODE);
  assert.match(readme, /Node\.js 24\.20\.0/);
  assert.doesNotMatch(readme, /Node\.js ≥ 20/);
});

test("repository metadata pins pnpm 11 for the Astro toolchain", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.match(
    pkg.packageManager,
    new RegExp(`^pnpm@${EXPECTED_PNPM_MAJOR}\\.`),
  );
  assert.match(pkg.engines.pnpm, new RegExp(`>=${EXPECTED_PNPM_MAJOR}\\.`));
});

test("package declares explicit ESM semantics", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(pkg.type, "module");
});
