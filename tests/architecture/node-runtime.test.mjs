import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const EXPECTED_NODE = "24.20.0";
const EXPECTED_PNPM = "9.15.9";

test("repository, CI, docs, and Cloudflare build pin the supported Node LTS runtime", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const workflow = readFileSync(".github/workflows/qa.yml", "utf8");
  const readme = readFileSync("README.md", "utf8");
  const qaStrategy = readFileSync("docs/QA_STRATEGY.md", "utf8");
  const nodeVersion = readFileSync(".node-version", "utf8").trim();

  assert.equal(pkg.engines.node, `>=${EXPECTED_NODE}`);
  assert.equal(nodeVersion, EXPECTED_NODE);
  assert.match(workflow, /NODE_VERSION: "24\.20\.0"/);
  assert.match(readme, /Node\.js ≥ 24\.20\.0/);
  assert.match(qaStrategy, /Node 24\.20\.0/);
  assert.doesNotMatch(workflow, /NODE_VERSION: "20"/);
  assert.doesNotMatch(readme, /Node\.js ≥ 20/);
});

test("repository metadata pins the same pnpm release used by CI", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const workflow = readFileSync(".github/workflows/qa.yml", "utf8");

  assert.equal(pkg.packageManager, `pnpm@${EXPECTED_PNPM}`);
  assert.match(
    workflow,
    new RegExp(`PNPM_VERSION: "${EXPECTED_PNPM.replaceAll(".", "\\.")}"`),
  );
});

test("package declares explicit ESM semantics for Node-loaded TypeScript configuration", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(pkg.type, "module");
});
