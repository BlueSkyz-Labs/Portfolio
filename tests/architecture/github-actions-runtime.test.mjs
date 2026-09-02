import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = readFileSync(".github/workflows/qa.yml", "utf8");
const PNPM_ACTION_SHA = "0977fd99725f1db4007ccb2928dbb4e90d06cc86";
const CHECKOUT_ACTION_SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1";
const FIRST_PARTY_ACTIONS = new Map([
  ["actions/checkout", { version: "v7.0.1", sha: CHECKOUT_ACTION_SHA }],
  [
    "actions/setup-node",
    { version: "v7.0.0", sha: "820762786026740c76f36085b0efc47a31fe5020" },
  ],
  [
    "actions/upload-artifact",
    { version: "v7.0.1", sha: "043fb46d1a93c77aae656e7c1c64a875d1fc6a0a" },
  ],
  [
    "actions/cache",
    { version: "v6.1.0", sha: "55cc8345863c7cc4c66a329aec7e433d2d1c52a9" },
  ],
]);

function actionRefs(action) {
  return [
    ...workflow.matchAll(
      new RegExp(`uses: ${action.replace("/", "\\/")}@([^\\s#]+)`, "g"),
    ),
  ].map((match) => match[1]);
}

test("GitHub Actions first-party actions use reviewed immutable Node 24-native releases", () => {
  for (const [action, release] of FIRST_PARTY_ACTIONS) {
    const refs = actionRefs(action);
    assert.ok(refs.length > 0, `${action} must remain present in qa.yml`);
    for (const ref of refs) {
      assert.equal(
        ref,
        release.sha,
        `${action} must pin ${release.version} to ${release.sha}`,
      );
      assert.match(ref, /^[0-9a-f]{40}$/);
    }
  }
});

test("checkout never persists GITHUB_TOKEN credentials into the worktree", () => {
  const checkoutUses = actionRefs("actions/checkout");
  const credentialOptOuts = [
    ...workflow.matchAll(/persist-credentials:\s*false/g),
  ];

  assert.equal(
    checkoutUses.length,
    2,
    "qa.yml must keep exactly two checkout steps",
  );
  assert.equal(
    credentialOptOuts.length,
    checkoutUses.length,
    "every checkout step must set persist-credentials: false",
  );
  assert.doesNotMatch(workflow, /persist-credentials:\s*true/);
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

test("application CI uses the supported Node 24 LTS runtime", () => {
  assert.match(workflow, /NODE_VERSION: "24\.20\.0"/);
});
