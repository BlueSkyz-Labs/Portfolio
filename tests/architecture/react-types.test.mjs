import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Keep runtime and declaration packages pinned to the React 19.2 line validated with Next.js 15.5.24.
test("React 19.2 runtime and TypeScript declarations stay on the validated Next 15.5 line", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(packageJson.dependencies.react, "19.2.8");
  assert.equal(packageJson.dependencies["react-dom"], "19.2.8");
  assert.equal(packageJson.devDependencies["@types/react"], "19.2.18");
  assert.equal(packageJson.devDependencies["@types/react-dom"], "19.2.5");

  const lockfile = readFileSync("pnpm-lock.yaml", "utf8");
  assert.match(
    lockfile,
    /'@types\/react':\n\s+specifier: 19\.2\.18\n\s+version: 19\.2\.18/,
  );
  assert.match(
    lockfile,
    /'@types\/react-dom':\n\s+specifier: 19\.2\.5\n\s+version: 19\.2\.5\(@types\/react@19\.2\.18\)/,
  );
});
