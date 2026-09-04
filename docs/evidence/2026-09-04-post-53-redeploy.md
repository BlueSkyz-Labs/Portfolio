# Live Workers redeploy after #53 — 2026-09-04

## Context

PR **#53** hardened public-truth / https product URLs / support recourse CTAs
and landed on `main` (`5fbd48b`). Workers Builds Git Connect still empty
(`total_count=0`), so agent recovery redeploy kept the live surface current.

## Action

```bash
PUBLIC_SITE_URL=https://blueskyz-web.thinhnguyen-km10.workers.dev pnpm deploy:workers
```

Deploy version ID: `1560be49-851c-4e2f-9460-8f046b057734`

## Verify

```text
GET /support/
  → Contact BlueSkyz → /contact/
  → Security reporting → /security/
  → min-h-11 touch targets present
GET /
  → HSTS + CSP + extended Permissions-Policy
  → X-Robots-Tag: noindex
  → canonical https://blueskyz-web.thinhnguyen-km10.workers.dev/
```

## Remaining (unchanged external)

- Workers Builds Connect
- Issue #8 ruleset
- R4d / sgps-core read access
- Canonical corporate domain + production emails
