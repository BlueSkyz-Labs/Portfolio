import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const m = JSON.parse(
  readFileSync("public/brand/blueskyz/r4d/brand-manifest.json", "utf8"),
);

test("R4d projection preserves candidate provenance", () => {
  assert.equal(m.assetId, "BLUESKYZ-MASTERBRAND-R4D");
  assert.equal(m.assetVersion, "1.1.0");
  assert.equal(m.canonicalName, "BlueSkyz Labs");
  assert.equal(m.status, "IDENTITY_PROTOTYPE_READY");
  assert.equal(m.designState, "DESIGN_FREEZE_CANDIDATE");
  assert.match(m.sourceRevision, /^[0-9a-f]{40}$/);
  assert.equal(m.runtimeFontDependencyForWordmark, "NONE_VECTOR_OUTLINES");
});

test("R4d files are the exact sgps-core bytes recorded in the manifest", () => {
  assert.equal(m.sourceRepository, "BlueSkyz-Labs/sgps-core");
  assert.equal(
    m.sourcePath,
    "standards/experience/brand/assets/blueskyz/r4d-v1.1/",
  );
  const files = {
    "symbol_mono_ink.svg": m.fileSha256.symbol_mono_ink,
    "micro_mark_ink.svg": m.fileSha256.micro_mark_ink,
    "brand_tokens.json": m.fileSha256.brand_tokens,
  };
  for (const [name, expected] of Object.entries(files)) {
    const path = `public/brand/blueskyz/r4d/${name}`;
    assert.equal(existsSync(path), true, `${path} must exist`);
    const digest = createHash("sha256")
      .update(readFileSync(path))
      .digest("hex");
    assert.equal(digest, expected, `${name} sha256 mismatch`);
    assert.match(expected, /^[0-9a-f]{64}$/);
  }
});

test("header and footer use exact R4d symbol plus live text", () => {
  const lockup = readFileSync("src/components/brand/BrandLockup.astro", "utf8");
  assert.match(lockup, /\/brand\/blueskyz\/r4d\/symbol_mono_ink\.svg/);
  assert.match(lockup, /SITE\.name/);
  assert.doesNotMatch(lockup, /wordmark.*\.svg/i);
  for (const path of [
    "src/components/layout/Header.astro",
    "src/components/layout/Footer.astro",
  ]) {
    assert.match(
      readFileSync(path, "utf8"),
      /BrandLockup/,
      `${path} must render BrandLockup`,
    );
  }
});
