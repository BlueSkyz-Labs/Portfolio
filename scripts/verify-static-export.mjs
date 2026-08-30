import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";

for (const requiredFile of ["out/index.html", "out/404.html", "out/_headers"]) {
  assert.ok(
    existsSync(requiredFile),
    `Missing static export artifact: ${requiredFile}`,
  );
}

const staticRoot = "out/_next/static";
assert.ok(
  existsSync(staticRoot),
  `Missing Next static asset directory: ${staticRoot}`,
);
assert.ok(
  readdirSync(staticRoot).length > 0,
  "Next static asset directory is empty",
);

console.log("Verified Cloudflare Pages static export in out/");
