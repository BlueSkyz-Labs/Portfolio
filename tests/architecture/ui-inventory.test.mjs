import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const BANNED_PHRASES = [
  "Quiet luxury",
  "digital atelier",
  "Savile Row",
  "#C9A962",
  "Cormorant_Garamond",
  "CustomCursor",
  "MotionProvider",
  "framer-motion",
];

test("runtime inventory has no Next/atelier residual dependencies or phrases", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  assert.equal("next" in allDeps, false);
  assert.equal("framer-motion" in allDeps, false);
  assert.equal("react" in allDeps, false);
  assert.equal("react-dom" in allDeps, false);
  assert.equal(existsSync("src/app"), false);
  assert.equal(existsSync("src/lib/motion-features.ts"), false);

  const sources = [
    "src/layouts/BaseLayout.astro",
    "src/styles/global.css",
    "src/data/site.ts",
    "README.md",
  ];
  for (const path of sources) {
    const text = readFileSync(path, "utf8");
    for (const phrase of BANNED_PHRASES) {
      assert.doesNotMatch(
        text,
        new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
        `${path} must not contain ${phrase}`,
      );
    }
  }
});
