import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const candidates = [
  "postcss.config.js",
  "postcss.config.cjs",
  "postcss.config.mjs",
];

test("PostCSS pipeline explicitly compiles Tailwind utilities", () => {
  const configPath = candidates.find((candidate) => existsSync(candidate));

  assert.ok(
    configPath,
    "A postcss.config.{js,cjs,mjs} file must exist so @tailwind directives are compiled",
  );

  const config = readFileSync(configPath, "utf8");
  assert.match(config, /tailwindcss/, "PostCSS config must enable tailwindcss");
  assert.match(config, /autoprefixer/, "PostCSS config must enable autoprefixer");

  const globals = readFileSync("src/app/globals.css", "utf8");
  assert.match(globals, /@tailwind\s+base;/);
  assert.match(globals, /@tailwind\s+components;/);
  assert.match(globals, /@tailwind\s+utilities;/);
});
