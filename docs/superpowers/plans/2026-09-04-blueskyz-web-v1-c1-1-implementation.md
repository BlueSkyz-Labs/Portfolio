# BlueSkyz Labs Web V1 C1.1 Implementation Plan

> **Execution status (2026-09-04):** Tasks **1–3** and **5–14** landed on `main` through #43–#46. Task **4** (R4d from `sgps-core`) remains **BLOCKED**. Public promotion remains owner/evidence-gated. See `docs/superpowers/plans/2026-09-03-remaining-convergence.md` and `docs/evidence/2026-09-04-permission-blockers.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy BlueSkyz portfolio/atelier website with the C1.1 trust-forward product-house experience, using an evidence-gated frontier-stable stack and Cloudflare-native delivery.

**Architecture:** Astro 7 is the preferred implementation path: static HTML/CSS by default, Astro islands only when interaction earns client JavaScript, Tailwind CSS 4 through Vite, and Astro Content Collections for evidence-aware product truth. Task 1 is a mandatory benchmark against Next.js 16.3 static; Tasks 2–14 execute only if the committed evidence selects Astro. Cloudflare Workers Static Assets hosts `dist/`, Cloudflare Workers Builds handles remote build/deploy, and GitHub remains source control + PR review rather than required CI compute.

**Tech Stack:** Astro 7 candidate; Vite 8/Rolldown; TypeScript 6 stable baseline; Node 24 LTS; pnpm 11; Tailwind CSS 4 + `@tailwindcss/vite`; Astro Content Collections + `astro/zod`; Node native tests; Playwright + axe; Lighthouse CI; Cloudflare Workers Static Assets / Workers Builds.

**Spec:** `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`

## Global Constraints

- C1.1 is canonical: **Porcelain-first, Trust-forward Hybrid Product House**.
- Brand flow: **Brand gives meaning → Products give proof → Shared principles create coherence → Trust removes doubt → Action continues the relationship.**
- Masterbrand primitives: Ink `#0B1020`, Porcelain `#F7F8FA`, Cobalt `#2568FF`; Cobalt signals rather than floods.
- Gold/champagne, Cormorant-led typography, digital-atelier/Savile-Row language, custom cursor, decorative parallax, agency-style contact copy, and legacy Work/Manifesto/Process semantics are superseded.
- WCAG 2.2 AA is the launch baseline; primary touch targets generally target ≥44×44 CSS px; keyboard and reduced-motion paths are first-class.
- Field goals: LCP ≤2.5s p75, INP ≤200ms p75, CLS ≤0.1 p75; internal CLS ambition ≤0.05.
- Initial client JavaScript must remain below the legacy 120 kB hard ceiling and should be near-zero by default if Astro wins.
- Product lifecycle, availability, CTA, evidence, and public visibility are modeled truth. Unsupported claims are **Do not publish**.
- Generated product mockups must not masquerade as runtime product evidence.
- Do not invent canonical domain, corporate email, product status, screenshots, legal wording, social proof, certifications, user counts, or founder/company claims.
- `BlueSkyz Labs` is the public masterbrand; preferred product endorsement is `A BlueSkyz Labs product`.
- The R4d v1.1 SGPS reference set remains a candidate/evidence source and does not imply trademark clearance or promoted E5/E6 recognition.
- Prefer browser-native capabilities before libraries: CSS, View Transitions, Container Queries, native Dialog/Popover where appropriate.
- No CMS, database, KV, D1, R2, Durable Objects, Workers AI, runtime API, or full-stack framework runtime in V1 unless a later approved requirement earns it.
- Node 24 LTS remains the runtime/tooling baseline.
- pnpm 11 is the target package-manager line; pin the exact resolved 11.x version in `packageManager` and `pnpm-lock.yaml` during Task 2.
- TypeScript 6 is the production baseline for this plan. TypeScript 7 remains a separate PILOT.
- GitHub Actions must not remain a required execution dependency after migration.
- Cloudflare Workers Static Assets + Workers Builds are the target remote delivery path.
- Public promotion remains blocked until canonical domain, truthful product inventory/status, real public artifacts, approved privacy/support/security destinations, and approved founder/company wording exist.
- Use an isolated worktree at execution time; do not implement in the primary working tree.

---

## Target File Structure

```text
.
├── astro.config.mjs
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── wrangler.toml
├── public/
│   ├── _headers
│   ├── brand/blueskyz/r4d/
│   ├── products/
│   └── social/
├── src/
│   ├── content.config.ts
│   ├── content/products/
│   ├── data/site.ts
│   ├── layouts/BaseLayout.astro
│   ├── components/{brand,layout,product,sections,ui}/
│   ├── lib/{products,seo,truth}.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── products/index.astro
│   │   ├── products/[slug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── support.astro
│   │   ├── privacy.astro
│   │   ├── security.astro
│   │   └── 404.astro
│   └── styles/global.css
├── scripts/
│   ├── verify-static-export.mjs
│   ├── check-client-budget.mjs
│   └── validate-public-truth.mjs
├── tests/{architecture,e2e}/
└── docs/evidence/
```

---

### Task 1: Benchmark Astro 7 vs Next 16.3 static and commit the framework decision

**Files:**

- Create temporarily, never commit: `.tmp/framework-benchmark/astro/`
- Create temporarily, never commit: `.tmp/framework-benchmark/next/`
- Create: `docs/evidence/2026-09-04-framework-benchmark.md`
- Create: `docs/decisions/0004-web-framework-selection.md`
- Create: `tests/architecture/framework-decision.test.mjs`
- Modify: `.gitignore`

**Interfaces:**

- Consumes: approved spec and the same R4d asset/content fixture for both frameworks.
- Produces: `Decision: ASTRO_7` or `Decision: NEXT_16_3_STATIC` backed by measured local evidence.

- [ ] **Step 1: Write the failing decision-record test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const path = "docs/decisions/0004-web-framework-selection.md";

test("framework decision is measured and executable", () => {
  const text = readFileSync(path, "utf8");
  assert.match(text, /Decision:\s+(ASTRO_7|NEXT_16_3_STATIC)/);
  for (const label of [
    "Cold build median",
    "Warm build median",
    "Initial compressed JavaScript",
    "Critical asset bytes",
    "Lighthouse performance",
    "Accessibility parity",
    "Cloudflare preview",
    "Migration effort",
  ])
    assert.match(text, new RegExp(label));
  assert.doesNotMatch(text, /TBD|TODO|placeholder/i);
});
```

- [ ] **Step 2: Run it and verify the expected failure**

```bash
node --test tests/architecture/framework-decision.test.mjs
```

Expected: FAIL with `ENOENT` because ADR 0004 does not exist.

- [ ] **Step 3: Ignore the throwaway benchmark fixture**

Append:

```gitignore
# one-time framework benchmark fixtures
.tmp/framework-benchmark/
```

- [ ] **Step 4: Build the same C1.1 fixture twice**

Both fixtures contain exactly:

```text
Hero:
- BlueSkyz Labs
- We build products that make complex things feel naturally clear.
- Explore products
- About BlueSkyz
- same copied R4d symbol

Product grid:
- 1 flagship
- 2 secondary
- 2 ecosystem cards
- status text and CTA text

Styling:
- same Ink/Porcelain/Cobalt tokens
- same responsive grid
- same system font stack
- no animation framework
- no remote fonts
```

Astro fixture: Astro 7, Tailwind 4 via `@tailwindcss/vite`, no React integration, no client directives.

Next fixture: Next 16.3, React 19.2, App Router, `output: "export"`, Tailwind 4, no `"use client"`.

- [ ] **Step 5: Measure five cold and five warm builds per candidate**

Use the same Node 24 / pnpm 11 machine. Cold runs delete build output/cache; warm runs preserve framework cache. Record every run and median in `docs/evidence/2026-09-04-framework-benchmark.md` together with:

```text
HTML bytes
CSS bytes
initial Brotli/gzip JavaScript bytes
critical asset bytes
Lighthouse performance median
Lighthouse accessibility median
```

Only local measurements count; vendor benchmark numbers do not.

- [ ] **Step 6: Verify browser/a11y parity on both fixtures**

Record PASS/FAIL for:

```text
H1 visible without JS reveal
Explore products keyboard reachable
all five product cards expose name/status/action
320px has no horizontal overflow
reduced-motion does not hide content
axe has zero critical/serious violations
```

- [ ] **Step 7: Deploy both fixtures to temporary Cloudflare previews**

Record PASS/FAIL for preview build, asset routing, 404 behavior, and security headers. Remove one-time preview projects after evidence capture.

- [ ] **Step 8: Apply the exact promotion gate**

Astro wins only if all six are true:

```text
1. no customer-experience regression
2. accessibility and SEO parity or improvement
3. clean Cloudflare deployment
4. browser/QA contracts remain portable
5. materially lower initial JS and/or meaningful complexity reduction
6. bounded migration effort that does not jeopardize C1.1 delivery
```

Otherwise select `NEXT_16_3_STATIC`.

- [ ] **Step 9: Write ADR 0004 using only measured values**

The ADR must contain these headings/labels with the exact values copied from the evidence document:

```text
# ADR 0004 — BlueSkyz Web V1 Framework Selection
Decision: ASTRO_7   OR   Decision: NEXT_16_3_STATIC
Date: 2026-09-04
Spec: docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md
Evidence: docs/evidence/2026-09-04-framework-benchmark.md
Cold build median:
Warm build median:
Initial compressed JavaScript:
Critical asset bytes:
Lighthouse performance:
Accessibility parity:
Cloudflare preview:
Migration effort:
Rationale:
Rollback:
```

Every label must have a real value in the committed ADR. `Rationale` is one evidence-based paragraph. `Rollback` states that an Astro regression before public launch reverts the migration and returns to Next 16.3 static from the same canonical spec.

- [ ] **Step 10: Delete the benchmark fixtures and verify the record**

```bash
rm -rf .tmp/framework-benchmark
node --test tests/architecture/framework-decision.test.mjs
```

Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add .gitignore docs/evidence/2026-09-04-framework-benchmark.md docs/decisions/0004-web-framework-selection.md tests/architecture/framework-decision.test.mjs
git commit -m "docs: lock evidence-backed web framework decision"
```

**Hard branch:** if ADR 0004 says `NEXT_16_3_STATIC`, STOP this plan after Task 1 and write a Next-specific replacement plan before touching migration code. Continue below only for `ASTRO_7`.

---

### Task 2: Migrate the build/tooling foundation to Astro 7

**Files:**

- Modify: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `eslint.config.mjs`
- Create: `astro.config.mjs`, `src/env.d.ts`, `src/styles/global.css`, `tests/architecture/astro-toolchain.test.mjs`
- Delete after green replacement: `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`

**Interfaces:**

- Consumes: `Decision: ASTRO_7`.
- Produces: strict Astro static project with Tailwind/Vite and no Next/Framer runtime.

- [ ] **Step 1: Write the failing toolchain contract**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const astro = readFileSync("astro.config.mjs", "utf8");
const ts = readFileSync("tsconfig.json", "utf8");

test("Astro static foundation replaces the Next runtime", () => {
  assert.match(pkg.dependencies.astro, /^\^?7\./);
  assert.equal(pkg.dependencies.next, undefined);
  assert.equal(pkg.dependencies["framer-motion"], undefined);
  assert.match(pkg.devDependencies["@tailwindcss/vite"], /./);
  assert.match(astro, /@tailwindcss\/vite/);
  assert.match(astro, /output:\s*["']static["']/);
  assert.match(ts, /astro\/tsconfigs\/strict/);
});
```

- [ ] **Step 2: Verify it fails on the current Next project**

```bash
node --test tests/architecture/astro-toolchain.test.mjs
```

- [ ] **Step 3: Pin pnpm 11 and replace framework packages**

```bash
corepack enable
corepack use pnpm@11
pnpm remove next framer-motion @radix-ui/react-dialog @radix-ui/react-slot
pnpm add astro@^7
pnpm add -D @astrojs/check @tailwindcss/vite tailwindcss eslint eslint-plugin-astro typescript prettier @playwright/test @axe-core/playwright @lhci/cli
```

Keep the exact pnpm version written by `corepack use` in `packageManager`.

- [ ] **Step 4: Replace package scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build && node scripts/verify-static-export.mjs",
    "start": "astro preview --host 127.0.0.1 --port 3000",
    "typecheck": "astro check",
    "lint": "eslint . --max-warnings=0",
    "format": "prettier --write \"**/*.{astro,ts,tsx,js,mjs,json,md,css,yaml,yml}\"",
    "format:check": "prettier --check \"**/*.{astro,ts,tsx,js,mjs,json,md,css,yaml,yml}\"",
    "test:architecture": "node --test tests/architecture/*.test.mjs",
    "test:e2e": "playwright test --project=chromium --project=firefox --project=webkit --project=mobile-chromium",
    "lighthouse": "lhci autorun",
    "prepare": "git config core.hooksPath .githooks || true"
  }
}
```

- [ ] **Step 5: Create Astro/Tailwind config**

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 6: Replace TypeScript config**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

`src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 7: Replace legacy lint compatibility with Astro flat config**

Use the installed current `eslint-plugin-astro` flat-config export and preserve these invariants:

```js
{
  ignores: [
    "dist/**",
    ".astro/**",
    "node_modules/**",
    "playwright-report/**",
    "test-results/**",
  ];
}
```

The final config must lint `.astro` and TS/JS source, must not use `FlatCompat`, and must not reference `next/core-web-vitals` or `next/typescript`.

- [ ] **Step 8: Create minimal Astro page and Tailwind import**

`src/styles/global.css`:

```css
@import "tailwindcss";
:root {
  color-scheme: light;
}
body {
  margin: 0;
}
```

`src/pages/index.astro`:

```astro
---
import "@/styles/global.css";
---

<!doctype html>
<html lang="en">
  <head
    ><meta charset="utf-8" /><meta
      name="viewport"
      content="width=device-width"
    /><title>BlueSkyz Labs</title></head
  ><body><main id="main-content"><h1>BlueSkyz Labs</h1></main></body>
</html>
```

- [ ] **Step 9: Run green gates, then remove Next-only config**

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
node --test tests/architecture/astro-toolchain.test.mjs
git rm next.config.ts postcss.config.mjs tailwind.config.ts
pnpm build
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "build: migrate BlueSkyz web foundation to Astro 7"
```

---

### Task 3: Move deployment from Pages/GitHub Actions to Workers Static Assets

**Files:**

- Modify: `wrangler.toml`, `public/_headers`, `scripts/verify-static-export.mjs`, `README.md`
- Create: `tests/architecture/cloudflare-workers.test.mjs`, `src/pages/404.astro`
- Delete: `tests/architecture/cloudflare-pages.test.mjs`, `tests/architecture/github-actions-runtime.test.mjs`, `.github/workflows/qa.yml`

**Interfaces:**

- Consumes: Astro `dist/`.
- Produces: Workers Static Assets contract and no required GitHub Actions pipeline.

- [ ] **Step 1: Write the failing Workers contract test**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const wrangler = readFileSync("wrangler.toml", "utf8");

test("Workers serves the Astro static build", () => {
  assert.match(wrangler, /\[assets\]/);
  assert.match(wrangler, /directory\s*=\s*["']\.\/dist["']/);
  assert.match(wrangler, /not_found_handling\s*=\s*["']404-page["']/);
  assert.match(wrangler, /html_handling\s*=\s*["']auto-trailing-slash["']/);
  assert.doesNotMatch(wrangler, /pages_build_output_dir/);
  assert.equal(existsSync(".github/workflows/qa.yml"), false);
});
```

- [ ] **Step 2: Verify it fails**

```bash
node --test tests/architecture/cloudflare-workers.test.mjs
```

- [ ] **Step 3: Replace `wrangler.toml`**

```toml
name = "blueskyz-web"
compatibility_date = "2026-09-04"

[assets]
directory = "./dist"
not_found_handling = "404-page"
html_handling = "auto-trailing-slash"
```

Do not add `main`, bindings, D1, KV, or a Worker runtime.

- [ ] **Step 4: Replace static export verification**

```js
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";

for (const file of ["dist/index.html", "dist/404.html"]) {
  assert.ok(existsSync(file), `${file} must exist`);
  assert.ok(statSync(file).size > 0, `${file} must not be empty`);
}
console.log("Static export verified");
```

Create a minimal `src/pages/404.astro` before running the build.

- [ ] **Step 5: Preserve explicit static security headers**

At minimum:

```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

CSP waits until Task 12 when actual script/font sources are known.

- [ ] **Step 6: Remove obsolete remote-CI assumptions and run gates**

```bash
git rm .github/workflows/qa.yml tests/architecture/cloudflare-pages.test.mjs tests/architecture/github-actions-runtime.test.mjs
pnpm build
node --test tests/architecture/cloudflare-workers.test.mjs
pnpm test:architecture
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "build: move delivery contract to Workers Static Assets"
```

---

### Task 4: Import the exact R4d reference assets with SGPS provenance

**Files:**

- Create: `public/brand/blueskyz/r4d/{symbol_mono_ink.svg,micro_mark_ink.svg,brand_tokens.json,brand-manifest.json}`
- Create: `tests/architecture/brand-provenance.test.mjs`
- Delete or rewrite if stale: `scripts/generate-brand-assets.py`

**Interfaces:**

- Consumes: exact `sgps-core` main SHA and R4d v1.1 reference paths.
- Produces: deterministic public projection; no redrawing/reinterpretation.

- [ ] **Step 1: Write the failing provenance test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const m = JSON.parse(
  readFileSync("public/brand/blueskyz/r4d/brand-manifest.json", "utf8"),
);

test("R4d projection preserves candidate provenance", () => {
  assert.equal(m.assetId, "BLUESKYZ-MASTERBRAND-R4D");
  assert.equal(m.assetVersion, "1.1.0");
  assert.equal(m.canonicalName, "BlueSkyz Labs");
  assert.equal(m.status, "IDENTITY_PROTOTYPE_READY");
  assert.equal(m.designState, "DESIGN_FREEZE_CANDIDATE");
  assert.match(m.sourceRevision, /^[0-9a-f]{40}$/);
  assert.equal(m.runtimeFontDependencyForWordmark, "NONE_VECTOR_OUTLINES");
});
```

- [ ] **Step 2: Resolve one exact SGPS revision and copy files from that revision**

```bash
SGPS_REVISION="$(git ls-remote https://github.com/BlueSkyz-Labs/sgps-core.git refs/heads/main | cut -f1)"
test "${#SGPS_REVISION}" -eq 40
mkdir -p public/brand/blueskyz/r4d
for file in symbol_mono_ink.svg micro_mark_ink.svg brand_tokens.json; do
  curl -fsSL "https://raw.githubusercontent.com/BlueSkyz-Labs/sgps-core/${SGPS_REVISION}/standards/experience/brand/assets/blueskyz/r4d-v1.1/${file}" -o "public/brand/blueskyz/r4d/${file}"
done
```

- [ ] **Step 3: Generate the manifest from the resolved SHA**

```bash
SGPS_REVISION="$SGPS_REVISION" node <<'NODE'
import { writeFileSync } from "node:fs";
const sourceRevision = process.env.SGPS_REVISION;
if (!/^[0-9a-f]{40}$/.test(sourceRevision ?? "")) throw new Error("invalid SGPS revision");
const manifest = {
  assetId: "BLUESKYZ-MASTERBRAND-R4D",
  assetVersion: "1.1.0",
  canonicalName: "BlueSkyz Labs",
  status: "IDENTITY_PROTOTYPE_READY",
  designState: "DESIGN_FREEZE_CANDIDATE",
  sourceRepository: "BlueSkyz-Labs/sgps-core",
  sourcePath: "standards/experience/brand/assets/blueskyz/r4d-v1.1/",
  sourceRevision,
  runtimeFontDependencyForWordmark: "NONE_VECTOR_OUTLINES"
};
writeFileSync("public/brand/blueskyz/r4d/brand-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
NODE
```

- [ ] **Step 4: Define safe lockup behavior**

Until an approved full outlined lockup with matching provenance exists in source control, Header/Footer use the exact R4d symbol + live text `BlueSkyz Labs`. Do not synthesize a vector wordmark or use an AI-redrawn mark.

- [ ] **Step 5: Remove any legacy asset generator that can emit a different mark**

If `scripts/generate-brand-assets.py` reconstructs old geometry, delete it. If it remains useful, rewrite it to consume the committed R4d SVG rather than recreate geometry.

- [ ] **Step 6: Run tests and commit**

```bash
node --test tests/architecture/brand-provenance.test.mjs
pnpm test:architecture
git add -A
git commit -m "feat: project R4d brand assets with SGPS provenance"
```

---

### Task 5: Establish semantic C1.1 tokens and accessible typography defaults

**Files:**

- Modify: `src/styles/global.css`
- Create: `tests/architecture/c1-tokens.test.mjs`

**Interfaces:**

- Produces: semantic tokens consumed by every page/component.

- [ ] **Step 1: Write the failing token test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync("src/styles/global.css", "utf8").toLowerCase();

test("C1.1 tokens use R4d primitives without legacy gold", () => {
  for (const value of [
    "--brand-ink: #0b1020",
    "--brand-porcelain: #f7f8fa",
    "--brand-cobalt: #2568ff",
    "--surface-primary",
    "--surface-inverse",
    "--text-primary",
    "--text-muted",
    "--action-primary",
    "--focus-ring",
  ]) {
    assert.match(css, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(css, /#c9a962|champagne|gold/i);
});
```

- [ ] **Step 2: Add brand primitives and semantic aliases**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0b1020;
  --color-porcelain: #f7f8fa;
  --color-cobalt: #2568ff;
  --color-slate-900: #0f172a;
  --color-slate-700: #334155;
  --color-slate-500: #64748b;
  --color-slate-300: #cbd5e1;
  --color-slate-100: #f1f5f9;
}

:root {
  --brand-ink: #0b1020;
  --brand-porcelain: #f7f8fa;
  --brand-cobalt: #2568ff;
  --surface-primary: var(--brand-porcelain);
  --surface-subtle: #f1f5f9;
  --surface-inverse: var(--brand-ink);
  --text-primary: var(--brand-ink);
  --text-secondary: #334155;
  --text-muted: #64748b;
  --border-subtle: #cbd5e1;
  --action-primary: #1d4ed8;
  --focus-ring: #1d4ed8;
  --radius-card: 0.625rem;
  color-scheme: light;
}

html {
  background: var(--surface-primary);
  color: var(--text-primary);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  text-rendering: optimizeLegibility;
}
body {
  margin: 0;
  min-width: 320px;
  background: var(--surface-primary);
}
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Keep the production font evidence-gated**

Do not commit/download Inter merely because it is the candidate. The production font is promoted only after Vietnamese specimen (`ă â ê ô ơ ư đ` + tone combinations), mobile rendering, license, fallback metrics, and payload review. System sans remains valid for previews.

- [ ] **Step 4: Run and commit**

```bash
node --test tests/architecture/c1-tokens.test.mjs
pnpm build
git add src/styles/global.css tests/architecture/c1-tokens.test.mjs
git commit -m "feat: establish C1.1 semantic visual tokens"
```

---

### Task 6: Build the accessible site shell and environment-backed corporate truth

**Files:**

- Create: `src/data/site.ts`, `src/layouts/BaseLayout.astro`
- Create: `src/components/layout/{Container,Header,Footer}.astro`
- Create: `src/components/ui/ButtonLink.astro`
- Replace: `src/pages/404.astro`
- Create: `tests/e2e/shell.spec.ts`

**Interfaces:**

- Produces: `SITE` config + shared shell for all routes.

- [ ] **Step 1: Write failing shell tests**

```ts
import { expect, test } from "@playwright/test";

test("shell exposes skip link and product-led nav", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /skip to main content/i }),
  ).toBeAttached();
  const nav = page.getByRole("navigation", { name: /primary/i });
  for (const name of ["Products", "About", "Contact"])
    await expect(nav.getByRole("link", { name })).toBeVisible();
  await expect(nav.getByText(/Work|Process|Manifesto/)).toHaveCount(0);
});
```

- [ ] **Step 2: Create safe site config**

```ts
const localFallback = "http://localhost:4321";
export const SITE = {
  name: "BlueSkyz Labs",
  proposition:
    "We build products that make complex things feel naturally clear.",
  url: import.meta.env.PUBLIC_SITE_URL?.trim() || localFallback,
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || null,
  securityEmail: import.meta.env.PUBLIC_SECURITY_EMAIL?.trim() || null,
} as const;
```

Never hard-code a guessed production domain/email.

- [ ] **Step 3: Build Container/ButtonLink/Header/Footer with no React island**

Requirements:

```text
Container: max 1280–1360px, 20–24px mobile gutters
ButtonLink: semantic <a>, min-height 44px, visible focus
Header: R4d symbol + text BlueSkyz Labs; Products/About/Contact only
Mobile menu: native details/dialog if needed; no Radix/React
Footer: Products/About/Contact/Support/Privacy/Security; social links only when verified
```

- [ ] **Step 4: Build `BaseLayout.astro`**

```astro
---
import Header from "@/components/layout/Header.astro";
import Footer from "@/components/layout/Footer.astro";
import "@/styles/global.css";
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head
    ><meta charset="utf-8" /><meta
      name="viewport"
      content="width=device-width"
    /><meta name="description" content={description} /><title>
      {title}
    </title></head
  >
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <Header />
    <main id="main-content"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Replace 404 with restrained error content**

Use exactly the semantic intent: `Page not found.`, short explanatory sentence, `Go home`, `Explore products`.

- [ ] **Step 6: Run and commit**

```bash
pnpm build
pnpm test:e2e -- shell.spec.ts
git add src/data src/layouts src/components/layout src/components/ui/ButtonLink.astro src/pages/404.astro tests/e2e/shell.spec.ts
git commit -m "feat: add accessible BlueSkyz site shell"
```

---

### Task 7: Create the evidence-aware Product Content Collection

**Files:**

- Create: `src/content.config.ts`, `src/content/products/*.yaml`, `src/lib/products.ts`
- Create: `docs/evidence/2026-09-04-public-product-audit.md`
- Create: `tests/architecture/product-truth.test.mjs`

**Interfaces:**

- Produces: `getPublicProducts()` and `getFlagshipProduct()` over validated content.

- [ ] **Step 1: Write the failing source contract**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync("src/content.config.ts", "utf8");
test("product truth models lifecycle, availability, proof and CTA", () => {
  for (const field of [
    "lifecycle",
    "availability",
    "publicLabel",
    "audience",
    "jobs",
    "platforms",
    "primaryAction",
    "proof",
    "featuredTier",
    "sourceRevision",
    "lastReviewedAt",
  ])
    assert.match(config, new RegExp(field));
  assert.match(config, /A BlueSkyz Labs product/);
});
```

- [ ] **Step 2: Implement the collection schema**

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lifecycle = z.enum([
  "concept",
  "prototype",
  "development",
  "beta",
  "active",
  "maintenance",
  "sunset",
  "archived",
]);
const availability = z.enum([
  "private",
  "waitlist",
  "preview",
  "public",
  "invite-only",
  "unavailable",
]);
const publicLabel = z.enum([
  "Preview",
  "In development",
  "Beta",
  "Available",
  "Sunsetting",
  "Archived",
]);
const platform = z.enum(["web", "android", "ios", "macos", "windows", "api"]);
const audience = z.enum([
  "individual",
  "professional",
  "team",
  "business",
  "organization",
]);
const actionType = z.enum([
  "open",
  "try",
  "explore",
  "preview",
  "waitlist",
  "get-started",
  "github",
  "contact",
]);
const action = z.object({
  type: actionType,
  label: z.string().min(1).max(40),
  href: z.string().url(),
});

const productSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(1),
    shortDescription: z.string().min(1).max(180),
    lifecycle,
    availability,
    publicLabel,
    audience: z.array(audience).min(1),
    jobs: z.array(z.string().min(1)).min(1),
    platforms: z.array(platform).min(1),
    primaryAction: action,
    secondaryAction: action.optional(),
    proof: z
      .object({
        screenshot: z.string().optional(),
        publicUrl: z.string().url().optional(),
        repositoryUrl: z.string().url().optional(),
        documentationUrl: z.string().url().optional(),
        privacyUrl: z.string().url().optional(),
        securityUrl: z.string().url().optional(),
        supportUrl: z.string().url().optional(),
      })
      .refine(
        (v) => Object.values(v).some(Boolean),
        "public product requires at least one proof artifact",
      ),
    endorsement: z.literal("A BlueSkyz Labs product"),
    featuredTier: z.enum(["hero", "featured", "ecosystem", "hidden"]),
    displayOrder: z.number().int().nonnegative(),
    public: z.boolean(),
    sourceRevision: z.string().regex(/^[0-9a-f]{7,40}$/),
    lastReviewedAt: z.coerce.date(),
  })
  .superRefine((v, ctx) => {
    if (v.lifecycle === "development" && v.primaryAction.type === "try")
      ctx.addIssue({
        code: "custom",
        path: ["primaryAction", "type"],
        message: "development product cannot claim Try",
      });
  });

const products = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml,json}",
    base: "./src/content/products",
  }),
  schema: productSchema,
});
export const collections = { products };
```

- [ ] **Step 3: Audit each candidate repo before creating its entry**

For ApexAgent, Sổ Tâm, Sổ Trọ, FluentArc, and Vững Tay Lái, record exact repo revision, customer job, lifecycle evidence, availability evidence, public URL, real screenshot/artifact, privacy/security/support paths, and final `PUBLIC` or `HIDDEN` decision.

Rules: no evidence → do not infer; no proof artifact → hidden; never publish all five merely to fill a layout.

- [ ] **Step 4: Create YAML only from verified facts**

Each public entry must pass the schema and match the audit. No fake URLs, lorem ipsum, invented status, or generated screenshot. Hidden candidates may be omitted or set `public: false` + `featuredTier: hidden`.

- [ ] **Step 5: Add query helpers**

```ts
import { getCollection } from "astro:content";
export async function getPublicProducts() {
  const products = await getCollection("products", ({ data }) => data.public);
  return products.sort((a, b) => a.data.displayOrder - b.data.displayOrder);
}
export async function getFlagshipProduct() {
  return (
    (await getPublicProducts()).find((p) => p.data.featuredTier === "hero") ??
    null
  );
}
```

- [ ] **Step 6: Run build/schema gate and commit**

```bash
pnpm typecheck
pnpm build
node --test tests/architecture/product-truth.test.mjs
git add src/content.config.ts src/content/products src/lib/products.ts docs/evidence/2026-09-04-public-product-audit.md tests/architecture/product-truth.test.mjs
git commit -m "feat: add evidence-aware public product registry"
```

---

### Task 8: Build the C1.1 homepage in the canonical customer order

**Files:**

- Create: `src/components/sections/{Hero,FeaturedProducts,OneHouse,FlagshipProof,Trust,AboutBlueSkyz,NextStep}.astro`
- Create: `src/components/product/{ProductCard,ProductStatus}.astro`
- Replace: `src/pages/index.astro`
- Create: `tests/e2e/home-c1.spec.ts`

**Interfaces:**

- Consumes: public products + flagship query.
- Produces: canonical C1.1 homepage.

- [ ] **Step 1: Write failing journey tests**

```ts
import { expect, test } from "@playwright/test";

test("homepage explains BlueSkyz and rejects old positioning", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /build products.*complex.*clear/i,
  );
  await expect(
    page.getByRole("link", { name: /Explore products/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/Quiet luxury|digital atelier|Savile Row|Selected works/i),
  ).toHaveCount(0);
});

test("320px homepage has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);
});
```

- [ ] **Step 2: Implement Hero with immediate HTML content**

Visible content:

```text
BlueSkyz Labs
We build products that make complex things feel naturally clear.
Thoughtful digital products shaped around real people, real decisions, and real-world use.
Explore products
About BlueSkyz
```

R4d may be focal; no splash, custom cursor, parallax, Framer, or JS-gated reveal.

- [ ] **Step 3: Implement Featured Products from registry truth**

Render `hero` tier as one editorial flagship card, up to two `featured`, and selected `ecosystem`. Never render hidden entries. ProductCard consumes public status and CTA directly from content.

- [ ] **Step 4: Implement One House**

Use plain customer language:

```text
We don’t build around one category. We build around a way of thinking.
Make complexity clearer.
Use intelligence with purpose.
Respect human agency.
Build for real-world use.
```

- [ ] **Step 5: Implement Flagship Proof only when real evidence exists**

If flagship has a verified screenshot, render it with real product value/capability evidence. If not, omit the whole section rather than substitute generated art.

- [ ] **Step 6: Implement Trust, About, Next Step and compose order**

Order: Hero → Featured Products → One House → optional Flagship Proof → Trust → About → Next Step. Trust links to `/privacy/`, `/security/`, `/support/`. About may state `Tony Nguyen — Founder & CEO`; do not invent biography/team scale.

- [ ] **Step 7: Run and commit**

```bash
pnpm build
pnpm test:e2e -- home-c1.spec.ts
pnpm test:e2e -- accessibility.spec.ts
git add src/components/sections src/components/product src/pages/index.astro tests/e2e/home-c1.spec.ts
git commit -m "feat: build C1.1 product-house homepage"
```

---

### Task 9: Build product discovery and static product profiles

**Files:**

- Create: `src/pages/products/index.astro`, `src/pages/products/[slug].astro`, `tests/e2e/products.spec.ts`

**Interfaces:**

- Produces: `/products/` + one route per public product.

- [ ] **Step 1: Write failing route test**

```ts
import { expect, test } from "@playwright/test";

test("products index exposes truthful status", async ({ page }) => {
  await page.goto("/products/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Products/i }),
  ).toBeVisible();
  const cards = page.locator("[data-product-card]");
  expect(await cards.count()).toBeGreaterThan(0);
  await expect(
    cards
      .first()
      .getByText(/Available|Beta|Preview|In development|Sunsetting|Archived/),
  ).toBeVisible();
});
```

- [ ] **Step 2: Implement `/products/` without premature filters**

Render public entries ordered by `displayOrder`; no search/filter for a five-product-scale portfolio.

- [ ] **Step 3: Implement static profile paths**

```ts
export async function getStaticPaths() {
  const products = await getPublicProducts();
  return products.map((product) => ({
    params: { slug: product.data.slug },
    props: { product },
  }));
}
```

Profile contract: identity/value, status/platform/action, real proof, customer job, verified capability/evidence, trust links that exist, `A BlueSkyz Labs product`, next action. Do not generate unapproved feature prose.

- [ ] **Step 4: Run and commit**

```bash
pnpm build
pnpm test:e2e -- products.spec.ts
git add src/pages/products tests/e2e/products.spec.ts
git commit -m "feat: add product discovery and profile routes"
```

---

### Task 10: Add factual About/Contact/Support/Privacy/Security routes and production truth gate

**Files:**

- Create: `src/pages/{about,contact,support,privacy,security}.astro`
- Create: `src/lib/truth.ts`, `scripts/validate-public-truth.mjs`
- Create: `tests/architecture/public-truth-gate.test.mjs`, `tests/e2e/trust-routes.spec.ts`

**Interfaces:**

- Consumes: `SITE` + product proof links.
- Produces: trust surfaces and a production promotion gate.

- [ ] **Step 1: Add pure truth validation**

```ts
export interface PublicTruthInput {
  siteUrl?: string;
  contactEmail?: string;
  securityEmail?: string;
}
export function validatePublicTruth(input: PublicTruthInput): string[] {
  const errors: string[] = [];
  if (!input.siteUrl?.startsWith("https://"))
    errors.push("PUBLIC_SITE_URL must be an https URL");
  if (!input.contactEmail?.includes("@"))
    errors.push("PUBLIC_CONTACT_EMAIL is required");
  if (!input.securityEmail?.includes("@"))
    errors.push("PUBLIC_SECURITY_EMAIL is required");
  return errors;
}
```

- [ ] **Step 2: Create `validate-public-truth.mjs` and architecture test**

The script validates `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_SECURITY_EMAIL`, prints each error, and exits 1 on any error. It must never supply `portfolio.tonydemo.com` or another production fallback. Add:

```json
"validate:public-truth": "node scripts/validate-public-truth.mjs"
```

- [ ] **Step 3: Implement factual routes**

About: approved proposition + founder attribution only.

Contact: mailto only when configured; preview without email shows neutral configuration-state copy, not an invented address.

Support: product-specific support URLs where verified; corporate contact fallback only when configured.

Security: reporting email when configured; no bug bounty/SLA/certification/bank-grade claim.

Privacy: only factual corporate-site behavior; do not claim analytics until enabled and do not invent legal guarantees.

- [ ] **Step 4: Add browser tests for trust anti-patterns**

Verify all routes are reachable and runtime text contains none of: `global offices`, `bank-grade`, `military-grade`, unsupported `ISO`, unsupported `SOC`, or `Have something worth making?`.

- [ ] **Step 5: Run and commit**

```bash
node --test tests/architecture/public-truth-gate.test.mjs
pnpm build
pnpm test:e2e -- trust-routes.spec.ts
git add src/pages src/lib/truth.ts scripts/validate-public-truth.mjs package.json tests/architecture/public-truth-gate.test.mjs tests/e2e/trust-routes.spec.ts
git commit -m "feat: add factual trust and contact surfaces"
```

---

### Task 11: Add canonical SEO, structured data, sitemap, and social metadata

**Files:**

- Create: `src/lib/seo.ts`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Create when approved: `public/social/og-default.*`
- Create: `tests/architecture/seo-contract.test.mjs`, `tests/e2e/seo.spec.ts`

**Interfaces:**

- Consumes: `SITE.url` + public products.
- Produces: canonical/entity/product SEO with zero staging leakage.

- [ ] **Step 1: Create SEO helpers**

```ts
export function absoluteUrl(base: string, path: string) {
  return new URL(path, base).toString();
}
export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BlueSkyz Labs",
    url: siteUrl,
  } as const;
}
```

- [ ] **Step 2: Extend BaseLayout**

Add canonical path, OG image, Organization + WebSite JSON-LD. Canonical always derives from `SITE.url`; never request host or staging hard-code.

- [ ] **Step 3: Add robots and sitemap**

Sitemap contains only public routes/products. Robots references the canonical sitemap. Hidden products and preview/test paths are absent.

- [ ] **Step 4: Add OG asset only from approved brand/product art**

If product-specific proof is not approved, use masterbrand-only R4d art; never generated fake product UI.

- [ ] **Step 5: Test and commit**

```bash
pnpm build
node --test tests/architecture/seo-contract.test.mjs
pnpm test:e2e -- seo.spec.ts
git add src/lib/seo.ts src/layouts/BaseLayout.astro src/pages/robots.txt.ts src/pages/sitemap.xml.ts public/social tests/architecture/seo-contract.test.mjs tests/e2e/seo.spec.ts
git commit -m "feat: add truthful entity and product SEO"
```

---

### Task 12: Add progressive native motion, framework-neutral JS budget, and final security headers

**Files:**

- Create: `src/components/ui/Reveal.astro`, `scripts/check-client-budget.mjs`, `tests/e2e/motion.spec.ts`
- Modify: `src/styles/global.css`, `public/_headers`, `tests/architecture/bundle-budget.test.mjs`, `tests/architecture/security-headers.test.mjs`, `package.json`
- Delete/replace: `scripts/check-bundle-regression.mjs`

**Interfaces:**

- Produces: CSS/native motion and framework-neutral client-JS/security gates.

- [ ] **Step 1: Write reduced-motion test**

```ts
import { expect, test } from "@playwright/test";

test("reduced motion keeps hero content immediately visible", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Explore products/i }).first(),
  ).toBeVisible();
  await context.close();
});
```

- [ ] **Step 2: Implement `Reveal.astro` as a semantic wrapper**

It renders visible HTML by default. CSS may enhance opacity/clip-path on decorative layers only. Reduced-motion removes transforms. View Transitions are enabled only if cross-browser fallback remains clean; they are not mandatory.

- [ ] **Step 3: Replace Next build-log JS accounting with output accounting**

`check-client-budget.mjs` reads `dist/index.html`, finds local `.js` script `src`s, Brotli-compresses the referenced JS with Node `zlib.brotliCompressSync`, sums bytes, prints evidence, and exits 1 at `>= 120000` bytes. Add:

```json
"check:client-budget": "node scripts/check-client-budget.mjs"
```

Update `bundle-budget.test.mjs` to validate this behavior using a temporary fake `dist/` directory; remove Next route-table parsing.

- [ ] **Step 4: Finalize CSP from actual sources**

If no third-party scripts are enabled, use a strict static policy close to:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; form-action 'self'
```

If Astro inline output or approved Cloudflare analytics requires a change, widen only the exact directive/source and document why in `SECURITY.md`. No wildcard origins.

- [ ] **Step 5: Run and commit**

```bash
pnpm build
pnpm check:client-budget
pnpm test:architecture
pnpm test:e2e -- motion.spec.ts
git add -A
git commit -m "test: enforce native motion, security and client-JS budgets"
```

---

### Task 13: Align Playwright, Lighthouse, local gates, and Workers Builds promotion flow

**Files:**

- Modify: `playwright.config.ts`, `lighthouserc.json`, `.githooks/pre-commit`, `tests/architecture/local-gates.test.mjs`, `docs/QA_STRATEGY.md`, `README.md`

**Interfaces:**

- Produces: local canonical source gate + Cloudflare preview/production workflow without GitHub Actions.

- [ ] **Step 1: Update pre-commit contract**

Required local commands:

```text
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
```

Do not put full browser matrix/Lighthouse into every commit hook.

- [ ] **Step 2: Keep Playwright local/remote dual mode**

Retain `PLAYWRIGHT_BASE_URL`; local `webServer.command` remains `pnpm start`. Remove GitHub-specific reporter when no longer useful; retain list/html/junit outputs useful to agents.

- [ ] **Step 3: Update Lighthouse to the Astro preview server**

Keep three runs and at least:

```text
performance ≥0.90
accessibility ≥0.90
best-practices ≥0.90
SEO ≥0.90
CLS ≤0.05 lab
```

Set lab LCP budget from measured C1.1 baseline rather than blindly carrying a framework-era value; the field contract remains ≤2.5s p75.

- [ ] **Step 4: Configure Workers Builds in Cloudflare Git integration**

Production:

```text
repo: BlueSkyz-Labs/SGPS-Marketing
branch: main
command: pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget
preview branches: enabled
```

Preview builds may omit `validate:public-truth` when production-only domain/email variables are intentionally absent, but must still build and pass static gates. Do not re-create this pipeline in `.github/workflows`.

- [ ] **Step 5: Document promotion flow**

```text
feature branch → local source gate → PR → Cloudflare preview → Playwright/axe + Lighthouse + E4 review → merge main → production truth gate/build → post-deploy smoke
```

- [ ] **Step 6: Run full local gate and commit**

```bash
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
pnpm test:e2e
pnpm lighthouse
git add playwright.config.ts lighthouserc.json .githooks/pre-commit tests/architecture/local-gates.test.mjs docs/QA_STRATEGY.md README.md
git commit -m "chore: align QA with Cloudflare-native promotion"
```

---

### Task 14: Remove legacy runtime code, run E4 red team, and record launch readiness

**Files:**

- Delete obsolete: `src/app/**`, old React layout/section/ui/provider files, `src/lib/motion-features.ts`, stale legacy constants
- Modify: `package.json`, `pnpm-lock.yaml`, `tests/architecture/ui-inventory.test.mjs`
- Create: `docs/evidence/2026-09-04-e4-web-validation.md`, `docs/evidence/2026-09-04-launch-readiness.md`

**Interfaces:**

- Consumes: complete Astro replacement and deployed preview.
- Produces: clean runtime + explicit PASS/BLOCKED promotion evidence.

- [ ] **Step 1: Update inventory test before deletion**

Assert runtime source/dependencies contain none of:

```text
next
framer-motion
CustomCursor
MotionProvider
Cormorant_Garamond
Quiet luxury
digital atelier
Savile Row
#C9A962
```

Do not ban React generically if a future evidence-backed island exists; ban unused/global React assumptions.

- [ ] **Step 2: Delete superseded source only after replacement tests are green**

Use `git rm` for old Next app tree and superseded TSX components. Search imports for `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`; remove each package with zero surviving imports.

- [ ] **Step 3: Run the exact final automated gate and record candidate SHA**

```bash
pnpm install --frozen-lockfile
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
pnpm test:e2e
pnpm lighthouse
```

Record the exact git SHA and all results in `docs/evidence/2026-09-04-e4-web-validation.md`.

- [ ] **Step 4: Run browser/viewport E4 matrix**

Verify 320, 360, 390/393, 430, 1280, 1440, 1920 widths; 200% zoom; Chromium, Firefox, WebKit; reduced motion; keyboard-only. Record exact route/viewport/browser for every defect.

- [ ] **Step 5: Run the seven customer tasks**

```text
1. Five-second test: What does BlueSkyz do?
2. Find a relevant product.
3. Determine whether it is usable now.
4. Find help/support.
5. Find who is responsible for BlueSkyz.
6. Explain why the products belong together.
7. Identify anything exaggerated or fake.
```

Credibility/comprehension failures outrank visual preference.

- [ ] **Step 6: Run visual red team**

Record blur hierarchy, grayscale, no-Cobalt, no-logo, and competitor-logo substitution thought experiment. The site must retain hierarchy without effects and must not collapse into a generic premium-tech template.

- [ ] **Step 7: Record launch blockers precisely**

`docs/evidence/2026-09-04-launch-readiness.md` marks each item `PASS` or `BLOCKED` with evidence:

```text
canonical corporate domain supplied
no staging-domain metadata leakage
public product inventory/status reviewed
real public artifacts available for promoted products
all CTAs work
founder/company copy approved
privacy path factual/approved
support/contact works
security reporting works
unsupported claims = 0
critical broken links = 0
generated fake product proof = 0
```

Missing owner/external facts are `BLOCKED — owner/evidence dependency`; never manufacture a pass.

- [ ] **Step 8: Fix only evidence-backed defects, rerun affected gates, then run the full gate once more**

Each P0/P1 defect gets a small fix/test/commit. Do not redesign from aesthetic preference alone.

- [ ] **Step 9: Commit cleanup and E4 evidence**

```bash
git add -A
git commit -m "docs: converge BlueSkyz Web V1 and record E4 evidence"
```

Technical implementation may be complete while public promotion remains blocked on external truth. Report that distinction exactly.

---

## Plan Self-Review

### Spec coverage

- Customer mission/comprehension → Tasks 6, 8, 14.
- Homepage IA/order → Task 8.
- Visual tokens/R4d → Tasks 4–5.
- Product lifecycle/availability/evidence/CTA → Task 7.
- Product discovery/profiles → Task 9.
- Trust/privacy/security/support/founder → Task 10.
- SEO/canonical/entity data → Task 11.
- Native motion/reduced motion/accessibility → Tasks 6, 8, 12, 14.
- Performance/client-JS/CWV → Tasks 1, 12–14.
- Workers Static Assets/Builds; no required GitHub Actions → Tasks 3 and 13.
- Legacy experience removal → Task 14.
- External truth/public-promotion blockers → Tasks 10, 13, 14.
- Mandatory Astro-vs-Next gate → Task 1.

### Placeholder scan

The plan contains no value an executor is permitted to invent. Measurements are generated by Task 1 and copied verbatim into evidence/ADR. SGPS source revision is generated from `git ls-remote`. Domain/email/product/legal facts are either derived from evidence, omitted from public output, or cause the production-promotion gate to block.

### Interface consistency

- `SITE` lives only in `src/data/site.ts`.
- Product truth lives in `src/content.config.ts`; callers use `getPublicProducts()` / `getFlagshipProduct()`.
- Static output is consistently `dist/` across Astro, verification, Wrangler, Playwright, and budget tooling.
- Production truth env names are consistently `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_SECURITY_EMAIL`.
- Framework decision values are consistently `ASTRO_7` / `NEXT_16_3_STATIC`.

## Execution Gate

Task 1 is a hard stop gate. Tasks 2–14 are valid only when committed benchmark evidence selects `ASTRO_7`. A `NEXT_16_3_STATIC` decision ends this plan after Task 1 and requires a Next-specific replacement plan before migration work continues.
