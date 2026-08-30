import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ANSI_PATTERN = /\u001b\[[0-9;]*m/g;
const SIZE_PATTERN = /(\d+(?:\.\d+)?)\s*(B|kB|MB)/g;
export const PRODUCT_HARD_BUDGET_BYTES = 120_000;

function toBytes(value, unit) {
  const multipliers = { B: 1, kB: 1_000, MB: 1_000_000 };
  return Number(value) * multipliers[unit];
}

export function parseRootFirstLoadBytes(buildLog) {
  const clean = buildLog.replace(ANSI_PATTERN, "");
  const rootRow = clean
    .split(/\r?\n/)
    .find((line) => /^\s*[┌├└]\s+\S+\s+\/\s+/.test(line));

  if (!rootRow) {
    throw new Error("Could not find the root route row in Next build output");
  }

  const sizes = [...rootRow.matchAll(SIZE_PATTERN)];
  if (sizes.length < 2) {
    throw new Error(
      `Could not parse route and First Load JS sizes from: ${rootRow}`,
    );
  }

  const firstLoad = sizes.at(-1);
  return toBytes(firstLoad[1], firstLoad[2]);
}

export function evaluateRegression(
  baseBytes,
  candidateBytes,
  maxIncreasePercent = 5,
) {
  if (!(baseBytes > 0) || !(candidateBytes >= 0)) {
    throw new Error(
      "Bundle sizes must be non-negative and baseline must be greater than zero",
    );
  }

  const deltaPercent = ((candidateBytes - baseBytes) / baseBytes) * 100;
  return {
    baseBytes,
    candidateBytes,
    deltaPercent,
    maxIncreasePercent,
    pass: deltaPercent <= maxIncreasePercent,
    hardBudgetBytes: PRODUCT_HARD_BUDGET_BYTES,
    hardBudgetSatisfied: candidateBytes < PRODUCT_HARD_BUDGET_BYTES,
  };
}

function formatKb(bytes) {
  return `${(bytes / 1_000).toFixed(2)} kB`;
}

function runCli() {
  const [baseLogPath, candidateLogPath] = process.argv.slice(2);
  if (!baseLogPath || !candidateLogPath) {
    console.error(
      "Usage: node scripts/check-bundle-regression.mjs <base-build.log> <candidate-build.log>",
    );
    process.exit(2);
  }

  const baseBytes = parseRootFirstLoadBytes(readFileSync(baseLogPath, "utf8"));
  const candidateBytes = parseRootFirstLoadBytes(
    readFileSync(candidateLogPath, "utf8"),
  );
  const result = evaluateRegression(baseBytes, candidateBytes);

  writeFileSync("bundle-evidence.json", `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `G5: base ${formatKb(baseBytes)}, candidate ${formatKb(candidateBytes)}, ` +
      `delta ${result.deltaPercent.toFixed(2)}%, limit +${result.maxIncreasePercent}%`,
  );

  if (!result.hardBudgetSatisfied) {
    console.warn(
      `Product Truth budget remains NOT SATISFIED: ${formatKb(candidateBytes)} >= ` +
        `${formatKb(PRODUCT_HARD_BUDGET_BYTES)}. This is tracked separately from G5 regression.`,
    );
  }

  if (!result.pass) {
    console.error(
      "G5 FAIL: First Load JS regressed by more than 5% versus the exact base revision.",
    );
    process.exit(1);
  }

  console.log("G5 PASS: no bundle-size regression greater than 5%.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
