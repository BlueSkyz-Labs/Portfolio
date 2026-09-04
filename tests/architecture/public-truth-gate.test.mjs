import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validatePublicTruth } from "../../src/lib/truth.ts";

test("public truth gate rejects missing production identity", () => {
  const errors = validatePublicTruth({});
  assert.ok(errors.some((e) => e.includes("PUBLIC_SITE_URL")));
  assert.ok(errors.some((e) => e.includes("PUBLIC_CONTACT_EMAIL")));
  assert.ok(errors.some((e) => e.includes("PUBLIC_SECURITY_EMAIL")));
});

test("validate-public-truth script exists and does not invent production fallbacks", () => {
  const script = readFileSync("scripts/validate-public-truth.mjs", "utf8");
  assert.match(script, /validatePublicTruth/);
  assert.doesNotMatch(script, /portfolio\.tonydemo\.com/);
  assert.doesNotMatch(script, /hello@blueskyz\.io/);
});
