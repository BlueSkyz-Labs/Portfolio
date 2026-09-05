import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
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
  assert.match(source, /symbol_mono_ink\.svg/);
  assert.match(source, /micro_mark_ink\.svg/);
  assert.match(source, /require_r4d_symbol/);
  assert.match(source, /rsvg-convert/);
  assert.match(source, /rasterize_svg/);
  assert.doesNotMatch(source, /rounded_rectangle/);
});

test("committed OG assets exist for masterbrand social previews", () => {
  assert.equal(existsSync("public/social/og-default.png"), true);
  assert.equal(existsSync("public/og-image.png"), false);
});

test("OG image contains opaque ink pixels from the R4d symbol", () => {
  const out = execFileSync(
    "python3",
    [
      "-c",
      [
        "from PIL import Image",
        "im=Image.open('public/social/og-default.png').convert('RGBA')",
        "assert im.size==(1200,630)",
        "dark=sum(1 for p in im.getdata() if p[3]>200 and p[0]<40 and p[1]<40 and p[2]<50)",
        "print(dark)",
      ].join(";"),
    ],
    { encoding: "utf8" },
  ).trim();
  const dark = Number(out);
  assert.ok(dark > 2000, `expected R4d ink cluster, found ${dark} dark pixels`);
});

test("favicon is not the prior rounded-rect placeholder", () => {
  assert.equal(existsSync("public/favicon.ico"), true);
  const bytes = readFileSync("public/favicon.ico");
  assert.ok(bytes.byteLength > 400, "favicon should carry mark detail");
  const digest = createHash("sha256").update(bytes).digest("hex");
  // Prior geometric placeholder digest prefix (live pre-fix).
  assert.notEqual(digest.slice(0, 16), "fde16ee9101c2288");
});
