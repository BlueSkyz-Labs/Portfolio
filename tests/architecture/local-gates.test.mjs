import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("repository installs a versioned pre-commit gate instead of silently missing Husky", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  assert.match(packageJson.scripts.prepare, /core\.hooksPath \.githooks/);
  assert.doesNotMatch(packageJson.scripts.prepare, /husky/);

  const hook = readFileSync(".githooks/pre-commit", "utf8");
  for (const command of [
    "pnpm test:architecture",
    "pnpm typecheck",
    "pnpm lint",
    "pnpm format:check",
    "pnpm build",
  ]) {
    assert.match(hook, new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
