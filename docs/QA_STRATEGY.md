# QA Strategy — BlueSkyz Labs Portfolio

> **Owner:** Thinh Nguyen · QA Engineer
> **Project:** `PRJ_Portfolio` (Next.js 15, React 19 RC, Tailwind, Framer Motion)
> **Source of truth for design:** [`SPEC.md`](./SPEC.md)
> **Status:** Living document — updated as gates evolve.

---

## 1. Mission

Define and enforce the quality gates that separate _"launched"_ from _"premium-grade"_ for the BlueSkyz Labs Portfolio. Every gate below is derived from a specific commitment in `SPEC.md`. If a gate fails, the PR is blocked.

We optimize for the visitor's **first seven seconds** (SPEC §1): stillness, authority, curiosity, respect. Every check is written to defend that experience.

---

## 2. Quality Gates (Overview)

| Gate                                       | Type       | Source      | Blocking?   |
| ------------------------------------------ | ---------- | ----------- | ----------- |
| G1 — TypeScript compiles                   | Static     | SPEC §6.2   | ✅ Yes      |
| G2 — Lint clean (zero warnings)            | Static     | SPEC §6.6   | ✅ Yes      |
| G3 — Prettier formatted                    | Static     | SPEC §6.6   | ✅ Yes      |
| G4 — Production build succeeds             | Build      | SPEC §6.6   | ✅ Yes      |
| G5 — Bundle size regression < 5%           | Build      | SPEC §6.3   | ✅ Yes      |
| G6 — E2E smoke (Playwright)                | E2E        | This doc §3 | ✅ Yes      |
| G7 — Accessibility: axe-core WCAG 2.1 AA   | A11y       | SPEC §4.6   | ✅ Yes      |
| G8 — Performance: Lighthouse ≥ 90 all cats | Perf       | SPEC §6.3   | ✅ Yes      |
| G9 — LCP < 1.2s, INP < 200ms               | Perf (RUM) | SPEC §6.3   | ✅ Yes      |
| G10 — Visual regression: screenshot diff   | Visual     | This doc §6 | ⚠️ Advisory |
| G11 — Cross-browser: Chrome, Edge, Firefox | E2E matrix | This doc §7 | ✅ Yes      |

G1–G5 run on every push via pre-commit + CI. G6–G11 run on every PR to `main` / `develop`.

---

## 3. End-to-End Test Plan (Playwright)

### 3.1 Tooling

- **`@playwright/test`** — primary runner, real browsers (Chromium, Firefox, WebKit).
- **`@axe-core/playwright`** — accessibility violations layered onto every E2E test.
- **`@playwright/test` visual comparisons** — pixel-diff against committed baselines.
- **`lighthouse-ci`** — Lighthouse audits in CI with assertion gates.

> **Conceptual `package.json` addition** (for the implementer to wire up on the next PR):
>
> ```jsonc
> {
>   "devDependencies": {
>     "@playwright/test": "^1.49.0",
>     "@axe-core/playwright": "^4.10.0",
>     "axe-core": "^4.10.0",
>     "lighthouse": "^12.2.1",
>     "@lhci/cli": "^0.14.0",
>     "pixelmatch": "^6.0.0",
>     "pngjs": "^7.0.0",
>   },
> }
> ```
>
> The full test dependency block also includes `typescript`, `eslint`, `prettier` (already present).

### 3.2 Test Layers

```
tests/
├── e2e/
│   ├── basic.spec.ts           # Smoke (home page loads, no console errors, header, hero)
│   ├── navigation.spec.ts      # Nav anchor links scroll smoothly, active-section highlight
│   ├── hero.spec.ts            # Hero statement visible, scroll cue pulses, reduced-motion respected
│   ├── sections.spec.ts        # Manifesto / Work / Process / About / Contact render
│   ├── contact-form.spec.ts    # Form validation, submit states (default → loading → success/error)
│   ├── accessibility.spec.ts   # axe-core scan on every route, keyboard nav, focus ring
│   └── responsive.spec.ts      # Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1440
├── visual/
│   ├── hero.spec.ts            # Screenshot diff against baseline
│   └── desktop-light.spec.ts
├── fixtures/
│   └── base.ts                 # Custom test fixture: preloaded fonts, axe auto-injected
└── playwright.config.ts        # Browsers, base URL, web server, reporters
```

### 3.3 Smoke Test (G6) — `tests/e2e/basic.spec.ts`

Defends the visitor's first seven seconds:

1. **Home page loads without crash** — `page.goto('/')` returns 200, `page.title()` contains "Portfolio", no unhandled exception.
2. **No console errors** — every page error fails the test; warnings are collected and surfaced.
3. **Header present** — `<header>` landmark exists and is visible (per SPEC §3.1: sticky header with wordmark + nav + CTA).
4. **Hero section visible** — `#hero` section has a non-zero bounding box and is in the viewport.

### 3.4 Critical-Path Tests

| Test                    | What it defends                                                              | SPEC ref   |
| ----------------------- | ---------------------------------------------------------------------------- | ---------- |
| `navigation.spec.ts`    | Smooth scroll, active-section highlight, skip-link works                     | §4.1, §4.6 |
| `hero.spec.ts`          | 100vh height (desktop), scroll cue animation, hairline gold rule at 8%       | §3.2       |
| `contact-form.spec.ts`  | All four states (default / hover / focus / loading / error) render correctly | §5.4       |
| `accessibility.spec.ts` | axe-core scan, keyboard Tab order, focus ring (1px gold @ 2px offset)        | §4.6       |
| `responsive.spec.ts`    | Layout shifts cleanly across breakpoints; type scale steps down correctly    | §3.4       |

### 3.5 Test Rules

- **No `waitForTimeout`.** Use `expect(locator).toBeVisible()` and `waitForResponse` — never arbitrary sleeps.
- **No `nth-child` selectors** when a semantic/role selector exists.
- **One assertion concept per test.** When it fails, the failure message tells you what broke.
- **Mobile-first viewport in CI** (375×667) plus a desktop run (1440×900). Tablet covered in `responsive.spec.ts`.
- **`prefers-reduced-motion`** — every test that interacts with animation must also pass under `reduce`.

---

## 4. Performance Benchmarks (G8, G9)

Targets lifted verbatim from SPEC §6.3:

| Metric                                  | Hard limit    | Target   | Tool                                |
| --------------------------------------- | ------------- | -------- | ----------------------------------- |
| **LCP** (Largest Contentful Paint)      | **< 1.2 s**   | 0.8 s    | `lhci` + Web Vitals RUM             |
| **CLS** (Cumulative Layout Shift)       | < 0.05        | 0        | `lhci`                              |
| **INP** (Interaction to Next Paint)     | **< 200 ms**  | 100 ms   | `web-vitals` (field) + `lhci` (lab) |
| **TBT** (Total Blocking Time)           | < 150 ms      | < 50 ms  | `lhci`                              |
| **Total JS** (initial route, gzipped)   | **< 120 KB**  | < 80 KB  | `next-bundle-analyzer`              |
| **Lighthouse** (perf / a11y / bp / seo) | **≥ 90** each | 100 each | `lhci collect --assert`             |

### 4.1 Lighthouse CI (G8)

`lighthouserc.json` (PR-provided) will assert:

```jsonc
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "chromeFlags": "--no-sandbox --headless=new",
      },
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 1200 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 150 }],
      },
    },
  },
}
```

### 4.2 Web Vitals RUM (G9)

Inject `web-vitals` on the client and POST to `/api/vitals` so we measure real-world INP, not just lab LCP. Alert if p75 INP > 200 ms over any rolling 24 h window.

### 4.3 Bundle Budget (G5)

A failing build increments the JS payload by more than 5% vs. `main` (enforced by `size-limit` or a custom `next build` + bundle-analyzer script). Current baseline recorded on first merge to `main`.

---

## 5. Accessibility (G7) — axe-core + WCAG 2.1 AA

### 5.1 Layered Approach

- **Per-route axe scan** in E2E: every `*.spec.ts` ends with `await axeCheck(page)` which fails on any `serious` or `critical` violation.
- **Standalone a11y spec** (`accessibility.spec.ts`) walks the entire keyboard flow (Tab / Shift+Tab / Enter / Space / Escape) and asserts:
  - Every interactive element is reachable
  - Focus ring is visible (1px `--gold-champagne` solid, 2px offset — SPEC §4.6)
  - Skip link appears on first Tab and jumps to `<main>`
  - No element traps focus

### 5.2 WCAG 2.1 AA Checklist (tied to SPEC)

| Criterion                  | SPEC ref | Check                                                                    |
| -------------------------- | -------- | ------------------------------------------------------------------------ |
| 1.1.1 Non-text content     | §2.6, §5 | All `<img>` have `alt`; decorative use `aria-hidden`                     |
| 1.3.1 Info & relationships | §4.6     | Semantic landmarks: `<header> <main> <nav> <section> <article> <footer>` |
| 1.4.3 Contrast (minimum)   | §2.1     | `--cream-offwhite` on `--ink-void` = 16.8:1 (AAA) — verified by axe      |
| 1.4.11 Non-text contrast   | §2.6     | Gold hairline borders against bg = 3:1 minimum                           |
| 2.1.1 Keyboard             | §4.6     | Every interactive element focusable                                      |
| 2.4.1 Bypass blocks        | §4.6     | "Skip to content" link present                                           |
| 2.4.7 Focus visible        | §4.6     | `:focus-visible` ring required                                           |
| 2.5.5 Target size          | —        | Min 44×44 CSS px for tap targets                                         |
| 4.1.2 Name, role, value    | §4.6     | `aria-label` on icon-only buttons; Radix primitives handle the rest      |

### 5.3 axe-core Configuration

```ts
// tests/fixtures/base.ts
import AxeBuilder from "@axe-core/playwright";

export const axeCheck = async (page: Page) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const blockers = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );
  expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
};
```

---

## 6. Visual Regression (G10)

### 6.1 Approach

Playwright's built-in screenshot diffing with committed baselines under `tests/visual/__screenshots__/`.

- **Capture at fixed viewports:** desktop 1440×900, tablet 768×1024, mobile 375×667.
- **`animations: 'disabled'`** — every test uses `page.emulateMedia({ reducedMotion: 'reduce' })` so hairline rule stays in place and scroll cue doesn't pulse.
- **`mask` dynamic regions** — anything time-based (current year in footer, view counters) is masked before diff.
- **Threshold:** `maxDiffPixels: 50` (anti-aliasing tolerance) and `maxDiffPixelRatio: 0.001` (0.1%).

### 6.2 Baselines

- Desktop + mobile baselines committed for every section: Hero, Manifesto, Work, Process, About, Contact.
- Updated **manually** only via `npx playwright test --update-snapshots` after a design review approves the change. Never auto-update in CI.

### 6.3 CI Behaviour

- Diff below threshold → pass.
- Diff above threshold → fail the build **with the diff PNG as an artifact** so reviewers can eyeball it.
- Snapshot updates never happen automatically — they require a human review.

---

## 7. Cross-Browser Matrix (G11)

The portfolio must render identically (within the visual-regression tolerance) on:

| Browser               | Channel      | Project goal                                                           |
| --------------------- | ------------ | ---------------------------------------------------------------------- |
| **Chromium** (latest) | Chrome       | Primary — Lighthouse runs here                                         |
| **Firefox** (latest)  | Firefox      | Full visual + E2E pass                                                 |
| **WebKit** (latest)   | Safari-on-CI | Visual sanity (no E2E for now — Safari quirks are caught in QA passes) |

Additionally, **Microsoft Edge** (Chromium-based) is covered by Chromium runs at the engine level. SPEC and stakeholder asks call out Edge specifically; we satisfy this by running Chromium with Edge's user-agent and Edge's fonts/metrics in a separate job, plus a manual smoke before each release.

### 7.1 CI Strategy

`playwright.config.ts` defines three projects (`chromium`, `firefox`, `webkit`) plus a `mobile-chromium` project for the responsive suite. CI runs all projects in parallel; failure in any one blocks the PR.

```ts
// playwright.config.ts (excerpt)
projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
  { name: "webkit",   use: { ...devices["Desktop Safari"] } },
  { name: "mobile-chromium", use: { ...devices["Pixel 5"] } },
],
```

---

## 8. CI Pipeline — `.github/workflows/qa.yml`

A dedicated `qa` job runs on every push and PR to `main` / `develop`:

1. Checkout, setup Node 20, enable pnpm via corepack
2. Cache pnpm store
3. `pnpm install --frozen-lockfile`
4. `pnpm typecheck` (G1)
5. `pnpm lint` (G2)
6. `pnpm format:check` (G3)
7. `pnpm build` (G4, G5)
8. `npx playwright install --with-deps` then `npx playwright test` (G6, G7, G10, G11)
9. `lhci autorun` (G8, G9) — boots the built site, audits, uploads to LHCI server (optional)
10. Upload Playwright report + Lighthouse artifacts as build artifacts

Branch protection on `main` requires the `qa` job green.

---

## 9. Release Gates

A release to `portfolio.tonydemo.com` is permitted only when **all** of:

- G1–G11 green on the release commit
- Lighthouse desktop score ≥ 90 on all four categories
- Manual smoke on Chrome + Safari on real devices
- Visual diff against the last release reviewed by a designer
- Bundle-size delta documented in the PR description

---

## 10. Reporting & Artifacts

Every CI run uploads:

- `playwright-report/` — HTML report with traces, videos on failure
- `lighthouse/` — `lhr.json` per route, manifest
- `test-results/` — JUnit XML for GitHub annotations
- `bundle-stats.html` — `next-bundle-analyzer` output for size regressions

---

## 11. Open Questions / Follow-ups

- **Header component missing today.** The current `page.tsx` renders the hero directly without a `<header>` landmark. The basic smoke test enforces the SPEC §3.1 requirement; until the Header component lands (planned v1.1), that assertion fails. **Action:** track as a blocker for the header-implementation ticket, not a test bug.
- **Real-device INP** — once deployed, we need p75 INP from RUM; Lighthouse lab INP is a proxy. Wire `web-vitals` before public launch.
- **axe-core in `package.json`** — noted above; implementer to add in the next dependency-bump PR.

---

_Last updated by QA — synced with SPEC.md revision on initial release._
