import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("Astro static foundation replaces the Next runtime", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const astro = readFileSync("astro.config.mjs", "utf8");
  const ts = readFileSync("tsconfig.json", "utf8");

  assert.match(pkg.dependencies.astro, /^\^?7\./);
  assert.equal(pkg.dependencies.next, undefined);
  assert.equal(pkg.dependencies["framer-motion"], undefined);
  assert.match(pkg.devDependencies["@tailwindcss/vite"], /./);
  assert.match(astro, /@tailwindcss\/vite/);
  assert.match(astro, /output:\s*["']static["']/);
  assert.match(ts, /astro\/tsconfigs\/strict/);
  assert.ok(existsSync("src/pages/index.astro"));
  assert.ok(existsSync("src/styles/global.css"));
  assert.equal(existsSync("next.config.ts"), false);
  assert.equal(existsSync("postcss.config.mjs"), false);
  assert.equal(existsSync("tailwind.config.ts"), false);
});
