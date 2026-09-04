# 0002 — Cloudflare-first CI economics

- **Status:** Accepted (amended 2026-09-04)
- **Date:** 2026-09-03
- **Deciders:** Autonomous SGPS convergence (inferred from operating brief + C1.1 SoT)
- **Amends:** Hosting path updated by ADR 0004 + C1.1 Task 3 (`ASTRO_7` → Workers Static Assets)

## Context

Long-lived GitHub Actions minutes are not aligned with a Cloudflare-first deploy
model. Browser QA (Playwright + Lighthouse) cannot run inside a Cloudflare Worker
CPU budget; Workers remain ideal for edge product logic and static asset hosting,
not browser automation.

## Decision

1. **Cloudflare Workers Static Assets** is the authoritative build/deploy surface
   for the Astro static `dist/` artifact (preview + production). Legacy Cloudflare
   Pages Git integration for this repository is superseded and should be
   disconnected or redirected.
2. **Cloudflare Workers Builds** is the preferred remote build/promotion path
   (`pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget && pnpm check:static-links` on `main`; preview branches may omit the truth gate when production env is intentionally absent).
3. **GitHub** remains source control + PR review. Do not reintroduce required
   GitHub Actions workload when Cloudflare or agent-local verification suffices.
4. **Local source gate** (`.githooks/pre-commit`) is canonical before PR:
   architecture, typecheck, lint, format, build, client-JS budget, static links.
5. Browser/Lighthouse evidence runs agent-locally or against Cloudflare previews;
   do not invent production domain/email values to force a green production gate.

## Consequences

- Failing legacy Pages checks on Astro PRs are expected until Pages is disconnected.
- Production promotion stays blocked on owner-supplied `PUBLIC_SITE_URL` /
  contact / security emails and evidence-backed public products.
- ADR 0004 (`ASTRO_7`) and `docs/QA_STRATEGY.md` are the operational companions
  to this decision.
