# Initial JS Budget Convergence Plan

> **Historical / superseded.** Atelier-era Next.js plan. Canonical SoT is C1.1 Astro (`docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`). Do not execute this plan against current `main`.

**Base revision:** `5dadb214a2d62a5b9f131a5cdbc87325a5545f64`

## Objective

Converge `SPEC.md` §6.3 hard initial-route JavaScript budget from the measured **145 kB First Load JS** to **<120 kB**, without weakening the quiet-luxury motion, accessibility, static-export, or Cloudflare Pages contracts.

## Current verified baseline

- `/` First Load JS: **145 kB**.
- Shared First Load JS: **103 kB**.
- Route-specific contribution is therefore approximately **42 kB**.
- G5 regression is green, but the absolute Product Truth budget is not satisfied.
- Main base has passed production dependency audit, architecture, typecheck, lint, format, static export, G5, 24 Playwright tests, Lighthouse, Edge-UA smoke, and exact Cloudflare Pages production deployment.

## Constraints

- Do not remove required motion semantics merely to make the number green.
- Preserve `prefers-reduced-motion` behavior.
- Preserve header scroll progress, hero entry motion, and hero parallax intent from `SPEC.md`.
- Preserve static export to `out/` and Cloudflare Pages deployment.
- Do not weaken G5 or Lighthouse assertions.
- Treat Next build First Load JS as the repository's current hard-budget proxy, but corroborate it with emitted/downloaded JS evidence because Next.js has acknowledged limitations in this metric for modern RSC architectures.

## Execution

1. **Root-cause evidence**
   - Inspect current client boundaries.
   - Produce a Next bundle-analyzer artifact on the exact base.
   - Measure gzip sizes of JavaScript referenced by the exported home page.
   - Identify the dominant route-specific dependency/module family.
2. **TDD RED**
   - Add an automated test proving the existing bundle script does not yet enforce the absolute 120 kB Product Truth threshold.
   - Observe the test fail for the expected reason.
3. **Minimal performance change**
   - Change only the proven dominant source of route-specific JS.
   - Prefer preserving existing semantics with a smaller loading/runtime pattern over deleting UX behavior.
4. **GREEN / exact measurement**
   - Make the absolute budget gate blocking.
   - Build and require `/` First Load JS <120 kB.
   - Confirm actual emitted/downloaded JS does not regress.
5. **Full verification**
   - production dependency audit
   - architecture + absolute budget gate
   - typecheck/lint/format
   - static-export build
   - exact-base G5
   - Playwright Chromium/Firefox/WebKit/mobile + axe
   - Lighthouse
   - Cloudflare Pages preview
6. **Promotion**
   - refresh head/base/merge candidate/review threads/checks
   - merge only fresh verified candidate
   - verify resulting `main`, Edge-UA, and production deployment.

## Non-goals

- Sprint-2 section implementation.
- Visual redesign.
- Framework/platform migration.
- Relaxing the <120 kB budget.
