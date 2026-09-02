import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(".github/workflows/qa.yml", "utf8");

function countUses(action) {
  return [
    ...workflow.matchAll(
      new RegExp(`uses: ${action.replace("/", "\\/")}@(v\\d+)`, "g"),
    ),
  ];
}

test("GitHub Actions JavaScript actions use Node 24-native major releases", () => {
  const expected = new Map([
    ["actions/checkout", "v7"],
    ["actions/setup-node", "v7"],
    ["pnpm/action-setup", "v6"],
    ["actions/upload-artifact", "v7"],
    ["actions/cache", "v6"],
  ]);

  for (const [action, expectedMajor] of expected) {
    const matches = countUses(action);
    assert.ok(matches.length > 0, `${action} must remain present in qa.yml`);
    for (const match of matches) {
      assert.equal(
        match[1],
        expectedMajor,
        `${action} must use ${expectedMajor}`,
      );
    }
  }
});

test("action runtime modernization does not silently change the app Node test version", () => {
  assert.match(workflow, /NODE_VERSION: "20"/);
});
