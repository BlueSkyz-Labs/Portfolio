import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Keep declaration packages pinned to the React 19 line validated by Next.js 15.5.24.
test("React 19 runtime and TypeScript declarations stay on the validated Next 15.5 line", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(packageJson.dependencies.react, "19.0.8");
  assert.equal(packageJson.dependencies["react-dom"], "19.0.8");
  assert.equal(packageJson.devDependencies["@types/react"], "19.0.8");
  assert.equal(packageJson.devDependencies["@types/react-dom"], "19.0.3");

  const lockfile = readFileSync("pnpm-lock.yaml", "utf8");
  assert.match(lockfile, /'@types\/react':\n\s+specifier: 19\.0\.8\n\s+version: 19\.0\.8/);
  assert.match(
    lockfile,
    /'@types\/react-dom':\n\s+specifier: 19\.0\.3\n\s+version: 19\.0\.3\(@types\/react@19\.0\.8\)/,
  );
});
