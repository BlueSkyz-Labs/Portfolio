import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(".github/workflows/qa.yml", "utf8");
const PNPM_ACTION_SHA = "0977fd99725f1db4007ccb2928dbb4e90d06cc86";

function countUses(action) {
  return [
    ...workflow.matchAll(
      new RegExp(`uses: ${action.replace("/", "\\/")}@(v\\d+)`, "g"),
    ),
  ];
}

test("GitHub Actions JavaScript actions use Node 24-native first-party majors", () => {
  const expected = new Map([
    ["actions/checkout", "v7"],
    ["actions/setup-node", "v7"],
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

test("third-party pnpm action is pinned to the reviewed immutable commit", () => {
  const uses = [
    ...workflow.matchAll(/uses: pnpm\/action-setup@([^\s#]+)/g),
  ].map((match) => match[1]);

  assert.ok(uses.length > 0, "pnpm/action-setup must remain present in qa.yml");
  assert.ok(
    uses.every((ref) => ref === PNPM_ACTION_SHA),
    `pnpm/action-setup must be pinned to ${PNPM_ACTION_SHA}`,
  );
  assert.doesNotMatch(workflow, /uses: pnpm\/action-setup@v\d+/);
});

test("workflow GITHUB_TOKEN is least privilege by default", () => {
  assert.match(
    workflow,
    /\npermissions:\n  contents: read\n\n(?:#.*\n)*concurrency:/,
  );
  assert.doesNotMatch(workflow, /permissions:\s*write-all/);
});

test("action runtime modernization does not silently change the app Node test version", () => {
  assert.match(workflow, /NODE_VERSION: "20"/);
});
