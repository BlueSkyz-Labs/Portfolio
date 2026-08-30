import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
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

test("CLI rejects a candidate that violates the hard Product Truth budget", () => {
  const dir = mkdtempSync(join(tmpdir(), "portfolio-budget-"));
  const basePath = join(dir, "base.log");
  const candidatePath = join(dir, "candidate.log");
  writeFileSync(basePath, buildLog(145));
  writeFileSync(candidatePath, buildLog(145));

  const scriptPath = fileURLToPath(
    new URL("../../scripts/check-bundle-regression.mjs", import.meta.url),
  );
  const result = spawnSync(process.execPath, [scriptPath, basePath, candidatePath], {
    cwd: dir,
    encoding: "utf8",
  });

  assert.notEqual(
    result.status,
    0,
    `hard-budget violation must block promotion; stdout=${result.stdout}; stderr=${result.stderr}`,
  );
  assert.match(`${result.stdout}\n${result.stderr}`, /Product Truth budget/);
});
