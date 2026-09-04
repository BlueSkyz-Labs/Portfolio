import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync("src/content.config.ts", "utf8");

test("product truth models lifecycle, availability, proof and CTA", () => {
  for (const field of [
    "lifecycle",
    "availability",
    "publicLabel",
    "audience",
    "jobs",
    "capabilities",
    "platforms",
    "primaryAction",
    "proof",
    "featuredTier",
    "sourceRevision",
    "lastReviewedAt",
  ]) {
    assert.match(config, new RegExp(field));
  }
  assert.match(config, /A BlueSkyz Labs product/);
  assert.match(config, /productScreenshot/);
});
