import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  isNonProductionSiteUrl,
  validatePublicTruth,
} from "../../src/lib/truth.ts";

test("public truth gate rejects missing production identity", () => {
  const errors = validatePublicTruth({});
  assert.ok(errors.some((e) => e.includes("PUBLIC_SITE_URL")));
  assert.ok(errors.some((e) => e.includes("PUBLIC_CONTACT_EMAIL")));
  assert.ok(errors.some((e) => e.includes("PUBLIC_SECURITY_EMAIL")));
});

test("public truth gate rejects documentation and preview hosts", () => {
  const cases = [
    "https://example.com",
    "https://www.example.org",
    "https://blueskyz-web.thinhnguyen-km10.workers.dev",
    "http://localhost:4321",
  ];
  for (const siteUrl of cases) {
    const errors = validatePublicTruth({
      siteUrl,
      contactEmail: "owner@blueskyz.example",
      securityEmail: "security@blueskyz.example",
    });
    assert.ok(
      errors.some((e) => e.includes("PUBLIC_SITE_URL")),
      `expected rejection for ${siteUrl}`,
    );
  }
});

test("public truth gate rejects placeholder emails", () => {
  const errors = validatePublicTruth({
    siteUrl: "https://blueskyz.labs",
    contactEmail: "@",
    securityEmail: "not-an-email",
  });
  assert.ok(errors.some((e) => e.includes("PUBLIC_CONTACT_EMAIL")));
  assert.ok(errors.some((e) => e.includes("PUBLIC_SECURITY_EMAIL")));
});

test("isNonProductionSiteUrl covers local, workers.dev, and example hosts", () => {
  assert.equal(isNonProductionSiteUrl("http://localhost:4321"), true);
  assert.equal(isNonProductionSiteUrl("https://127.0.0.1"), true);
  assert.equal(isNonProductionSiteUrl("https://[::1]/"), true);
  assert.equal(isNonProductionSiteUrl("https://example.com"), true);
  assert.equal(isNonProductionSiteUrl("https://foo.example"), true);
  assert.equal(
    isNonProductionSiteUrl(
      "https://blueskyz-web.thinhnguyen-km10.workers.dev/",
    ),
    true,
  );
  assert.equal(isNonProductionSiteUrl("https://blueskyz.labs"), false);
});

test("public truth gate rejects IPv6 loopback and .example TLD", () => {
  for (const siteUrl of ["https://[::1]", "https://docs.example"]) {
    const errors = validatePublicTruth({
      siteUrl,
      contactEmail: "owner@blueskyz.labs",
      securityEmail: "security@blueskyz.labs",
    });
    assert.ok(
      errors.some((e) => e.includes("PUBLIC_SITE_URL")),
      `expected rejection for ${siteUrl}`,
    );
  }
});

test("validate-public-truth script exists and does not invent production fallbacks", () => {
  const script = readFileSync("scripts/validate-public-truth.mjs", "utf8");
  assert.match(script, /validatePublicTruth/);
  assert.doesNotMatch(script, /portfolio\.tonydemo\.com/);
  assert.doesNotMatch(script, /hello@blueskyz\.io/);
});
