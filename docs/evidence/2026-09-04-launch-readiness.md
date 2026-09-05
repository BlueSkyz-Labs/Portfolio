# Launch Readiness — BlueSkyz Web V1 C1.1

Date: 2026-09-04  
Branch: `main` (post-#47)

Technical implementation of C1.1 Tasks 1–3 and 5–14 are complete on `main`. Task 4 (R4d asset import from `sgps-core`) **LANDED** on 2026-09-05 via #61 (`28dbbc7e…`); Cursor GitHub App still omits `sgps-core` (optional follow-up). Public production promotion remains blocked on owner/external truth — **do not treat technical green as launch approval**.

## Checklist

| Item                                                  | Status                                  | Evidence                                                                                                                         |
| ----------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| canonical corporate domain supplied                   | **BLOCKED — owner/evidence dependency** | `PUBLIC_SITE_URL` required by `validate:public-truth`; no invented production domain                                             |
| no staging-domain metadata leakage                    | **PASS** (local/build)                  | Architecture + e2e SEO assert no `portfolio.tonydemo.com` hard-codes; canonical derives from `SITE.url`                          |
| public product inventory/status reviewed              | **PASS** (honest empty)                 | `docs/evidence/2026-09-04-public-product-audit.md` — all candidates HIDDEN                                                       |
| real public artifacts available for promoted products | **BLOCKED — owner/evidence dependency** | Zero public YAML entries                                                                                                         |
| all CTAs work                                         | **PASS** (email-aware Act)              | Empty registry + empty email soft-lands About/Security; Contact when email exists — see `2026-09-05-act-path-workers-noindex.md` |
| founder/company copy approved                         | **BLOCKED — owner/evidence dependency** | Stub About/Contact copy only; no invented biography                                                                              |
| privacy path factual/approved                         | **BLOCKED — owner/evidence dependency** | Route exists; legal text not owner-approved                                                                                      |
| support/contact works                                 | **PARTIAL**                             | Routes exist; Security advisory works; business mailto **BLOCKED** until emails                                                  |
| security reporting works                              | **PASS** (repo)                         | `SECURITY.md` private vulnerability reporting; public security email env-gated                                                   |
| unsupported claims = 0                                | **PASS**                                | No Flagship Proof without evidence; empty registry                                                                               |
| critical broken links = 0                             | **PASS** (agent routes)                 | Nav/footer routes resolve in e2e                                                                                                 |
| generated fake product proof = 0                      | **PASS**                                | No synthesized screenshots/marks beyond committed OG masterbrand raster                                                          |

## External holds (unchanged)

- PR **#33** (`/so-tro`) — **CLOSED** (superseded by Astro C1.1; do not reopen/merge).
- Issue **#8** main ruleset — owner-gated.
- DNS for `portfolio.tonydemo.com` — owner-gated; not used as canonical.
- Task 4: R4d import **LANDED** 2026-09-05 (#61) from `sgps-core` `28dbbc7e…` via `PORTFOLIO_GITHUB_TOKEN`. Cursor App selected-repos still omits `sgps-core` (optional). See `docs/evidence/2026-09-05-r4d-sgps-core-import.md`.
- PRs **#42** / **#43** / **#44** landed on `main` (C1.1 foundation + SoT doc sync).
- Legacy **Cloudflare Pages** project `blueskyz-labs-portfolio`: Git deployments disabled 2026-09-04 (Workers is canonical). See `docs/evidence/2026-09-04-pages-disable.md`.

## Promotion command (production, when unblocked)

```bash
pnpm install --frozen-lockfile
pnpm validate:public-truth
pnpm build
pnpm check:client-budget
pnpm check:static-links
```

Workers Builds should run that sequence on `main` with preview branches enabled. Do not re-create as GitHub Actions workload.

Evidence commit SHA (foundation): historical; current `main` HEAD supersedes for promotion checks.

## Post-foundation convergence (2026-09-04 experience pass)

Landed via #46 (merged):

- `/products/[slug]/` static profiles + card deep-links + sitemap slug URLs
- C1.1 OG/favicon generator (no Quiet Luxury gold) + regenerated social assets
- Porcelain atmosphere / brand-signal hero (R4d symbol + live text lockup landed #61; favicon/OG now rasterize committed R4d SVG)
- Trust-route Playwright matrix + architecture guards
- ADR 0001 marked superseded; remaining-convergence refreshed
- Workers Builds gap recorded (`docs/evidence/2026-09-04-workers-builds-gap.md`)

Public promotion blockers above remain unchanged except live Workers drift,
which was closed by Wrangler redeploy on 2026-09-04
(`docs/evidence/2026-09-04-workers-redeploy.md`). Workers Builds Git Connect
**CLOSED** 2026-09-05 (`docs/evidence/2026-09-05-workers-builds-connected.md`).

## Security/Experience hardening pass (same branch)

- Removed invented `hello@blueskyz.io` from package metadata
- HSTS + tighter Permissions-Policy; deleted Next `serve-static` residual
- Content motion no longer fades opacity (LCP-safe); capped motion; solid header; Ink footer
- Contact lanes structured; workers.dev auto-noindex; axe + 404/empty e2e
- Permission blockers documented in `docs/evidence/2026-09-04-permission-blockers.md`
