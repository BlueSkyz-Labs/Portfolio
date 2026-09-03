import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("CSS design tokens follow SPEC Quiet Luxury palette floors", () => {
  const css = readFileSync("src/app/globals.css", "utf8");

  assert.match(css, /--bg-primary:\s*#0a0a0a/i);
  assert.match(css, /--bg-secondary:\s*#1a1a1a/i);
  assert.match(css, /--text-primary:\s*#f5f5f0/i);
  assert.match(css, /--text-muted:\s*#a8a8a0/i);
  assert.match(css, /--accent-gold:\s*#c9a962/i);
  assert.doesNotMatch(css, /--text-muted:\s*#6b6b6b/i);
  assert.doesNotMatch(css, /--bg-secondary:\s*#111111/i);
});
