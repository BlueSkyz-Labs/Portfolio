import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("TypeScript 6 validates side-effect CSS imports without disabling the compiler guard", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(packageJson.devDependencies.typescript, "^6.0.3");

  const tsconfig = JSON.parse(readFileSync("tsconfig.json", "utf8"));
  assert.notEqual(
    tsconfig.compilerOptions.noUncheckedSideEffectImports,
    false,
    "Do not disable TypeScript 6 side-effect import validation",
  );

  const declarationPath = "src/types/assets.d.ts";
  assert.ok(
    existsSync(declarationPath),
    `${declarationPath} must declare intentionally supported side-effect asset imports`,
  );

  const declarations = readFileSync(declarationPath, "utf8");
  assert.match(declarations, /declare module ["']\*\.css["']\s*\{\s*\}/);

  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /import\s+["']\.\/globals\.css["'];?/);
});
