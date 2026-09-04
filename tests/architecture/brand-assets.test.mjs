import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("brand asset generator projects C1.1 primitives only", () => {
  const path = "scripts/generate-brand-assets.py";
  assert.equal(existsSync(path), true);
  const source = readFileSync(path, "utf8");
  assert.match(source, /Porcelain|PORCELAIN/);
  assert.match(source, /Cobalt|COBALT/);
  assert.match(source, /#0[Bb]1020|INK\s*=\s*\(11,\s*16,\s*32/);
  assert.doesNotMatch(
    source,
    /Quiet Luxury|champagne|Cormorant|#C9A962|GOLD\s*=/i,
  );
  assert.match(source, /Does not invent R4d geometry/);
});

test("committed OG assets exist for masterbrand social previews", () => {
  assert.equal(existsSync("public/social/og-default.png"), true);
  assert.equal(existsSync("public/og-image.png"), false);
});
