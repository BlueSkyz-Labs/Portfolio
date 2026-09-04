import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const schema = readFileSync("src/lib/product-schema.ts", "utf8");
const config = readFileSync("src/content.config.ts", "utf8");
const flagship = readFileSync(
  "src/components/sections/FlagshipProof.astro",
  "utf8",
);
const profile = readFileSync("src/pages/products/[slug].astro", "utf8");

test("product proof screenshot is a local sized artifact contract", () => {
  assert.match(schema, /screenshot:\s*productScreenshot/);
  assert.match(schema, /src:\s*z[\s.]*string\(/);
  assert.match(schema, /alt:\s*z\.string/);
  assert.match(schema, /width:\s*z\.number/);
  assert.match(schema, /height:\s*z\.number/);
  assert.match(schema, /\/products\//);
  assert.doesNotMatch(schema, /screenshot:\s*z\.string\(\)\.optional\(\)/);
});

test("product action and proof URLs require https schemes", () => {
  assert.match(schema, /httpsUrl/);
  assert.match(schema, /isHttpsUrl|isPublicClaimHttpsUrl/);
  assert.match(schema, /href:\s*httpsUrl/);
  assert.match(schema, /publicUrl:\s*httpsUrl/);
  assert.match(schema, /repositoryUrl:\s*httpsUrl/);
  assert.match(config, /from ["']@\/lib\/product-schema["']/);
});

test("public product truth rejects incoherent maturity claims", () => {
  assert.match(schema, /PUBLIC_LABEL_COHERENCE/);
  assert.match(schema, /public product cannot have private availability/);
  assert.match(schema, /publicLabel .* is incoherent with lifecycle/);
  assert.match(schema, /if\s*\(\s*!value\.public\s*\)\s*return/);
});

test("public products require verified capabilities distinct from jobs", () => {
  assert.match(schema, /capabilities/);
  assert.match(schema, /jobs/);
  assert.match(schema, /capabilities\.length/);
});

test("FlagshipProof renders capabilities and intrinsic screenshot sizing", () => {
  assert.match(flagship, /capabilities\.slice\(0,\s*3\)/);
  assert.doesNotMatch(flagship, /data\.jobs\.slice/);
  assert.match(flagship, /screenshot\.src/);
  assert.match(flagship, /screenshot\.alt/);
  assert.match(flagship, /screenshot\.width/);
  assert.match(flagship, /screenshot\.height/);
});

test("product profile exposes public status without internal enums", () => {
  assert.match(profile, /data\.publicLabel/);
  assert.doesNotMatch(profile, /data\.lifecycle/);
  assert.doesNotMatch(profile, /data\.availability/);
  assert.match(profile, /Main capabilities|capabilities/);
  assert.match(profile, /screenshot\.src/);
  assert.match(profile, /width=\{screenshot\.width\}/);
  assert.match(profile, /height=\{screenshot\.height\}/);
  assert.match(profile, /ogImage=\{data\.proof\.screenshot\?\.src\}/);
});
