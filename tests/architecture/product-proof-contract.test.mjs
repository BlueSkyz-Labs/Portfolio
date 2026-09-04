import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync("src/content.config.ts", "utf8");
const flagship = readFileSync(
  "src/components/sections/FlagshipProof.astro",
  "utf8",
);
const profile = readFileSync("src/pages/products/[slug].astro", "utf8");

test("product proof screenshot is a local sized artifact contract", () => {
  assert.match(config, /screenshot:\s*productScreenshot/);
  assert.match(config, /src:\s*z[\s.]*string\(/);
  assert.match(config, /alt:\s*z\.string/);
  assert.match(config, /width:\s*z\.number/);
  assert.match(config, /height:\s*z\.number/);
  assert.match(config, /\/products\//);
  assert.doesNotMatch(config, /screenshot:\s*z\.string\(\)\.optional\(\)/);
});

test("product action and proof URLs require https schemes", () => {
  assert.match(config, /httpsUrl/);
  assert.match(config, /isHttpsUrl/);
  assert.match(config, /href:\s*httpsUrl/);
  assert.match(config, /publicUrl:\s*httpsUrl/);
  assert.match(config, /repositoryUrl:\s*httpsUrl/);
});

test("public products require verified capabilities distinct from jobs", () => {
  assert.match(config, /capabilities/);
  assert.match(config, /jobs/);
  assert.match(config, /capabilities\.length/);
});

test("FlagshipProof renders capabilities and intrinsic screenshot sizing", () => {
  assert.match(flagship, /capabilities\.slice\(0,\s*3\)/);
  assert.doesNotMatch(flagship, /data\.jobs\.slice/);
  assert.match(flagship, /screenshot\.src/);
  assert.match(flagship, /screenshot\.alt/);
  assert.match(flagship, /screenshot\.width/);
  assert.match(flagship, /screenshot\.height/);
});

test("product profile exposes capabilities and sized evidence image", () => {
  assert.match(profile, /Main capabilities|capabilities/);
  assert.match(profile, /screenshot\.src/);
  assert.match(profile, /width=\{screenshot\.width\}/);
  assert.match(profile, /height=\{screenshot\.height\}/);
  assert.match(profile, /ogImage=\{data\.proof\.screenshot\?\.src\}/);
});
