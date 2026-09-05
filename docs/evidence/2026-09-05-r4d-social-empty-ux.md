# R4d social projection + empty-registry UX — 2026-09-05

## Intent

After #61 landed exact R4d SVG/tokens, tab/share identity still shipped a
geometric favicon + text-only OG, and primary CTAs still sent visitors into an
empty `/products/` aisle. This pass closes those agent-safe gaps without
inventing email, product, or ruleset facts.

## Changes

1. `scripts/generate-brand-assets.py` now rasterizes committed
   `symbol_mono_ink.svg` / `micro_mark_ink.svg` via `rsvg-convert` into
   `public/favicon.ico` and `public/social/og-default.png` (Ink/Porcelain/Cobalt
   only; no redrawn geometry).
2. `BaseLayout` prefers the SVG micro mark as `rel=icon`, with `.ico` fallback.
3. When the public product registry is empty, Hero / Header / NextStep / 404
   primary CTAs soft-land on Contact (Products nav remains honest).
4. `/products/` empty state drops internal jargon and offers Contact + About.
5. Stale “Task 4 BLOCKED” claims in launch-readiness / owner-domain evidence
   corrected to **LANDED (#61)**.

## Verification

- `pnpm test:architecture` (includes OG dark-pixel + favicon digest guards)
- `pnpm typecheck` / `pnpm lint` / `pnpm format:check`
- `pnpm build` / `pnpm check:client-budget` / `pnpm check:static-links`
- Playwright chromium smoke for shell / home / empty / motion

## Out of scope (still owner-gated)

- Production emails / `validate:public-truth` on Builds
- Issue #8 rulesets (`[]` by owner intent)
- Public product YAML promotion
- About photography
- Cursor GitHub App grant for `sgps-core` (optional; import already done)
