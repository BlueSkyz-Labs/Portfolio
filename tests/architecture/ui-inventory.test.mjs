import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("v1 UI inventory ships Button variants and Dialog without NavigationMenu dep", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(
    packageJson.dependencies["@radix-ui/react-navigation-menu"],
    undefined,
    "unused NavigationMenu package must stay removed (ADR 0003)",
  );
  assert.ok(packageJson.dependencies["@radix-ui/react-dialog"]);
  assert.ok(packageJson.dependencies["@radix-ui/react-slot"]);
  assert.ok(packageJson.dependencies["class-variance-authority"]);

  assert.ok(existsSync("src/components/ui/Button.tsx"));
  assert.ok(existsSync("src/components/ui/Dialog.tsx"));
  assert.equal(existsSync("src/components/ui/.gitkeep.ts"), false);

  const button = readFileSync("src/components/ui/Button.tsx", "utf8");
  assert.match(button, /variant:\s*\{/);
  assert.match(button, /primary:/);
  assert.match(button, /secondary:/);
  assert.match(button, /ghost:/);
  assert.match(button, /link:/);

  const dialog = readFileSync("src/components/ui/Dialog.tsx", "utf8");
  assert.match(dialog, /bg-transparent/);
  assert.doesNotMatch(dialog, /backdrop-blur/);
});

test("mobile navigation consumes the shared Dialog primitive", () => {
  const mobileNav = readFileSync(
    "src/components/layout/MobileNavDialog.tsx",
    "utf8",
  );
  assert.match(mobileNav, /@\/components\/ui\/Dialog/);
  assert.doesNotMatch(mobileNav, /@radix-ui\/react-dialog/);
  assert.doesNotMatch(mobileNav, /bg-ink-void\/90/);
});
