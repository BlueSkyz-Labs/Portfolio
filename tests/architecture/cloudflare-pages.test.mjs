import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Cloudflare Pages deploy contract uses a real Next static export", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");
  const wranglerConfig = readFileSync("wrangler.toml", "utf8");
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.doesNotMatch(
    nextConfig,
    /async\s+headers\s*\(/,
    "runtime Next headers are unsupported by a static export; use public/_headers",
  );
  assert.match(wranglerConfig, /name\s*=\s*["']blueskyz-labs-portfolio["']/);
  assert.match(wranglerConfig, /pages_build_output_dir\s*=\s*["']\.\/out["']/);
  assert.match(packageJson.scripts.build, /verify-static-export\.mjs/);
  assert.match(packageJson.scripts.start, /serve-static\.mjs/);

  const headers = readFileSync("public/_headers", "utf8");
  for (const requiredHeader of [
    "X-Content-Type-Options: nosniff",
    "X-Frame-Options: DENY",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Permissions-Policy: camera=(), microphone=(), geolocation=()",
  ]) {
    assert.match(
      headers,
      new RegExp(requiredHeader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});
