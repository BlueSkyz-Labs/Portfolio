# Tailwind v4 Convergence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the repository styling toolchain into exact alignment with `SPEC.md` by upgrading Tailwind CSS 3.4.x to Tailwind CSS 4.3.3 without changing the approved visual language or weakening existing engineering gates.

**Architecture:** Keep the existing TypeScript theme configuration as the authoritative design-token compatibility layer for this migration slice, explicitly loaded from `globals.css` with Tailwind v4's supported `@config` directive. Replace the v3 PostCSS plugin/directives with the v4 PostCSS package and CSS import contract, remove redundant Autoprefixer, regenerate the lockfile deterministically, then verify the actual Cloudflare static-export artifact across existing browser/a11y/performance gates.

**Tech Stack:** Next.js 15.5.24, React 19.0.8, Tailwind CSS 4.3.3, `@tailwindcss/postcss` 4.3.3, PostCSS 8.5.26, pnpm 9.15.9, Playwright, axe-core, Lighthouse CI, Cloudflare Pages static export.

**Spec:** `SPEC.md` §6.1 (Tailwind CSS v4), §2 (design language), §6.3 (performance budgets), `docs/QA_STRATEGY.md` G1–G11.

## Global Constraints

- `SPEC.md` requires **Tailwind CSS v4 + CSS variables**.
- Preserve the existing Quiet Luxury palette, typography, spacing, motion, radius, shadow, and container semantics; this is a tooling convergence slice, not a redesign.
- Preserve Next.js static export and Cloudflare Pages `out/` deployment contract from the dependency PR.
- Preserve production dependency audit and all architecture/security/deployment regression gates.
- Tailwind v4 browser floor is Safari 16.4+, Chrome 111+, Firefox 128+; current QA runs latest Chromium/Firefox/WebKit and is compatible with this floor.
- Do not claim the separate hard initial-route budget `<=120 KB` is solved by this migration unless fresh evidence proves it.
- PR #2 (`fix/foundation-assurance`) is the upstream dependency; this branch is stacked from its exact verified source head `d83a43ce49e6a743f3226e380b9e17843644570f` and must not mutate PR #2.

---

### Task 1: Encode the Tailwind v4 Toolchain Contract

**Files:**
- Modify: `tests/architecture/css-pipeline.test.mjs`
- Test: `tests/architecture/css-pipeline.test.mjs`

**Interfaces:**
- Consumes: repository `package.json`, `postcss.config.mjs`, `src/app/globals.css`.
- Produces: deterministic assertions that reject Tailwind v3 directives/plugin wiring and require the v4 package/plugin/import contract.

- [ ] **Step 1: Write the failing test**

Require:
- `tailwindcss` major version 4 in devDependencies;
- `@tailwindcss/postcss` major version 4 in devDependencies;
- no direct `autoprefixer` devDependency;
- PostCSS config contains `@tailwindcss/postcss` and does not register `tailwindcss` or `autoprefixer` plugins;
- `globals.css` contains `@import "tailwindcss"` and explicit `@config "../../tailwind.config.ts"`;
- `globals.css` contains no `@tailwind base/components/utilities` directives.

- [ ] **Step 2: Run the architecture suite and prove RED**

Run: `pnpm test:architecture`

Expected: the Tailwind contract test fails against current Tailwind 3.4.x while unrelated architecture tests remain green.

- [ ] **Step 3: Commit the RED regression**

Commit message: `test(css): require Tailwind v4 pipeline contract`

---

### Task 2: Implement the Minimal Tailwind v4 Migration

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.mjs`
- Modify: `src/app/globals.css`
- Preserve: `tailwind.config.ts`

**Interfaces:**
- Consumes: existing v3 theme configuration and CSS variable layer.
- Produces: Tailwind v4 PostCSS compilation while preserving all existing class names and custom theme tokens.

- [ ] **Step 1: Update package manifest**

Set `tailwindcss` to `4.3.3`, add `@tailwindcss/postcss` `4.3.3`, and remove direct `autoprefixer`. Keep `postcss` and the existing security override until lockfile/audit evidence proves it can safely change.

- [ ] **Step 2: Replace PostCSS plugin wiring**

Use:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 3: Replace v3 CSS directives with v4 import contract**

At the top of `src/app/globals.css`, use:

```css
@config "../../tailwind.config.ts";
@import "tailwindcss";
```

Keep the existing token/base/component/reduced-motion CSS unchanged unless a deterministic or runtime failure proves a required compatibility adjustment.

- [ ] **Step 4: Regenerate `pnpm-lock.yaml` with pnpm 9.15.9**

Run: `pnpm install --no-frozen-lockfile`

Then run: `pnpm audit --prod --audit-level=high`

Expected: lockfile matches `package.json`; production audit reports no High/Critical vulnerability.

- [ ] **Step 5: Run targeted architecture test and prove GREEN**

Run: `pnpm test:architecture`

Expected: all architecture tests pass, including the v4 contract.

- [ ] **Step 6: Commit the migration**

Commit message: `chore(css): migrate styling pipeline to Tailwind v4`

---

### Task 3: Verify Build and Visual/Runtime Compatibility

**Files:**
- Modify only if a fresh failing test exposes a real v4 compatibility issue.
- Evidence: GitHub Actions artifacts for bundle, Playwright, and Lighthouse.

**Interfaces:**
- Consumes: Tailwind v4 candidate and existing QA harness.
- Produces: exact-revision evidence that design/runtime behavior survived the toolchain migration.

- [ ] **Step 1: Run static gates**

Run: `pnpm typecheck && pnpm lint && pnpm format:check`

Expected: all pass with zero lint warnings.

- [ ] **Step 2: Build the actual deployment artifact**

Run: `NEXT_TELEMETRY_DISABLED=1 pnpm build`

Expected: Next static export succeeds and `scripts/verify-static-export.mjs` verifies `out/index.html`, `out/404.html`, `out/_headers`, and Next static assets.

- [ ] **Step 3: Run cross-browser/a11y tests against `out/`**

Run: `pnpm test:e2e`

Expected: Chromium, Firefox, WebKit, and mobile Chromium all pass; axe has no serious/critical violations.

- [ ] **Step 4: Run Lighthouse against `out/`**

Run: `pnpm lighthouse`

Expected: configured category/LCP/CLS assertions pass. TBT remains warning-level per existing config.

- [ ] **Step 5: Compare bundle evidence against exact upstream base**

Use existing G5 script in CI. Record candidate initial First Load JS and regression delta. Do not reinterpret G5 as satisfaction of the separate 120 KB hard budget.

---

### Task 4: Close the Stacked PR Frontier

**Files:**
- Update: this plan's checkbox/evidence state if repository convention requires durable execution accounting.
- PR: `chore/tailwind-v4-convergence` → `fix/foundation-assurance` while PR #2 remains unmerged.

**Interfaces:**
- Consumes: exact candidate SHA, upstream base SHA, CI/runtime evidence.
- Produces: a reviewable downstream PR with explicit dependency topology and no accidental widening into Sprint-2 UI work.

- [ ] **Step 1: Open/update the stacked PR**

State explicitly that PR #2 is the dependency and that this PR must be retargeted/reverified against `main` after PR #2 lands.

- [ ] **Step 2: Run deterministic QA on the synthesized stacked merge candidate**

Require all currently applicable GitHub Actions gates to pass.

- [ ] **Step 3: Run independent QA/QC if capability is available**

Provide base SHA, target SHA, diff, Product Truth, deterministic evidence, and risk surfaces. If no independent verifier capability exists, classify `NOT VERIFIED / EXTERNAL_CAPABILITY_GATE`; do not self-certify.

- [ ] **Step 4: Do not merge out of dependency order**

PR #2 must land first. Then refresh this PR onto resulting `main`, obtain the new integration candidate, and reverify affected evidence before any merge.
