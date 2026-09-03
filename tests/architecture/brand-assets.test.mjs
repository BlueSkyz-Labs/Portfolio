import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

test("committed brand assets are non-trivial Quiet Luxury surfaces", () => {
  const og = statSync("public/og-image.png");
  const favicon = statSync("public/favicon.ico");

  assert.ok(
    og.size > 10_000,
    `og-image.png must be a real 1200x630 asset, got ${og.size} bytes`,
  );
  assert.ok(
    favicon.size > 500,
    `favicon.ico must be a multi-size ICO, got ${favicon.size} bytes`,
  );

  // PNG signature
  const ogBytes = readFileSync("public/og-image.png");
  assert.deepEqual(
    [...ogBytes.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  );

  // ICO signature (reserved 0, type 1)
  const icoBytes = readFileSync("public/favicon.ico");
  assert.equal(icoBytes[0], 0);
  assert.equal(icoBytes[1], 0);
  assert.equal(icoBytes[2], 1);
  assert.equal(icoBytes[3], 0);
});

test("root layout mounts the SPEC §4.5 custom cursor boundary", () => {
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /CustomCursor/);
  assert.match(
    readFileSync("src/components/ui/CustomCursor.tsx", "utf8"),
    /prefers-reduced-motion/,
  );
});
