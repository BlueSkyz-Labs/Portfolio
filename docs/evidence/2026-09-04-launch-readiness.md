# Launch Readiness — BlueSkyz Web V1 C1.1

Date: 2026-09-04  
Branch: `cursor/c1-1-astro-foundation-ea89`

Technical implementation of C1.1 Tasks 1–3 and 5–13 is complete on this branch. Task 4 (R4d asset import from `sgps-core`) remains blocked. Public production promotion remains blocked on owner/external truth — **do not treat technical green as launch approval**.

## Checklist

| Item                                                  | Status                                  | Evidence                                                                                                |
| ----------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| canonical corporate domain supplied                   | **BLOCKED — owner/evidence dependency** | `PUBLIC_SITE_URL` required by `validate:public-truth`; no invented production domain                    |
| no staging-domain metadata leakage                    | **PASS** (local/build)                  | Architecture + e2e SEO assert no `portfolio.tonydemo.com` hard-codes; canonical derives from `SITE.url` |
| public product inventory/status reviewed              | **PASS** (honest empty)                 | `docs/evidence/2026-09-04-public-product-audit.md` — all candidates HIDDEN                              |
| real public artifacts available for promoted products | **BLOCKED — owner/evidence dependency** | Zero public YAML entries                                                                                |
| all CTAs work                                         | **PASS**                                | Playwright shell/home; Explore products / About / trust routes                                          |
| founder/company copy approved                         | **BLOCKED — owner/evidence dependency** | Stub About/Contact copy only; no invented biography                                                     |
| privacy path factual/approved                         | **BLOCKED — owner/evidence dependency** | Route exists; legal text not owner-approved                                                             |
| support/contact works                                 | **BLOCKED — owner/evidence dependency** | Routes exist; emails require env                                                                        |
| security reporting works                              | **PASS** (repo)                         | `SECURITY.md` private vulnerability reporting; public security email env-gated                          |
| unsupported claims = 0                                | **PASS**                                | No Flagship Proof without evidence; empty registry                                                      |
| critical broken links = 0                             | **PASS** (agent routes)                 | Nav/footer routes resolve in e2e                                                                        |
| generated fake product proof = 0                      | **PASS**                                | No synthesized screenshots/marks beyond committed OG masterbrand raster                                 |

## External holds (unchanged)

- Draft PR **#33** (`/so-tro`) — owner-gated; do not merge.
- Issue **#8** main ruleset — owner-gated.
- DNS for `portfolio.tonydemo.com` — owner-gated; not used as canonical.
- Task 4: `BlueSkyz-Labs/sgps-core` not readable from this environment (HTTP 404).
- Human merge of PR **#42** / **#43** (agent token lacks merge permission).
- Disconnect or reconfigure legacy **Cloudflare Pages** Git integration (fails on Astro PRs; Workers is canonical).

## Promotion command (production, when unblocked)

```bash
pnpm install --frozen-lockfile
pnpm validate:public-truth
pnpm build
pnpm check:client-budget
```

Workers Builds should run that sequence on `main` with preview branches enabled. Do not re-create as GitHub Actions workload.

Evidence commit SHA: `79b97db4f5bf9a38bb362a8c80eec30c9733876b`
