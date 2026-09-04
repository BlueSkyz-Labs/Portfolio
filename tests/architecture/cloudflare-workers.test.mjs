import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const wrangler = readFileSync("wrangler.toml", "utf8");

test("Workers serves the Astro static build", () => {
  assert.match(wrangler, /\[assets\]/);
  assert.match(wrangler, /directory\s*=\s*["']\.\/dist["']/);
  assert.match(wrangler, /not_found_handling\s*=\s*["']404-page["']/);
  assert.match(wrangler, /html_handling\s*=\s*["']auto-trailing-slash["']/);
  assert.doesNotMatch(wrangler, /pages_build_output_dir/);
  assert.equal(existsSync(".github/workflows/qa.yml"), false);
});
