import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const ADVISORY =
  "https://github.com/BlueSkyz-Labs/SGPS-Marketing/security/advisories/new";

test("security surface exposes actionable private reporting CTA", () => {
  const site = readFileSync("src/data/site.ts", "utf8");
  assert.match(site, /SECURITY_ADVISORY_URL/);
  assert.match(site, /security\/advisories\/new/);

  const page = readFileSync("src/pages/security.astro", "utf8");
  assert.match(page, /SECURITY_ADVISORY_URL/);
  assert.match(page, /Open private vulnerability reporting/);
  assert.doesNotMatch(page, /bank-grade|military-grade/i);
});

test("contact security lane deep-links advisory when email unset", () => {
  const contact = readFileSync("src/pages/contact.astro", "utf8");
  assert.match(contact, /SECURITY_ADVISORY_URL/);
  assert.match(contact, /Open private vulnerability reporting/);
});

test("flagship proof section is evidence-gated and optional", () => {
  assert.equal(existsSync("src/components/sections/FlagshipProof.astro"), true);
  const proof = readFileSync(
    "src/components/sections/FlagshipProof.astro",
    "utf8",
  );
  assert.match(proof, /proof\.screenshot/);
  assert.match(proof, /data-flagship-proof/);
  const home = readFileSync("src/pages/index.astro", "utf8");
  assert.match(home, /getFlagshipProduct/);
  assert.match(home, /FlagshipProof/);
});

test("about page publishes approved founder title without invented biography", () => {
  const about = readFileSync("src/pages/about.astro", "utf8");
  assert.match(about, /Tony Nguyen — Founder/);
  assert.doesNotMatch(about, /global offices|bank-grade|military-grade/i);
});

test("SECURITY.md advisory URL matches site constant", () => {
  const policy = readFileSync("SECURITY.md", "utf8");
  assert.match(
    policy,
    new RegExp(ADVISORY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
});
