# BlueSkyz Labs Web V1 C1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy BlueSkyz portfolio/atelier website with the C1.1 trust-forward product-house experience, using an evidence-gated frontier-stable stack and Cloudflare-native delivery.

**Architecture:** The preferred path is Astro 7 + Vite 8/Rolldown + Tailwind CSS 4, static HTML/CSS by default, Astro islands only when interaction earns client JavaScript, and a typed/evidence-aware Product Content Collection. A mandatory first task benchmarks Astro 7 against Next.js 16.3 static on the same representative C1.1 fixture; Tasks 2+ execute only if Astro meets the promotion criteria. Cloudflare Workers Static Assets hosts the generated `dist/` output and Cloudflare Workers Builds replaces GitHub Actions as the required remote build/deploy path.

**Tech Stack:** Astro 7 candidate; Vite 8/Rolldown; TypeScript 6 stable baseline; Node 24 LTS; pnpm 11; Tailwind CSS 4 via `@tailwindcss/vite`; Astro Content Collections + `astro/zod`; Node native tests; Playwright + axe; Lighthouse CI; Cloudflare Workers Static Assets / Workers Builds.

**Spec:** `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`

## Global Constraints

- C1.1 is canonical: **Porcelain-first, Trust-forward Hybrid Product House**.
- Brand flow: **Brand gives meaning → Products give proof → Shared principles create coherence → Trust removes doubt → Action continues the relationship.**
- Masterbrand primitives: Ink `#0B1020`, Porcelain `#F7F8FA`, Cobalt `#2568FF`; Cobalt signals rather than floods.
- Gold/champagne, Cormorant-led typography, digital-atelier/Savile-Row language, custom cursor, decorative parallax, agency-style contact copy, and legacy Work/Manifesto/Process semantics are superseded.
- WCAG 2.2 AA is the launch baseline; primary touch targets generally target ≥44×44 CSS px; keyboard and reduced-motion paths are first-class.
- Field goals: LCP ≤2.5s p75, INP ≤200ms p75, CLS ≤0.1 p75; internal CLS ambition ≤0.05.
- Initial client JavaScript must remain below the legacy hard ceiling of 120 kB and should be near-zero by default if Astro wins.
- Product lifecycle, availability, CTA, evidence, and public visibility are modeled truth. Unsupported claims are **Do not publish**, never filler.
- Generated product mockups must not masquerade as runtime product evidence.
- Do not invent canonical domain, corporate email, product status, screenshots, legal wording, social proof, certifications, user counts, or founder/company claims.
- `BlueSkyz Labs` is the public masterbrand; preferred product endorsement is `A BlueSkyz Labs product`.
- The R4d v1.1 SGPS reference set remains a candidate/evidence source and does not imply trademark clearance or promoted E5/E6 recognition.
- Prefer browser-native capabilities before libraries: CSS, View Transitions, Container Queries, native Dialog/Popover where appropriate.
- No CMS, database, KV, D1, R2, Durable Objects, Workers AI, runtime API, or full-stack framework runtime in V1 unless a later approved requirement earns it.
- Node 24 LTS remains the runtime/tooling baseline.
- pnpm 11 is the target supported package-manager line; pin the exact resolved 11.x version in `packageManager` and the lockfile during Task 2.
- TypeScript 6 is the production baseline for this plan. TypeScript 7 remains a separate PILOT and must not be mixed into the migration unless ecosystem/tooling compatibility is separately proven.
- GitHub remains source control + PR/review. GitHub Actions must not be a required execution dependency after migration.
- Cloudflare Workers Static Assets + Workers Builds are the target remote delivery path.
- Production promotion is blocked until canonical corporate domain, truthful public product inventory/status, real public product artifacts, approved privacy/support/security destinations, and approved founder/company wording exist.
- Work on an isolated worktree at execution time; do not implement directly in the primary working tree.

---

## File Structure Target

The Astro path should converge toward the following responsibilities. Do not create empty directories solely to match this tree.

```text
.
├── astro.config.mjs                 # Astro + Tailwind/Vite build contract
├── eslint.config.mjs                # Supported flat lint config for Astro/TS
├── package.json                     # exact toolchain, scripts, dependencies
├── pnpm-lock.yaml                   # authoritative resolved graph
├── tsconfig.json                    # strict TS + Astro env
├── wrangler.toml                    # Workers Static Assets contract
├── public/
│   ├── _headers                     # static security/cache headers
│   ├── brand/blueskyz/r4d/          # approved public R4d projection + manifest
│   ├── products/                    # verified public screenshots/artwork only
│   └── social/                      # verified OG/social assets
├── src/
│   ├── content.config.ts            # Product Content Collection schema
│   ├── content/products/            # one evidence-backed YAML/JSON entry per public product
│   ├── data/site.ts                 # public site config + environment truth helpers
│   ├── layouts/BaseLayout.astro     # document shell, metadata, skip link, header/footer
│   ├── components/
│   │   ├── brand/                   # R4d usage primitives
│   │   ├── layout/                  # Header/Footer/Container
│   │   ├── product/                 # ProductCard/Status/ProductProof
│   │   ├── sections/                # homepage narrative sections
│   │   └── ui/                      # Button/Link/Section/Reveal primitives
│   ├── lib/
│   │   ├── products.ts              # collection queries + editorial ordering
│   │   ├── seo.ts                   # metadata/JSON-LD helpers
│   │   └── truth.ts                 # production-promotion truth validation
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
│   └── styles/global.css            # Tailwind import + brand/semantic tokens + global rules
├── scripts/
│   ├── verify-static-export.mjs     # framework-neutral dist validation
│   ├── check-client-budget.mjs      # generated-client-JS budget gate
│   └── validate-public-truth.mjs    # production-promotion truth gate
├── tests/
│   ├── architecture/                # source/deploy/security/truth contracts
│   └── e2e/                         # customer behavior + a11y/browser contracts
└── docs/evidence/                   # framework decision + E4 evidence
```

---

### Task 1: Run the mandatory Astro 7 vs Next 16.3 framework benchmark and lock the decision

**Files:**
- Create temporarily, do not commit: `.tmp/framework-benchmark/astro/`
- Create temporarily, do not commit: `.tmp/framework-benchmark/next/`
- Create: `docs/evidence/2026-09-04-framework-benchmark.md`
- Create: `docs/decisions/0004-web-framework-selection.md`
- Create: `tests/architecture/framework-decision.test.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: approved design spec and R4d reference assets from `BlueSkyz-Labs/sgps-core/standards/experience/brand/assets/blueskyz/r4d-v1.1/`.
- Produces: a committed framework decision `ASTRO_7` or `NEXT_16_3_STATIC` with comparable measurements and a hard execution branch for the remaining tasks.

- [ ] **Step 1: Write the failing architecture test for a complete framework decision record**

Create `tests/architecture/framework-decision.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const decisionPath = "docs/decisions/0004-web-framework-selection.md";

test("framework selection is evidence-backed and executable", () => {
  const decision = readFileSync(decisionPath, "utf8");
  assert.match(decision, /Decision:\s+(ASTRO_7|NEXT_16_3_STATIC)/);
  for (const required of [
    "Cold build median",
    "Warm build median",
    "Initial compressed JavaScript",
    "Critical asset bytes",
    "Lighthouse performance",
    "Accessibility parity",
    "Cloudflare preview",
    "Migration effort",
  ]) {
    assert.match(decision, new RegExp(required));
  }
  assert.doesNotMatch(decision, /TBD|TODO|placeholder/i);
});
```

- [ ] **Step 2: Run the test and verify it fails because the decision file does not exist**

Run:

```bash
node --test tests/architecture/framework-decision.test.mjs
```

Expected: FAIL with `ENOENT` for `docs/decisions/0004-web-framework-selection.md`.

- [ ] **Step 3: Add benchmark scratch output to `.gitignore`**

Append exactly:

```gitignore
# one-time framework benchmark fixtures
.tmp/framework-benchmark/
```

- [ ] **Step 4: Create equivalent Astro and Next fixtures**

Both fixtures must contain the same content and visual workload:

```text
Hero
- BlueSkyz Labs
- We build products that make complex things feel naturally clear.
- Explore products
- About BlueSkyz
- same copied R4d symbol SVG

Product grid
- one large flagship card
- two secondary cards
- two ecosystem cards
- status text and CTA text

Styles
- Ink / Porcelain / Cobalt
- identical responsive grid
- identical typography fallback stack
- no animation library
- no remote fonts
```

Astro fixture requirements:

```text
Astro 7
Vite 8/Rolldown as supplied by Astro 7
Tailwind CSS 4 via @tailwindcss/vite
no React integration
no client directives
```

Next fixture requirements:

```text
Next.js 16.3
React 19.2
App Router
output: "export"
Tailwind CSS 4
server/static components only
no "use client"
```

Do not port legacy Framer Motion, Radix, custom cursor, contact form, or old sections into either fixture.

- [ ] **Step 5: Build both fixtures five cold and five warm times**

Use the same machine, Node 24 LTS, pnpm 11, and no unrelated workloads. Record raw times and calculate medians. A cold run must remove framework build cache/output before the run; a warm run keeps build cache but rebuilds the unchanged fixture.

Example capture shape in the evidence document:

```markdown
| Metric | Astro 7 | Next 16.3 static |
|---|---:|---:|
| Cold build runs (s) |  |  |
| Cold build median (s) |  |  |
| Warm build runs (s) |  |  |
| Warm build median (s) |  |  |
| HTML bytes |  |  |
| CSS bytes |  |  |
| Initial compressed JavaScript bytes |  |  |
| Critical asset bytes |  |  |
| Lighthouse performance median |  |  |
| Lighthouse accessibility median |  |  |
```

Do not fill this table from vendor benchmarks. Only local measurements count.

- [ ] **Step 6: Run functional/a11y parity on both fixtures**

For each fixture, verify with Playwright or equivalent browser checks:

```text
- H1 is visible without JavaScript-dependent reveal
- Explore products is keyboard reachable
- all five product cards expose name, status, and action text
- 320px viewport has no horizontal overflow
- reduced-motion mode does not hide content
- axe reports no critical/serious violations on the fixture
```

Record PASS/FAIL per item.

- [ ] **Step 7: Deploy each fixture as a temporary Cloudflare preview and record result**

Expected evidence per candidate:

```text
preview build: PASS/FAIL
asset routing: PASS/FAIL
404 behavior: PASS/FAIL
security headers observable: PASS/FAIL
```

Delete preview projects after evidence is captured if they are one-time benchmark projects.

- [ ] **Step 8: Apply the spec promotion gate without subjective weighting**

Astro may win only if all are true:

```text
1. no customer-experience regression;
2. accessibility and SEO parity or improvement;
3. clean Cloudflare deployment;
4. browser/QA contracts are portable;
5. materially lower initial JS and/or meaningful implementation complexity reduction;
6. migration effort remains bounded and does not jeopardize C1.1 delivery.
```

If Astro does not satisfy all six, decision is `NEXT_16_3_STATIC`.

- [ ] **Step 9: Write the evidence and decision records**

`docs/decisions/0004-web-framework-selection.md` must use this exact skeleton with real measured values:

```markdown
# ADR 0004 — BlueSkyz Web V1 Framework Selection

Decision: ASTRO_7
Date: 2026-09-04
Spec: docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md
Evidence: docs/evidence/2026-09-04-framework-benchmark.md

Cold build median: <measured value copied from evidence>
Warm build median: <measured value copied from evidence>
Initial compressed JavaScript: <measured value copied from evidence>
Critical asset bytes: <measured value copied from evidence>
Lighthouse performance: <measured value copied from evidence>
Accessibility parity: PASS
Cloudflare preview: PASS
Migration effort: BOUNDED

Rationale: <one concise evidence-based paragraph>
Rollback: If the Astro migration later violates the promotion criteria before public launch, revert the migration PR and execute a Next 16.3 static replacement plan from the same canonical spec.
```

Replace `Decision: ASTRO_7` with `Decision: NEXT_16_3_STATIC` if Next wins. Angle-bracketed lines above describe values to copy from measured evidence; do not commit angle brackets or placeholder text.

- [ ] **Step 10: Remove the throwaway fixtures**

Run:

```bash
rm -rf .tmp/framework-benchmark
```

Confirm only evidence, ADR, test, and `.gitignore` changes remain.

- [ ] **Step 11: Run the architecture test**

```bash
node --test tests/architecture/framework-decision.test.mjs
```

Expected: PASS.

- [ ] **Step 12: Commit the framework decision**

```bash
git add .gitignore docs/evidence/2026-09-04-framework-benchmark.md docs/decisions/0004-web-framework-selection.md tests/architecture/framework-decision.test.mjs
git commit -m "docs: lock evidence-backed web framework decision"
```

**Execution branch:** If the ADR says `ASTRO_7`, continue to Task 2. If it says `NEXT_16_3_STATIC`, STOP. Do not execute Tasks 2–16; create a replacement Next-specific implementation plan from the same spec and the committed benchmark evidence.

---

### Task 2: Migrate the build/tooling foundation to Astro 7 without changing customer content yet

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`
- Modify: `eslint.config.mjs`
- Create: `src/env.d.ts`
- Create: `src/styles/global.css`
- Create: `tests/architecture/astro-toolchain.test.mjs`
- Delete after replacement is verified: `next.config.ts`
- Delete after replacement is verified: `postcss.config.mjs`
- Delete after replacement is verified: `tailwind.config.ts`

**Interfaces:**
- Consumes: `Decision: ASTRO_7` from ADR 0004.
- Produces: an Astro 7 project that installs, typechecks, lints, builds, and preserves strict TypeScript discipline without yet porting legacy experience semantics.

- [ ] **Step 1: Write a failing toolchain contract test**

Create `tests/architecture/astro-toolchain.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const astro = readFileSync("astro.config.mjs", "utf8");
const tsconfig = readFileSync("tsconfig.json", "utf8");

test("V1 uses Astro static + Tailwind Vite with no Next runtime dependency", () => {
  assert.match(pkg.dependencies.astro, /^\^?7\./);
  assert.equal(pkg.dependencies.next, undefined);
  assert.equal(pkg.dependencies["framer-motion"], undefined);
  assert.match(pkg.devDependencies["@tailwindcss/vite"], /./);
  assert.match(astro, /@tailwindcss\/vite/);
  assert.match(astro, /output:\s*["']static["']/);
  assert.match(tsconfig, /astro\/tsconfigs\/strict/);
});
```

- [ ] **Step 2: Run the new test and verify it fails against the Next project**

```bash
node --test tests/architecture/astro-toolchain.test.mjs
```

Expected: FAIL because `astro.config.mjs` and Astro dependencies do not exist.

- [ ] **Step 3: Pin pnpm 11 and replace the framework dependency set**

Run from Node 24 LTS:

```bash
corepack enable
corepack use pnpm@11
pnpm remove next framer-motion @radix-ui/react-dialog @radix-ui/react-slot
pnpm add astro@^7
pnpm add -D @astrojs/check @tailwindcss/vite tailwindcss eslint eslint-plugin-astro typescript prettier @playwright/test @axe-core/playwright @lhci/cli
```

Do not add React integration in this task. Preserve `class-variance-authority`, `clsx`, `tailwind-merge`, or `lucide-react` only if a later task proves a surviving use; otherwise remove them during Task 15 cleanup.

- [ ] **Step 4: Replace framework scripts in `package.json`**

Target script contract:

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

Keep `packageManager` at the exact pnpm 11.x version produced by `corepack use`.

- [ ] **Step 5: Create Astro + Tailwind Vite configuration**

Create `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 6: Replace `tsconfig.json` with strict Astro inheritance**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Create `src/env.d.ts`:

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 7: Create the minimal Tailwind v4 global stylesheet**

`src/styles/global.css` initially:

```css
@import "tailwindcss";

:root {
  color-scheme: light;
}

html {
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
}
```

Design tokens are added in Task 5, not here.

- [ ] **Step 8: Replace ESLint Next compatibility with a supported Astro flat config**

Use the current versions installed in Step 3 and configure:

```js
import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "playwright-report/**", "test-results/**"],
  },
  eslint.configs.recommended,
  ...astro.configs.recommended,
];
```

If the installed `eslint-plugin-astro` exports the recommended flat config under a version-specific key, use the documented current flat-config export while preserving the exact two behaviors above: Astro files are linted and generated output is ignored. Do not retain `FlatCompat` or `next/*` configs.

- [ ] **Step 9: Add a minimal Astro page so build validation is meaningful**

Create temporary `src/pages/index.astro`:

```astro
---
import "@/styles/global.css";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>BlueSkyz Labs</title>
  </head>
  <body>
    <main id="main-content"><h1>BlueSkyz Labs</h1></main>
  </body>
</html>
```

This is a migration scaffold only and is replaced by the real layout/homepage in Tasks 6–7.

- [ ] **Step 10: Run install/type/lint/build gates**

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
node --test tests/architecture/astro-toolchain.test.mjs
```

Expected: all PASS.

- [ ] **Step 11: Remove obsolete Next-only config after the Astro build passes**

```bash
rm next.config.ts postcss.config.mjs tailwind.config.ts
```

Run `pnpm build` again. Expected: PASS.

- [ ] **Step 12: Commit the isolated framework/toolchain migration**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json eslint.config.mjs src/env.d.ts src/styles/global.css src/pages/index.astro tests/architecture/astro-toolchain.test.mjs
git rm next.config.ts postcss.config.mjs tailwind.config.ts
git commit -m "build: migrate BlueSkyz web foundation to Astro 7"
```

---

### Task 3: Replace Cloudflare Pages/GitHub Actions delivery assumptions with Workers Static Assets

**Files:**
- Modify: `wrangler.toml`
- Modify: `public/_headers`
- Modify: `scripts/verify-static-export.mjs`
- Create: `tests/architecture/cloudflare-workers.test.mjs`
- Delete: `tests/architecture/cloudflare-pages.test.mjs`
- Delete: `tests/architecture/github-actions-runtime.test.mjs`
- Delete: `.github/workflows/qa.yml`
- Modify: `README.md` only for deployment/tooling facts touched by this task

**Interfaces:**
- Consumes: Astro build output `dist/`.
- Produces: static Workers deployment contract and no required GitHub Actions execution path.

- [ ] **Step 1: Write the new Workers deployment contract test**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const wrangler = readFileSync("wrangler.toml", "utf8");
const headers = readFileSync("public/_headers", "utf8");

test("Cloudflare deploys Astro dist as Workers Static Assets", () => {
  assert.match(wrangler, /\[assets\]/);
  assert.match(wrangler, /directory\s*=\s*["']\.\/dist\/?["']/);
  assert.match(wrangler, /not_found_handling\s*=\s*["']404-page["']/);
  assert.match(wrangler, /html_handling\s*=\s*["']auto-trailing-slash["']/);
  assert.doesNotMatch(wrangler, /pages_build_output_dir/);
  assert.equal(existsSync(".github/workflows/qa.yml"), false);
});

test("static security headers remain explicit", () => {
  for (const value of [
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Permissions-Policy: camera=(), microphone=(), geolocation=()",
  ]) assert.match(headers, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});
```

Save as `tests/architecture/cloudflare-workers.test.mjs`.

- [ ] **Step 2: Run the test and verify it fails against the Pages config**

```bash
node --test tests/architecture/cloudflare-workers.test.mjs
```

Expected: FAIL on missing `[assets]` and existing workflow.

- [ ] **Step 3: Replace `wrangler.toml` Pages config**

Use:

```toml
name = "blueskyz-web"
compatibility_date = "2026-09-04"

[assets]
directory = "./dist"
not_found_handling = "404-page"
html_handling = "auto-trailing-slash"
```

Do not add `main`, bindings, D1, KV, or Worker runtime code.

- [ ] **Step 4: Make static export verification framework-neutral**

Replace `scripts/verify-static-export.mjs` so it validates the expected Astro output:

```js
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";

for (const file of ["dist/index.html", "dist/404.html"]) {
  assert.ok(existsSync(file), `${file} must exist`);
  assert.ok(statSync(file).size > 0, `${file} must not be empty`);
}

console.log("Static export verified: dist/index.html + dist/404.html");
```

The 404 check will become green after Task 6 creates `src/pages/404.astro`; until then create a minimal `src/pages/404.astro` with a plain heading and home link.

- [ ] **Step 5: Preserve and tighten `public/_headers`**

Keep existing safe headers and ensure the root rule contains at least:

```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Do not add a CSP until Task 13 knows the final fonts/scripts/analytics sources; a wrong CSP is not security.

- [ ] **Step 6: Remove required GitHub Actions files/tests**

```bash
git rm .github/workflows/qa.yml tests/architecture/cloudflare-pages.test.mjs tests/architecture/github-actions-runtime.test.mjs
```

Keep `.github/CODEOWNERS` and Dependabot unless a later task deliberately replaces them.

- [ ] **Step 7: Run architecture/build gates**

```bash
pnpm build
node --test tests/architecture/cloudflare-workers.test.mjs
pnpm test:architecture
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add wrangler.toml public/_headers scripts/verify-static-export.mjs src/pages/404.astro tests/architecture/cloudflare-workers.test.mjs README.md
git commit -m "build: move delivery contract to Workers Static Assets"
```

---

### Task 4: Project the approved R4d reference assets into the public website with provenance

**Files:**
- Create: `public/brand/blueskyz/r4d/symbol_mono_ink.svg`
- Create: `public/brand/blueskyz/r4d/micro_mark_ink.svg`
- Create: `public/brand/blueskyz/r4d/brand_tokens.json`
- Create: `public/brand/blueskyz/r4d/brand-manifest.json`
- Create: `tests/architecture/brand-provenance.test.mjs`
- Delete/replace if stale: `scripts/generate-brand-assets.py`

**Interfaces:**
- Consumes: SGPS source record `standards/experience/brand/BLUESKYZ_MASTERBRAND_CANDIDATE.json` and reference directory `standards/experience/brand/assets/blueskyz/r4d-v1.1/`.
- Produces: a deterministic public asset projection that explicitly records candidate status and source revision.

- [ ] **Step 1: Write the failing provenance test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const manifest = JSON.parse(readFileSync("public/brand/blueskyz/r4d/brand-manifest.json", "utf8"));

test("R4d public projection preserves SGPS candidate provenance", () => {
  assert.equal(manifest.assetId, "BLUESKYZ-MASTERBRAND-R4D");
  assert.equal(manifest.assetVersion, "1.1.0");
  assert.equal(manifest.canonicalName, "BlueSkyz Labs");
  assert.equal(manifest.status, "IDENTITY_PROTOTYPE_READY");
  assert.equal(manifest.designState, "DESIGN_FREEZE_CANDIDATE");
  assert.match(manifest.sourceRevision, /^[0-9a-f]{40}$/);
  assert.equal(manifest.runtimeFontDependencyForWordmark, "NONE_VECTOR_OUTLINES");
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node --test tests/architecture/brand-provenance.test.mjs
```

Expected: FAIL because the public manifest does not exist.

- [ ] **Step 3: Fetch the SGPS reference source at one exact commit**

Resolve the current `sgps-core` main commit once. Copy the two SVGs and `brand_tokens.json` from that exact revision, not from moving `main` across separate commands:

```text
standards/experience/brand/assets/blueskyz/r4d-v1.1/symbol_mono_ink.svg
standards/experience/brand/assets/blueskyz/r4d-v1.1/micro_mark_ink.svg
standards/experience/brand/assets/blueskyz/r4d-v1.1/brand_tokens.json
```

Read candidate fields from:

```text
standards/experience/brand/BLUESKYZ_MASTERBRAND_CANDIDATE.json
```

Do not redraw, simplify, trace, or reinterpret the symbol.

- [ ] **Step 4: Write `brand-manifest.json` from source truth**

Required shape:

```json
{
  "assetId": "BLUESKYZ-MASTERBRAND-R4D",
  "assetVersion": "1.1.0",
  "canonicalName": "BlueSkyz Labs",
  "status": "IDENTITY_PROTOTYPE_READY",
  "designState": "DESIGN_FREEZE_CANDIDATE",
  "sourceRepository": "BlueSkyz-Labs/sgps-core",
  "sourcePath": "standards/experience/brand/assets/blueskyz/r4d-v1.1/",
  "sourceRevision": "40-char commit captured in Step 3",
  "runtimeFontDependencyForWordmark": "NONE_VECTOR_OUTLINES"
}
```

The `sourceRevision` value must be the actual resolved SHA, not the explanatory text shown above.

- [ ] **Step 5: Define lockup fallback behavior**

Until an approved full outlined wordmark/lockup asset with matching provenance is available in source control, Header/Footer must render the exact R4d symbol plus live text `BlueSkyz Labs`. Do not synthesize a new vector wordmark or use an AI-redrawn asset. When an approved full lockup is later imported, it must receive the same provenance treatment.

- [ ] **Step 6: Remove legacy generated-brand code if it can produce a different mark**

If `scripts/generate-brand-assets.py` generates a legacy or non-R4d symbol, delete it. If it is still needed for a verified R4d derivative, rewrite it to consume the committed reference asset rather than reconstructing geometry from memory.

- [ ] **Step 7: Run provenance + architecture tests**

```bash
node --test tests/architecture/brand-provenance.test.mjs
pnpm test:architecture
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add public/brand/blueskyz/r4d tests/architecture/brand-provenance.test.mjs
git add -u scripts/generate-brand-assets.py
git commit -m "feat: project R4d brand assets with SGPS provenance"
```

---

### Task 5: Build the semantic token and typography foundation

**Files:**
- Modify: `src/styles/global.css`
- Create: `tests/architecture/c1-tokens.test.mjs`
- Create when approved: `public/fonts/<approved-ui-font-files>`

**Interfaces:**
- Consumes: R4d primitives and the final approved UI font when available.
- Produces: semantic CSS tokens used by all later components; no component reads raw marketing-era gold tokens.

- [ ] **Step 1: Write a failing token contract test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync("src/styles/global.css", "utf8");

test("C1.1 semantic tokens use R4d primitives without legacy gold", () => {
  for (const token of [
    "--brand-ink: #0b1020",
    "--brand-porcelain: #f7f8fa",
    "--brand-cobalt: #2568ff",
    "--surface-primary",
    "--surface-inverse",
    "--text-primary",
    "--text-muted",
    "--action-primary",
    "--focus-ring",
  ]) assert.match(css.toLowerCase(), new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(css, /#c9a962|champagne|gold/i);
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node --test tests/architecture/c1-tokens.test.mjs
```

- [ ] **Step 3: Add brand primitives and semantic aliases**

Add to `src/styles/global.css`:

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
```

`--action-primary` is intentionally a semantic accessible action token rather than assuming raw Cobalt is valid for every text/control context.

- [ ] **Step 4: Add global accessibility/typography defaults**

```css
html {
  background: var(--surface-primary);
  color: var(--text-primary);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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

::selection {
  background: color-mix(in srgb, var(--brand-cobalt) 22%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Gate the production font instead of guessing it**

Do not download or commit a font merely because Inter is the current candidate. Before production promotion, test the chosen font with Vietnamese specimen text containing `ă â ê ô ơ ư đ` and tone-mark combinations, mobile rendering, file size, license, and fallbacks. Until that evidence exists, the system stack above is valid for implementation and E4 preview.

- [ ] **Step 6: Run tests**

```bash
node --test tests/architecture/c1-tokens.test.mjs
pnpm build
```

- [ ] **Step 7: Commit**

```bash
git add src/styles/global.css tests/architecture/c1-tokens.test.mjs
git commit -m "feat: establish C1.1 semantic visual tokens"
```

---

### Task 6: Build the base document shell, semantic navigation, footer, and truthful site configuration

**Files:**
- Create: `src/data/site.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/layout/Container.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/components/ui/ButtonLink.astro`
- Replace: `src/pages/404.astro`
- Create: `tests/e2e/shell.spec.ts`

**Interfaces:**
- Consumes: semantic tokens, R4d public assets.
- Produces: reusable page shell and `SITE` config for all routes.

- [ ] **Step 1: Write failing shell browser tests**

Create `tests/e2e/shell.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

for (const path of ["/", "/404-does-not-exist/"]) {
  test(`shell is accessible at ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeAttached();
    await expect(page.getByRole("link", { name: /BlueSkyz Labs.*Home/i })).toBeVisible();
  });
}

test("primary navigation is small and product-led", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: /primary/i });
  await expect(nav.getByRole("link", { name: "Products" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(nav.getByText(/Work|Process|Manifesto/)).toHaveCount(0);
});
```

- [ ] **Step 2: Run the shell tests and verify they fail**

```bash
pnpm build
pnpm test:e2e -- shell.spec.ts
```

Expected: FAIL because the new shell does not exist.

- [ ] **Step 3: Create environment-safe site config**

`src/data/site.ts`:

```ts
const localFallback = "http://localhost:4321";

export const SITE = {
  name: "BlueSkyz Labs",
  proposition: "We build products that make complex things feel naturally clear.",
  url: import.meta.env.PUBLIC_SITE_URL?.trim() || localFallback,
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || null,
  securityEmail: import.meta.env.PUBLIC_SECURITY_EMAIL?.trim() || null,
} as const;
```

Do not put `blueskyz.io`, `portfolio.tonydemo.com`, or any other guessed production domain into source defaults.

- [ ] **Step 4: Create semantic Container and ButtonLink primitives**

`Container.astro` must provide a centered max-width wrapper with responsive 20–24px mobile gutters and larger desktop gutters. `ButtonLink.astro` must render an `<a>` with at least a 44px minimum interactive height and preserve visible focus.

- [ ] **Step 5: Build Header with zero client framework JS**

Use an accessible semantic header/nav. For V1 mobile, prefer a simple `<details>` menu or native dialog only if required; do not add React/Radix. The visible navigation labels are exactly Products / About / Contact. The home link renders the exact R4d symbol and text `BlueSkyz Labs` unless an approved full lockup asset exists.

- [ ] **Step 6: Build Footer with only real destinations**

Always show Products / About / Contact / Support / Privacy / Security. Only render external social links if verified configuration exists; do not render empty GitHub/LinkedIn icons.

- [ ] **Step 7: Build `BaseLayout.astro`**

Required shell shape:

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
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <Header />
    <main id="main-content"><slot /></main>
    <Footer />
  </body>
</html>
```

SEO/canonical/JSON-LD enrichment is added in Task 11.

- [ ] **Step 8: Replace 404 page with a restrained known-state error**

Content:

```text
Page not found.
The page may have moved or no longer exist.
Go home
Explore products
```

No creative animation requirement.

- [ ] **Step 9: Run browser/build tests**

```bash
pnpm build
pnpm test:e2e -- shell.spec.ts
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add src/data/site.ts src/layouts src/components/layout src/components/ui/ButtonLink.astro src/pages/404.astro tests/e2e/shell.spec.ts
git commit -m "feat: add accessible BlueSkyz site shell"
```

---

### Task 7: Create the evidence-aware Public Product Collection and query helpers

**Files:**
- Create: `src/content.config.ts`
- Create as evidence permits: `src/content/products/*.yaml`
- Create: `src/lib/products.ts`
- Create: `docs/evidence/2026-09-04-public-product-audit.md`
- Create: `tests/architecture/product-truth.test.mjs`

**Interfaces:**
- Consumes: candidate product repositories and public artifacts.
- Produces: validated `products` collection plus `getPublicProducts()` and `getFlagshipProduct()`.

- [ ] **Step 1: Write the source-level truth contract test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync("src/content.config.ts", "utf8");

test("product collection models lifecycle, availability, evidence, and actions", () => {
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
  ]) assert.match(config, new RegExp(field));
  assert.match(config, /A BlueSkyz Labs product/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node --test tests/architecture/product-truth.test.mjs
```

- [ ] **Step 3: Define the Astro Content Collection**

Create `src/content.config.ts` using Astro 7 build-time content collections:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lifecycle = z.enum(["concept", "prototype", "development", "beta", "active", "maintenance", "sunset", "archived"]);
const availability = z.enum(["private", "waitlist", "preview", "public", "invite-only", "unavailable"]);
const publicLabel = z.enum(["Preview", "In development", "Beta", "Available", "Sunsetting", "Archived"]);
const platform = z.enum(["web", "android", "ios", "macos", "windows", "api"]);
const audience = z.enum(["individual", "professional", "team", "business", "organization"]);
const actionType = z.enum(["open", "try", "explore", "preview", "waitlist", "get-started", "github", "contact"]);

const action = z.object({
  type: actionType,
  label: z.string().min(1).max(40),
  href: z.string().url(),
});

const productSchema = z.object({
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
  proof: z.object({
    screenshot: z.string().optional(),
    publicUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    documentationUrl: z.string().url().optional(),
    privacyUrl: z.string().url().optional(),
    securityUrl: z.string().url().optional(),
    supportUrl: z.string().url().optional(),
  }).refine((value) => Object.values(value).some(Boolean), "public product requires at least one proof artifact"),
  endorsement: z.literal("A BlueSkyz Labs product"),
  featuredTier: z.enum(["hero", "featured", "ecosystem", "hidden"]),
  displayOrder: z.number().int().nonnegative(),
  public: z.boolean(),
  sourceRevision: z.string().regex(/^[0-9a-f]{7,40}$/),
  lastReviewedAt: z.coerce.date(),
}).superRefine((value, ctx) => {
  if (value.lifecycle === "development" && value.primaryAction.type === "try") {
    ctx.addIssue({ code: "custom", path: ["primaryAction", "type"], message: "development product cannot claim Try without matching availability truth" });
  }
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml,json}", base: "./src/content/products" }),
  schema: productSchema,
});

export const collections = { products };
```

- [ ] **Step 4: Audit each candidate product before creating public data**

For ApexAgent, Sổ Tâm, Sổ Trọ, FluentArc, and Vững Tay Lái, inspect current repository/release/public runtime evidence. Record in `docs/evidence/2026-09-04-public-product-audit.md`:

```text
product
source repo + exact revision
customer job supported by repo/product truth
lifecycle evidence
availability evidence
public URL evidence
real screenshot/artifact evidence
privacy path
security path when applicable
support path
promotion decision: PUBLIC / HIDDEN
reason
```

Rules:

```text
- No evidence -> do not infer.
- No proof artifact -> HIDDEN.
- Development-only product may be public only with truthful Preview/In development presentation and matching CTA.
- Never make all five public merely to fill the layout.
```

- [ ] **Step 5: Create collection entries only for products passing the audit**

Each YAML file must contain real values supported by the audit. Do not create files with fake URLs, lorem ipsum, placeholder screenshots, or invented statuses. A hidden product may be omitted entirely; if retained for future editorial work, set `public: false` and `featuredTier: hidden` with no route generation.

- [ ] **Step 6: Create query helpers**

`src/lib/products.ts`:

```ts
import { getCollection } from "astro:content";

export async function getPublicProducts() {
  const products = await getCollection("products", ({ data }) => data.public);
  return products.sort((a, b) => a.data.displayOrder - b.data.displayOrder);
}

export async function getFlagshipProduct() {
  const products = await getPublicProducts();
  return products.find((product) => product.data.featuredTier === "hero") ?? null;
}
```

- [ ] **Step 7: Build to force schema validation**

```bash
pnpm typecheck
pnpm build
node --test tests/architecture/product-truth.test.mjs
```

Expected: PASS. Any invalid product content must fail the build.

- [ ] **Step 8: Commit**

```bash
git add src/content.config.ts src/content/products src/lib/products.ts docs/evidence/2026-09-04-public-product-audit.md tests/architecture/product-truth.test.mjs
git commit -m "feat: add evidence-aware public product registry"
```

---

### Task 8: Build the C1.1 homepage narrative with real product data and no brand theatre

**Files:**
- Create: `src/components/sections/Hero.astro`
- Create: `src/components/sections/FeaturedProducts.astro`
- Create: `src/components/sections/OneHouse.astro`
- Create: `src/components/sections/FlagshipProof.astro`
- Create: `src/components/sections/Trust.astro`
- Create: `src/components/sections/AboutBlueSkyz.astro`
- Create: `src/components/sections/NextStep.astro`
- Create: `src/components/product/ProductCard.astro`
- Create: `src/components/product/ProductStatus.astro`
- Replace: `src/pages/index.astro`
- Create: `tests/e2e/home-c1.spec.ts`

**Interfaces:**
- Consumes: `getPublicProducts()`, `getFlagshipProduct()`, R4d assets, site shell.
- Produces: canonical C1.1 homepage.

- [ ] **Step 1: Write failing customer-journey browser tests**

`tests/e2e/home-c1.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

 test("homepage explains BlueSkyz before brand theatre", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/build products.*complex.*clear/i);
  await expect(page.getByRole("link", { name: /Explore products/i })).toBeVisible();
  await expect(page.getByText(/Quiet luxury|digital atelier|Savile Row|Selected works/i)).toHaveCount(0);
});

test("products appear before house philosophy", async ({ page }) => {
  await page.goto("/");
  const products = page.locator("#products");
  const house = page.locator("#one-house");
  expect(await products.evaluate((el) => el.compareDocumentPosition(document.querySelector("#one-house")!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
  await expect(products.getByText(/Available|Beta|Preview|In development/).first()).toBeVisible();
});

test("homepage remains usable at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await expect(page.getByRole("link", { name: /Explore products/i }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run and verify failure**

```bash
pnpm build
pnpm test:e2e -- home-c1.spec.ts
```

- [ ] **Step 3: Implement Hero**

Required visible content:

```text
BlueSkyz Labs
We build products that make complex things feel naturally clear.
Thoughtful digital products shaped around real people, real decisions, and real-world use.
Explore products
About BlueSkyz
```

Render content immediately in HTML. R4d symbol may be visually prominent but cannot delay content. No splash, custom cursor, parallax, or Framer dependency.

- [ ] **Step 4: Implement FeaturedProducts from collection data**

Rules:

```text
hero tier -> one large editorial card
featured tier -> up to two secondary cards
ecosystem tier -> remaining selected public products
hidden/public=false -> never render
```

A ProductCard reads its public label and CTA from content data. It never derives `Available` from visual assumptions.

- [ ] **Step 5: Implement OneHouse**

Use plain customer language and the approved principle direction:

```text
We don’t build around one category. We build around a way of thinking.
Make complexity clearer.
Use intelligence with purpose.
Respect human agency.
Build for real-world use.
```

Do not expose SGPS/BPXS/VCDI terminology.

- [ ] **Step 6: Implement FlagshipProof with real evidence only**

If `getFlagshipProduct()` returns a product with a verified screenshot, render the screenshot and real capability/proof copy from approved product data. If no product satisfies flagship proof requirements, omit the entire section; do not fill it with generated art.

- [ ] **Step 7: Implement compact Trust/About/NextStep sections**

Trust links to real routes `/privacy/`, `/security/`, `/support/`. About uses factual copy and may show `Tony Nguyen — Founder & CEO` only because the owner approved that attribution in the design process. Do not add team-size/global-office claims.

- [ ] **Step 8: Compose the page in the canonical order**

```astro
<BaseLayout ...>
  <Hero />
  <FeaturedProducts products={products} />
  <OneHouse />
  {flagship && <FlagshipProof product={flagship} />}
  <Trust />
  <AboutBlueSkyz />
  <NextStep />
</BaseLayout>
```

- [ ] **Step 9: Run E2E/build/a11y smoke**

```bash
pnpm build
pnpm test:e2e -- home-c1.spec.ts
pnpm test:e2e -- accessibility.spec.ts
```

- [ ] **Step 10: Commit**

```bash
git add src/components/sections src/components/product src/pages/index.astro tests/e2e/home-c1.spec.ts
git commit -m "feat: build C1.1 product-house homepage"
```

---

### Task 9: Build product discovery and static product profile routes

**Files:**
- Create: `src/pages/products/index.astro`
- Create: `src/pages/products/[slug].astro`
- Create: `tests/e2e/products.spec.ts`

**Interfaces:**
- Consumes: public product collection/query helpers.
- Produces: `/products/` discovery and one static profile page per public product.

- [ ] **Step 1: Write failing route tests**

```ts
import { expect, test } from "@playwright/test";

 test("products index exposes truthful status and actions", async ({ page }) => {
  await page.goto("/products/");
  await expect(page.getByRole("heading", { level: 1, name: /Products/i })).toBeVisible();
  const cards = page.locator("[data-product-card]");
  expect(await cards.count()).toBeGreaterThan(0);
  await expect(cards.first().getByText(/Available|Beta|Preview|In development|Sunsetting|Archived/)).toBeVisible();
});
```

Add one generated product-profile assertion using the first public product URL discovered from `/products/` rather than hard-coding an unverified product slug.

- [ ] **Step 2: Run and verify failure**

```bash
pnpm build
pnpm test:e2e -- products.spec.ts
```

- [ ] **Step 3: Implement `/products/`**

No search/filter for the current small portfolio. Render a clear editorial list/grid ordered by `displayOrder`, preserving Product DNA through real product artwork while BlueSkyz controls layout/status/action semantics.

- [ ] **Step 4: Implement static `[slug]` routes**

Use:

```ts
export async function getStaticPaths() {
  const products = await getPublicProducts();
  return products.map((product) => ({ params: { slug: product.data.slug }, props: { product } }));
}
```

Each profile page must render:

```text
identity + short value
status / platform / action
proof artifact
customer job / core problem
verified capability/evidence content available in the registry
trust links that exist
A BlueSkyz Labs product
next action
```

Do not create feature prose not present in approved content.

- [ ] **Step 5: Run tests**

```bash
pnpm build
pnpm test:e2e -- products.spec.ts
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/products tests/e2e/products.spec.ts
git commit -m "feat: add product discovery and profile routes"
```

---

### Task 10: Add About, Contact, Support, Privacy, and Security trust routes with production truth gates

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/support.astro`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/security.astro`
- Create: `src/lib/truth.ts`
- Create: `scripts/validate-public-truth.mjs`
- Create: `tests/architecture/public-truth-gate.test.mjs`
- Create: `tests/e2e/trust-routes.spec.ts`

**Interfaces:**
- Consumes: `SITE` env-backed public identity and product support/privacy/security URLs.
- Produces: factual corporate trust surfaces and a hard production validation command.

- [ ] **Step 1: Write a failing public-truth gate test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const script = readFileSync("scripts/validate-public-truth.mjs", "utf8");

test("production truth gate requires external corporate facts instead of defaults", () => {
  for (const name of ["PUBLIC_SITE_URL", "PUBLIC_CONTACT_EMAIL", "PUBLIC_SECURITY_EMAIL"]) {
    assert.match(script, new RegExp(name));
  }
  assert.doesNotMatch(script, /portfolio\.tonydemo\.com/);
});
```

- [ ] **Step 2: Create `src/lib/truth.ts`**

Expose pure validation:

```ts
export interface PublicTruthInput {
  siteUrl?: string;
  contactEmail?: string;
  securityEmail?: string;
}

export function validatePublicTruth(input: PublicTruthInput): string[] {
  const errors: string[] = [];
  if (!input.siteUrl?.startsWith("https://")) errors.push("PUBLIC_SITE_URL must be an https URL");
  if (!input.contactEmail?.includes("@")) errors.push("PUBLIC_CONTACT_EMAIL is required");
  if (!input.securityEmail?.includes("@")) errors.push("PUBLIC_SECURITY_EMAIL is required");
  return errors;
}
```

- [ ] **Step 3: Create production validation script**

`scripts/validate-public-truth.mjs` must call equivalent checks against process env and exit 1 with one line per missing/invalid fact. It must never supply a fallback production domain/email.

Add script:

```json
"validate:public-truth": "node scripts/validate-public-truth.mjs"
```

Do not add it to local preview build yet; add it to Cloudflare production build configuration during Task 14 when real variables exist.

- [ ] **Step 4: Implement trust pages using only factual statements**

About may explain the approved product-house proposition and `Tony Nguyen — Founder & CEO`, but no invented biography milestones.

Contact behavior:

```text
- If `SITE.contactEmail` exists, render a mailto action.
- If absent in local/preview, render explanatory non-production text: “Contact details are configured for the production release.”
- No agency “Have something worth making?” copy.
```

Support lists only public products with verified `proof.supportUrl`; otherwise directs to corporate contact when available.

Security exposes `SITE.securityEmail` only when configured and makes no bug-bounty/SLA/certification promise.

Privacy describes only website practices that implementation can prove. If Cloudflare Web Analytics is not yet enabled, do not claim that it is. Do not add legal terms beyond factual site behavior without owner/legal approval.

- [ ] **Step 5: Write trust-route browser tests**

Assert:

```text
/about/ identifies BlueSkyz and founder without “global team/offices” language
/contact/ has no agency-style headline
/security/ has no bank-grade/military-grade/ISO/SOC claim
/privacy/ is reachable
/support/ is reachable
```

- [ ] **Step 6: Run tests**

```bash
node --test tests/architecture/public-truth-gate.test.mjs
pnpm build
pnpm test:e2e -- trust-routes.spec.ts
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/about.astro src/pages/contact.astro src/pages/support.astro src/pages/privacy.astro src/pages/security.astro src/lib/truth.ts scripts/validate-public-truth.mjs package.json tests/architecture/public-truth-gate.test.mjs tests/e2e/trust-routes.spec.ts
git commit -m "feat: add factual trust and contact surfaces"
```

---

### Task 11: Add canonical SEO, structured data, sitemap, and social metadata without staging leakage

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/pages/robots.txt.ts`
- Create: `src/pages/sitemap.xml.ts`
- Create/replace after approval: `public/social/og-default.*`
- Create: `tests/architecture/seo-contract.test.mjs`
- Create: `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `SITE.url`, public product collection.
- Produces: canonical metadata and public-only discovery documents.

- [ ] **Step 1: Write failing SEO contract test**

The test must assert source contains `Organization`, `WebSite`, canonical URL handling, public-only sitemap generation, and zero `portfolio.tonydemo.com` strings.

- [ ] **Step 2: Implement `src/lib/seo.ts`**

Provide:

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

Only add social/profile fields when verified.

- [ ] **Step 3: Extend BaseLayout props**

Add `canonicalPath`, optional `image`, and structured-data support. Canonical must be generated from `SITE.url`, never from request host or a hard-coded staging domain.

- [ ] **Step 4: Add robots and sitemap routes**

`robots.txt` references the canonical sitemap. Sitemap contains `/`, `/products/`, public product profile routes, `/about/`, `/contact/`, `/support/`, `/privacy/`, `/security/`; it excludes hidden products and internal preview/test paths.

- [ ] **Step 5: Add OG assets only from approved brand/product artwork**

Do not use generated product UI as proof. If the final corporate OG image is not yet approved, use a restrained R4d masterbrand-only image and record its provenance.

- [ ] **Step 6: Run tests**

```bash
pnpm build
node --test tests/architecture/seo-contract.test.mjs
pnpm test:e2e -- seo.spec.ts
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo.ts src/layouts/BaseLayout.astro src/pages/robots.txt.ts src/pages/sitemap.xml.ts public/social tests/architecture/seo-contract.test.mjs tests/e2e/seo.spec.ts
git commit -m "feat: add truthful entity and product SEO"
```

---

### Task 12: Add native motion/progressive enhancement and prove reduced-motion behavior

**Files:**
- Create: `src/components/ui/Reveal.astro`
- Modify: `src/styles/global.css`
- Modify: homepage sections only where signature reveal is used
- Create: `tests/e2e/motion.spec.ts`

**Interfaces:**
- Consumes: static HTML homepage.
- Produces: optional CSS/View-Transition enhancement with no global animation framework.

- [ ] **Step 1: Write failing reduced-motion tests**

```ts
import { expect, test } from "@playwright/test";

test("reduced motion keeps all hero content immediately visible", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore products/i }).first()).toBeVisible();
  await context.close();
});
```

- [ ] **Step 2: Implement `Reveal.astro` as a semantic wrapper, not a client island**

The component should render plain content with an optional class/data attribute. Visibility must never default to hidden when JavaScript is absent.

- [ ] **Step 3: Add CSS-only reveal/signature behavior**

Use opacity/clip-path only when supported and only on non-critical decorative layers. Do not animate the H1 from `display:none`, `visibility:hidden`, or an offscreen state that can delay comprehension.

Use `@media (prefers-reduced-motion: reduce)` to eliminate transforms/clip transitions.

- [ ] **Step 4: Evaluate View Transitions progressively**

If cross-document View Transitions improve navigation without increasing JS or breaking Safari/Firefox fallback, enable them through CSS/HTML opt-in. If not, omit them; the spec says progressive adoption, not mandatory novelty.

- [ ] **Step 5: Run tests**

```bash
pnpm build
pnpm test:e2e -- motion.spec.ts
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Reveal.astro src/styles/global.css src/components/sections tests/e2e/motion.spec.ts
git commit -m "feat: add native progressive motion grammar"
```

---

### Task 13: Rebuild security headers, client-JS budget, and asset gates for the final static architecture

**Files:**
- Modify: `public/_headers`
- Create: `scripts/check-client-budget.mjs`
- Replace: `tests/architecture/bundle-budget.test.mjs`
- Replace/remove: `scripts/check-bundle-regression.mjs`
- Modify: `tests/architecture/security-headers.test.mjs`

**Interfaces:**
- Consumes: final static output and known external asset/script sources.
- Produces: framework-neutral client-JS budget and deployable security-header contract.

- [ ] **Step 1: Write a framework-neutral generated-JS budget test**

Replace the old Next build-log parser test with a test that creates a temporary `dist/_astro/` fixture and calls `sumClientJavaScriptBytes(distPath)` exported by `scripts/check-client-budget.mjs`.

Required behavior:

```text
- sum all generated .js files referenced by dist/index.html
- compressed measurement uses Brotli or gzip consistently
- homepage initial referenced JS must be <120000 bytes
- target is zero/near-zero; hard ceiling remains 120000
```

- [ ] **Step 2: Implement `check-client-budget.mjs`**

Read `dist/index.html`, extract local `.js` script `src` values, read those files, Brotli-compress with Node `zlib.brotliCompressSync`, sum bytes, print evidence, and exit 1 at `>= 120_000`.

Add package script:

```json
"check:client-budget": "node scripts/check-client-budget.mjs"
```

- [ ] **Step 3: Replace old Next-specific bundle regression script/test**

Delete `parseRootFirstLoadBytes`/Next route-table parsing. If exact-base regression remains useful, compare the framework-neutral JSON evidence files produced by `check-client-budget.mjs`; otherwise retain only the hard ceiling and let Lighthouse/PR evidence detect regressions.

- [ ] **Step 4: Finalize CSP only from actual sources**

For a static site with no third-party scripts, prefer a CSP close to:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; form-action 'self'
```

If Astro inline scripts, Cloudflare Web Analytics, or another verified source requires a change, adjust narrowly and document the exact reason in `SECURITY.md`. Do not add wildcard origins.

- [ ] **Step 5: Run the budget/security gates**

```bash
pnpm build
pnpm check:client-budget
pnpm test:architecture
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public/_headers scripts/check-client-budget.mjs scripts/check-bundle-regression.mjs tests/architecture/bundle-budget.test.mjs tests/architecture/security-headers.test.mjs package.json SECURITY.md
git commit -m "test: enforce static security and client-JS budgets"
```

---

### Task 14: Align Playwright, Lighthouse, and Cloudflare Workers Builds with the new deployment flow

**Files:**
- Modify: `playwright.config.ts`
- Modify: `lighthouserc.json`
- Modify: `.githooks/pre-commit`
- Modify: `tests/architecture/local-gates.test.mjs`
- Create: `docs/QA_STRATEGY_C1.md` or replace `docs/QA_STRATEGY.md` if the old document is fully obsolete
- Modify: `README.md`

**Interfaces:**
- Consumes: final build scripts and Cloudflare preview URL convention.
- Produces: local canonical gate + remote preview verification without GitHub Actions.

- [ ] **Step 1: Update the local gate test first**

Required pre-commit commands:

```text
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
```

Do not put full multi-browser Playwright or Lighthouse into every Git commit hook; those remain promotion/preview gates because they are slower.

- [ ] **Step 2: Update `.githooks/pre-commit` to match the test**

Run the commands above with `set -eu` so the first failure blocks the commit.

- [ ] **Step 3: Keep Playwright local/remote dual mode**

Retain `PLAYWRIGHT_BASE_URL` behavior. Local `webServer.command` remains `pnpm start`. Remove GitHub-specific reporter if it no longer provides value outside Actions; keep `list/html/junit` reporters useful to local/Cloudflare-run agents.

- [ ] **Step 4: Update Lighthouse collection for the Astro preview server**

Keep three runs and current quality floors or stronger. Preserve:

```json
"categories:performance": ["error", { "minScore": 0.9 }]
"categories:accessibility": ["error", { "minScore": 0.9 }]
"categories:best-practices": ["error", { "minScore": 0.9 }]
"categories:seo": ["error", { "minScore": 0.9 }]
"cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }]
```

Do not preserve an unrealistically framework-specific LCP number solely because it existed before; set the lab LCP budget from actual C1.1 baseline evidence while keeping the field goal ≤2.5s p75.

- [ ] **Step 5: Configure Cloudflare Workers Builds outside repository source**

In Cloudflare Git integration:

```text
repository: BlueSkyz-Labs/SGPS-Marketing
production branch: main
build command: pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget
preview branches: enabled
output/deploy: Wrangler/Workers Static Assets using wrangler.toml
```

For preview builds where production truth variables are intentionally unavailable, use a preview build command that omits `validate:public-truth` but still builds/tests static content. Production must include the truth gate.

Do not recreate the same pipeline in `.github/workflows`.

- [ ] **Step 6: Document exact promotion flow**

`docs/QA_STRATEGY.md` must describe:

```text
feature branch
→ local source gate
→ PR
→ Cloudflare preview
→ Playwright browser/a11y + Lighthouse + human/E4 review
→ merge main
→ production truth gate + production build
→ post-deploy smoke
```

- [ ] **Step 7: Run local QA**

```bash
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
pnpm test:e2e
pnpm lighthouse
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add playwright.config.ts lighthouserc.json .githooks/pre-commit tests/architecture/local-gates.test.mjs docs/QA_STRATEGY.md README.md
git commit -m "chore: align QA with Cloudflare-native promotion"
```

---

### Task 15: Remove legacy Next/React experience code and unused dependencies only after parity is green

**Files:**
- Delete obsolete: `src/app/**`
- Delete obsolete: old `src/components/sections/AboutSection.tsx`, `ContactSection.tsx`, `HeroSection.tsx`, `ManifestoSection.tsx`, `ProcessSection.tsx`, `WorkSection.tsx`
- Delete obsolete: old React layout/ui/provider files superseded by Astro equivalents
- Delete obsolete: `src/lib/motion-features.ts`
- Delete/replace: legacy `src/lib/constants.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tests/architecture/ui-inventory.test.mjs`
- Delete or rewrite framework-specific tests that no longer represent customer/product truth

**Interfaces:**
- Consumes: complete Astro route/component replacement from Tasks 6–14.
- Produces: no dead Next/React/Framer/Cormorant/gold architecture.

- [ ] **Step 1: Write/update inventory test to prohibit legacy experience dependencies**

The architecture test must assert:

```text
no next dependency
no framer-motion dependency
no CustomCursor source
no MotionProvider source
no Cormorant_Garamond string
no Quiet luxury / digital atelier / Savile Row strings in runtime source
no champagne #C9A962 token
```

It must not ban React generically if a future audited island genuinely exists; it should ban unused/global React runtime assumptions.

- [ ] **Step 2: Run the test and confirm legacy files make it fail**

```bash
node --test tests/architecture/ui-inventory.test.mjs
```

- [ ] **Step 3: Delete superseded runtime source**

Use `git rm` for old Next app tree and old React experience components only after all equivalent routes/tests are green. Preserve any generic source file only if it has a real caller after migration.

- [ ] **Step 4: Run unused-dependency audit**

Search source imports for `lucide-react`, `class-variance-authority`, `clsx`, and `tailwind-merge`. Remove a package if there are zero surviving imports. Do not retain a design-system dependency merely because it was once used.

- [ ] **Step 5: Remove Next-specific architecture tests**

Delete or rewrite tests such as old React-type/Next layout assumptions only after verifying their customer-value intent is covered by the Astro toolchain/browser tests.

- [ ] **Step 6: Run the full local gate**

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

Expected: PASS.

- [ ] **Step 7: Commit cleanup separately**

```bash
git add -A
git commit -m "refactor: remove superseded portfolio and React runtime code"
```

---

### Task 16: Execute the E4 launch-readiness red team and record promotion blockers without faking completion

**Files:**
- Create: `docs/evidence/2026-09-04-e4-web-validation.md`
- Create: `docs/evidence/2026-09-04-launch-readiness.md`
- Modify only if evidence finds defects: runtime/test files from earlier tasks

**Interfaces:**
- Consumes: deployed Cloudflare preview candidate and all automated gates.
- Produces: explicit PASS/BLOCKED launch evidence; does not force public launch when external truth is missing.

- [ ] **Step 1: Capture automated evidence from the exact candidate commit**

Record commit SHA and results for:

```text
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
pnpm test:e2e
pnpm lighthouse
```

Also record Cloudflare preview URL and deployment status.

- [ ] **Step 2: Run viewport/browser matrix**

At minimum:

```text
320px mobile
360px Android-class
390/393px iPhone-class
430px large phone
1280 desktop
1440 desktop
1920 desktop
200% browser zoom
Chromium
Firefox
WebKit
reduced motion
keyboard only
```

Record defects with exact route/viewport/browser and severity.

- [ ] **Step 3: Run the seven customer tasks from the spec**

Use real people where possible:

```text
1. Five-second test: What does BlueSkyz do?
2. Find a relevant product.
3. Determine whether it is usable now.
4. Find help/support.
5. Find who is responsible for BlueSkyz.
6. Explain why the products belong together.
7. Identify anything exaggerated or fake.
```

Do not convert visual preference into a P0 unless it causes comprehension, trust, accessibility, navigation, or conversion failure.

- [ ] **Step 4: Run visual red-team checks**

Record results for:

```text
blur hierarchy
full grayscale
remove/ignore Cobalt
inspect without R4d mark
competitor-logo substitution thought experiment
```

The page must retain hierarchy without color/effects, while still having enough distinctive composition/brand behavior to avoid generic template substitution.

- [ ] **Step 5: Evaluate the P0 public-promotion blockers**

`docs/evidence/2026-09-04-launch-readiness.md` must mark each as `PASS` or `BLOCKED` with evidence:

```text
canonical corporate domain supplied
no staging-domain metadata leakage
public product inventory/status reviewed
real screenshots/artifacts available for promoted products
all CTAs work
founder/company copy approved
privacy path factual/approved
support/contact works
security reporting works
unsupported claims = 0
critical broken links = 0
generated fake product proof = 0
```

If the owner has not supplied a required external fact, mark `BLOCKED — owner/evidence dependency`; never manufacture a PASS.

- [ ] **Step 6: Fix only evidence-backed defects and rerun affected gates**

Each P0/P1 defect gets its own small fix/test/commit. Do not perform a visual redesign because one tester expresses a preference.

- [ ] **Step 7: Final verification before calling the implementation converged**

Run the full gate again on the exact final commit and verify Cloudflare preview smoke after the build.

- [ ] **Step 8: Commit E4 evidence**

```bash
git add docs/evidence/2026-09-04-e4-web-validation.md docs/evidence/2026-09-04-launch-readiness.md
git commit -m "docs: record BlueSkyz Web V1 E4 validation"
```

The implementation may be technically complete while public promotion remains `BLOCKED` on owner/evidence dependencies. Report that state precisely.

---

## Plan Self-Review Result

### Spec coverage

- Customer mission and 5–90 second comprehension: Tasks 6, 8, 16.
- Homepage IA/order: Task 8.
- Porcelain/Ink/Cobalt semantic visual system: Task 5.
- R4d provenance and non-reinterpretation: Task 4.
- Product lifecycle/availability/action/evidence model: Task 7.
- Product discovery/profile pages: Task 9.
- Trust/privacy/security/support/founder surfaces: Task 10.
- Progressive enhancement, reduced motion, browser-native motion: Task 12.
- WCAG/browser/mobile QA: Tasks 6, 8–12, 14, 16.
- Performance/client JS/CWV assurance: Tasks 1, 13, 14, 16.
- SEO/canonical/structured data: Task 11.
- Cloudflare Workers Static Assets/Builds and no required GitHub Actions: Tasks 3 and 14.
- Legacy experience removal: Task 15.
- External launch truth dependencies and E4 promotion gate: Tasks 10, 14, 16.
- Astro-vs-Next evidence gate: Task 1.

### Placeholder policy

The plan intentionally contains no values that executors are allowed to invent. Where production truth is externally unresolved (domain, emails, product maturity, legal content, approved screenshots/font), the implementation either derives from evidence, omits the claim/surface, or fails the production-promotion gate. Benchmark measurement slots are generated during Task 1 and must be replaced with actual values before the decision commit; placeholder text is not permitted in committed evidence.

### Type/interface consistency

- `SITE` is defined once in `src/data/site.ts` and consumed by layout/trust/SEO.
- Product truth is defined once in `src/content.config.ts` and queried only through `getPublicProducts()` / `getFlagshipProduct()`.
- Build output is `dist/` consistently across Astro, verification, Wrangler, Playwright preview, and client-budget scripts.
- Production truth environment names are consistently `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL`, and `PUBLIC_SECURITY_EMAIL`.
- Framework decision values are consistently `ASTRO_7` / `NEXT_16_3_STATIC`.

## Execution Gate

This plan is Astro-forward by the approved design decision, but **Task 1 is a hard stop gate**. Tasks 2–16 are valid only after committed evidence selects `ASTRO_7`. A `NEXT_16_3_STATIC` result ends this plan after Task 1 and requires a Next-specific replacement plan before implementation proceeds.
