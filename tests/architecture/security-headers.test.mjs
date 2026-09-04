import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("static responses carry a safe baseline header set", () => {
  const headers = readFileSync("public/_headers", "utf8");
  assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
  assert.match(headers, /X-Frame-Options:\s*DENY/);
  assert.match(headers, /Referrer-Policy:\s*strict-origin-when-cross-origin/);
  assert.match(headers, /Permissions-Policy:/);
  assert.match(headers, /payment=\(\)/);
  assert.match(
    headers,
    /Strict-Transport-Security:\s*max-age=31536000;\s*includeSubDomains;\s*preload/,
  );
  assert.match(
    headers,
    /Content-Security-Policy:\s*default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none';/,
  );
  assert.match(headers, /script-src 'self'/);
  assert.match(headers, /style-src 'self' 'unsafe-inline'/);
  assert.match(headers, /X-Robots-Tag:\s*noindex/);
  assert.doesNotMatch(headers, /'unsafe-eval'/);
  const cspLine =
    headers
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.startsWith("Content-Security-Policy:")) ?? "";
  assert.doesNotMatch(cspLine, /(?:^|[\s;])\*(?:[\s;]|$)/);
});
