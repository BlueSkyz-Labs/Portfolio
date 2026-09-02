import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Cloudflare static responses carry a safe baseline CSP without weakening script policy", () => {
  const headers = readFileSync("public/_headers", "utf8");

  assert.match(
    headers,
    /Content-Security-Policy: base-uri 'self'; object-src 'none'; frame-ancestors 'none'/,
  );
  assert.doesNotMatch(headers, /'unsafe-inline'/);
  assert.doesNotMatch(headers, /'unsafe-eval'/);
});
