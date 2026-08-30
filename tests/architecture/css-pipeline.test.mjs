import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const candidates = [
  "postcss.config.js",
  "postcss.config.cjs",
  "postcss.config.mjs",
];

function major(version) {
  const match = String(version).match(/(\d+)/);
  assert.ok(match, `Expected a semantic version, received ${version}`);
  return Number(match[1]);
}

test("PostCSS pipeline uses the Tailwind CSS v4 contract", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const devDependencies = pkg.devDependencies ?? {};

  assert.equal(
    major(devDependencies.tailwindcss),
    4,
    "SPEC.md §6.1 requires Tailwind CSS v4",
  );
  assert.equal(
    major(devDependencies["@tailwindcss/postcss"]),
    4,
    "Tailwind v4 PostCSS integration must use @tailwindcss/postcss v4",
  );
  assert.equal(
    devDependencies.autoprefixer,
    undefined,
    "Tailwind v4 handles vendor prefixing; direct autoprefixer must be removed",
  );

  const configPath = candidates.find((candidate) => existsSync(candidate));
  assert.ok(configPath, "A PostCSS config must exist for Tailwind v4");

  const config = readFileSync(configPath, "utf8");
  assert.match(
    config,
    /["']@tailwindcss\/postcss["']\s*:/,
    "PostCSS config must enable @tailwindcss/postcss",
  );
  assert.doesNotMatch(
    config,
    /^\s*tailwindcss\s*:/m,
    "The v3 tailwindcss PostCSS plugin must not remain configured",
  );
  assert.doesNotMatch(
    config,
    /\bautoprefixer\b/,
    "Autoprefixer must not remain configured in the v4 PostCSS pipeline",
  );

  const globals = readFileSync("src/app/globals.css", "utf8");
  assert.match(
    globals,
    /@config\s+["']\.\.\/\.\.\/tailwind\.config\.ts["'];/,
    "The existing design-token config must be loaded explicitly via @config",
  );
  assert.match(
    globals,
    /@import\s+["']tailwindcss["'];/,
    "Tailwind v4 must be imported with a standard CSS @import",
  );
  assert.doesNotMatch(
    globals,
    /@tailwind\s+(base|components|utilities);/,
    "Tailwind v3 @tailwind directives must not remain",
  );
});
