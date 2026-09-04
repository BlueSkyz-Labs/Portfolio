import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const path = "docs/decisions/0004-web-framework-selection.md";

test("framework decision is measured and executable", () => {
  const text = readFileSync(path, "utf8");
  assert.match(text, /Decision:\s+(ASTRO_7|NEXT_16_3_STATIC)/);
  for (const label of [
    "Cold build median",
    "Warm build median",
    "Initial compressed JavaScript",
    "Critical asset bytes",
    "Lighthouse performance",
    "Accessibility parity",
    "Cloudflare preview",
    "Migration effort",
  ]) {
    assert.match(text, new RegExp(label));
  }
  assert.doesNotMatch(text, /TBD|TODO|placeholder/i);
});
