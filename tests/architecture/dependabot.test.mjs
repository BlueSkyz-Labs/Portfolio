import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const configPath = ".github/dependabot.yml";

test("Dependabot keeps GitHub Actions and pnpm dependencies current with bounded PR noise", () => {
  const config = readFileSync(configPath, "utf8");

  assert.match(config, /^version: 2$/m);
  assert.match(config, /package-ecosystem: "github-actions"/);
  assert.match(config, /package-ecosystem: "npm"/);
  assert.equal((config.match(/directory: "\/"/g) ?? []).length, 2);
  assert.equal((config.match(/interval: "weekly"/g) ?? []).length, 2);
  assert.equal((config.match(/open-pull-requests-limit: 3/g) ?? []).length, 2);
  assert.match(config, /production-dependencies:/);
  assert.match(config, /dependency-type: "production"/);
  assert.match(config, /development-dependencies:/);
  assert.match(config, /dependency-type: "development"/);
});
