import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateRegression,
  parseRootFirstLoadBytes,
} from "../../scripts/check-bundle-regression.mjs";

const buildLog = (firstLoad) => `
Route (app)                              Size     First Load JS
┌ ○ /                                    2.04 kB         ${firstLoad} kB
└ ○ /_not-found                          136 B           100 kB
`;

test("parses Next root-route First Load JS", () => {
  assert.equal(parseRootFirstLoadBytes(buildLog(142)), 142_000);
});

test("G5 passes when candidate improves versus base", () => {
  const result = evaluateRegression(159_000, 142_000);
  assert.equal(result.pass, true);
  assert.ok(result.deltaPercent < 0);
});

test("G5 rejects a regression greater than five percent", () => {
  const result = evaluateRegression(159_000, 167_000);
  assert.equal(result.pass, false);
  assert.ok(result.deltaPercent > 5);
});
