#!/usr/bin/env node
import { brotliCompressSync, constants as zlibConstants } from "node:zlib";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const CLIENT_JS_HARD_BUDGET_BYTES = 120_000;

function collectLocalScriptSrcs(html, htmlDir) {
  const srcs = [];
  const pattern = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(pattern)) {
    const src = match[1];
    if (!src || /^https?:\/\//i.test(src) || src.startsWith("//")) {
      continue;
    }
    const cleaned = src.split("?")[0].split("#")[0];
    const relative = cleaned.startsWith("/") ? `.${cleaned}` : cleaned;
    srcs.push(resolve(htmlDir, relative));
  }
  return [...new Set(srcs)];
}

export function measureClientJsBudget(distDir = "dist") {
  const indexPath = join(distDir, "index.html");
  if (!existsSync(indexPath)) {
    throw new Error(`Missing ${indexPath}`);
  }

  const html = readFileSync(indexPath, "utf8");
  const scriptPaths = collectLocalScriptSrcs(html, dirname(indexPath));
  let totalBrotliBytes = 0;
  const files = [];

  for (const filePath of scriptPaths) {
    if (!existsSync(filePath)) {
      throw new Error(`Referenced script missing: ${filePath}`);
    }
    const raw = readFileSync(filePath);
    const compressed = brotliCompressSync(raw, {
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      },
    });
    totalBrotliBytes += compressed.byteLength;
    files.push({
      path: filePath,
      rawBytes: raw.byteLength,
      brotliBytes: compressed.byteLength,
    });
  }

  return {
    indexPath,
    files,
    totalBrotliBytes,
    budgetBytes: CLIENT_JS_HARD_BUDGET_BYTES,
    withinBudget: totalBrotliBytes < CLIENT_JS_HARD_BUDGET_BYTES,
  };
}

function listHtmlFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

export function assertNoFrameworkClientLeak(distDir = "dist") {
  if (!existsSync(distDir)) {
    throw new Error(`Missing ${distDir}`);
  }
  for (const htmlPath of listHtmlFiles(distDir)) {
    const html = readFileSync(htmlPath, "utf8");
    if (/_next\/static|__NEXT_DATA__/i.test(html)) {
      throw new Error(`Next runtime leak detected in ${htmlPath}`);
    }
  }
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const result = measureClientJsBudget("dist");
  assertNoFrameworkClientLeak("dist");
  console.log(JSON.stringify(result, null, 2));
  if (!result.withinBudget) {
    console.error(
      `Client JS budget exceeded: ${result.totalBrotliBytes} >= ${result.budgetBytes}`,
    );
    process.exit(1);
  }
  console.log(
    `Client JS budget PASS: ${result.totalBrotliBytes} < ${result.budgetBytes} Brotli bytes`,
  );
}
