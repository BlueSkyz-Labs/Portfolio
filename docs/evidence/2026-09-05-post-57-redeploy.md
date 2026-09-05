# Live Workers redeploy after #57 — 2026-09-05

## Context

PR **#57** landed trust/SEO/truth hardening on `main` (`672a520`). Workers Builds
Git Connect still empty (`total_count=0`), so agent recovery redeploy kept the
live surface current.

## Action

```bash
PUBLIC_SITE_URL=https://blueskyz-web.thinhnguyen-km10.workers.dev pnpm deploy:workers
```

Deploy version ID: `ca41a2de-52b5-4b80-9dcb-1090362051c6`

## Verify

```text
GET /
  → Featured empty CTA is "Contact" (not "Explore all products")
  → "No public products are published yet…"
  → title "BlueSkyz Labs" (no "Home ·")
  → HSTS max-age + includeSubDomains (no preload)
  → X-Robots-Tag: noindex
GET /contact/
  → "Email addresses appear here when BlueSkyz publishes them."
  → no PUBLIC_* / environment jargon
GET /support/
  → corporate support email empty-state without env jargon
GET /privacy/
  → practical what/why/how/deletion summary
GET /sitemap.xml
  → empty <urlset> (non-production identity)
GET /missing-path/
  → meta robots noindex,nofollow
```

## Remaining (unchanged external)

- Workers Builds Connect
- Issue #8 ruleset
- R4d / sgps-core read access
- Canonical corporate domain + production emails
