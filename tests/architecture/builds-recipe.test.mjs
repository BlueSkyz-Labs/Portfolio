import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const PRODUCTION_BUILDS =
  "pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget && pnpm check:static-links";

test("SoT production Builds recipes include static-links gate", () => {
  const docs = [
    "docs/QA_STRATEGY.md",
    "docs/decisions/0002-cloudflare-first-ci.md",
    "docs/superpowers/plans/2026-09-03-remaining-convergence.md",
    "docs/evidence/2026-09-04-workers-builds-gap.md",
  ];
  for (const path of docs) {
    const text = readFileSync(path, "utf8");
    assert.match(
      text,
      /check:static-links/,
      `${path} must document check:static-links`,
    );
    assert.match(
      text,
      /validate:public-truth/,
      `${path} must document validate:public-truth`,
    );
  }
  assert.match(
    readFileSync("docs/QA_STRATEGY.md", "utf8"),
    new RegExp(PRODUCTION_BUILDS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
});
