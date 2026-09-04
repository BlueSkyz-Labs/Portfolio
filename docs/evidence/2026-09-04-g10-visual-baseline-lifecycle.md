# Visual regression baseline lifecycle (G10) — scaffolding

Date: 2026-09-04  
Status: **Scaffolding** — not a required merge gate.

## Scope (candidate routes)

- `/`
- `/products/`
- `/about/`
- `/contact/`
- `/security/`
- `/404` recovery path

## Lifecycle

1. Capture desktop + mobile Chromium baselines after Experience-stable SHA
2. Store under `tests/visual/` (git-lfs optional when assets grow)
3. Diff on PR only when Experience surfaces change
4. Reviewer acknowledges intentional visual diffs; reject accidental layout regressions

## Current substitute

Playwright e2e (axe, shell, motion, empty honesty) + Lighthouse CI cover functional
and lab-perf regression. Screenshot baselines land after owner confirms G10 is
worth storage/review cost.
