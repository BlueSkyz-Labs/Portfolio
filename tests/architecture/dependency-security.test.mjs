import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
  assert.ok(match, `Expected a concrete semver version, got: ${version}`);
  return match.slice(1).map(Number);
}

function atLeast(actual, minimum) {
  const left = parseVersion(actual);
  const right = parseVersion(minimum);
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] > right[index];
  }
  return true;
}

test("production framework dependencies stay above known 2026 security floors", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(
    atLeast(packageJson.dependencies.next, "15.5.24"),
    `next ${packageJson.dependencies.next} is below patched 15.x floor 15.5.24`,
  );
  assert.ok(
    atLeast(packageJson.dependencies.react, "19.0.8"),
    `react ${packageJson.dependencies.react} is below patched React 19 floor 19.0.8`,
  );
  assert.ok(
    atLeast(packageJson.dependencies["react-dom"], "19.0.8"),
    `react-dom ${packageJson.dependencies["react-dom"]} is below patched React 19 floor 19.0.8`,
  );
  assert.equal(
    packageJson.devDependencies["eslint-config-next"],
    packageJson.dependencies.next,
    "eslint-config-next must track the exact Next.js version",
  );
});
