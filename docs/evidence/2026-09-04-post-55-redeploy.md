# Live Workers redeploy after #55 — 2026-09-04

## Context

PR **#55** landed trust/UX hardening on `main` (`9c86cb0`). Workers Builds
Git Connect still empty (`total_count=0`), so agent recovery redeploy kept the
live surface current.

## Action

```bash
PUBLIC_SITE_URL=https://blueskyz-web.thinhnguyen-km10.workers.dev pnpm deploy:workers
```

Deploy version ID: `ee7bd9ad-2460-430f-8931-6d5373226c45`

## Verify

```text
GET /products/
  → "No public products are published yet…"
  → no docs/evidence
GET /contact/
  → "Business email publishes when this environment is configured."
  → no PUBLIC_* env names
GET /privacy/
  → What is collected / Deletion and product privacy
GET /support/
  → corporate support email empty-state + Contact/Security CTAs
GET /
  → HSTS max-age + includeSubDomains (no preload)
  → X-Robots-Tag: noindex
  → --text-muted: #475569
```

## Remaining (unchanged external)

- Workers Builds Connect
- Issue #8 ruleset
- R4d / sgps-core read access
- Canonical corporate domain + production emails
