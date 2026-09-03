# 0002 — Cloudflare-first CI economics

- **Status:** Accepted
- **Date:** 2026-09-03
- **Deciders:** Autonomous SGPS convergence (inferred from operating brief + SPEC §6.5)

## Context

GitHub Actions currently runs a full QA matrix on every PR and an additional
rebuild + Edge-UA smoke after every `main` push. Deploy already happens on
Cloudflare Pages. Long-lived CI cost and Actions minutes are not aligned with
the project's Cloudflare-first deploy model.

Playwright + Lighthouse cannot run inside a Cloudflare Worker (CPU/memory and
browser runtime). Workers remain ideal for edge product logic, not browser QA.

## Decision

1. **Cloudflare Pages** remains the authoritative build/deploy surface for the
   static `out/` artifact (preview + production).
2. **GitHub Actions** retains only the evidence gates that cannot yet move:
   architecture, lint/typecheck, exact-base G5, Playwright, Lighthouse — until
   an external/self-hosted or Cloudflare Containers runner can host browsers.
3. **Post-merge Edge smoke** must not rebuild the site. It verifies the live
   production URL (or the Pages production host) under an Edge user-agent,
   reducing duplicate Actions compute.
4. No new GitHub Actions automation is added when Cloudflare Pages, Workers,
   or agent-local verification can provide equivalent evidence more cheaply.

## Consequences

- Edge smoke becomes deploy-coupled: it fails closed if production is
  unreachable, which is desirable for post-merge confidence.
- Future browser QA migration targets self-hosted/Cloudflare Containers, not
  Workers CPU for Playwright.
- Repository docs and architecture tests must describe this hybrid honestly.
