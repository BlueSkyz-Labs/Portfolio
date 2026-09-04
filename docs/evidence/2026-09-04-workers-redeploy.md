# Live Workers redeploy — 2026-09-04

## Finding (before)

Worker `blueskyz-web` (`8a8fece25ca94b0cb05bcabac63c9020`) was last
`modified_on` ≈ `2026-09-04T02:08:32Z` and served a **pre-#46** surface
(no advisory CTA; weaker `Permissions-Policy`; no HSTS) while `main` already
contained post-#48 trust/security HTML + `_headers`.

Workers Builds Git Connect remained empty (`total_count=0`).

## Action (agent)

`CLOUDFLARE_API_TOKEN` became available in the Cloud Agent environment.
Redeployed Static Assets from the Astro `dist/` build via Wrangler:

1. First deploy without `PUBLIC_SITE_URL` → live security CTA + headers restored,
   but HTML canonical accidentally baked as `http://localhost:4321`.
2. Immediate rebuild/redeploy with
   `PUBLIC_SITE_URL=https://blueskyz-web.thinhnguyen-km10.workers.dev`
   (factual workers.dev host; not an invented corporate domain).

Deploy version IDs:

- `365a676b-abd3-499b-8846-63991824bec7` (first)
- `3a4bd271-6b6c-4c1b-ad2a-d28d370eab54` (canonical-corrected)

## Verify (after)

```text
GET https://blueskyz-web.thinhnguyen-km10.workers.dev/security/
  → 200
  → body contains "Open private vulnerability reporting"
  → href https://github.com/BlueSkyz-Labs/SGPS-Marketing/security/advisories/new
  → Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  → Permissions-Policy includes payment=(), usb=(), interest-cohort=()
  → canonical https://blueskyz-web.thinhnguyen-km10.workers.dev/security/
  → X-Robots-Tag: noindex (workers.dev non-production)
```

Worker `modified_on` advanced past the pre-#46 timestamp after redeploy.

## Remaining

- **Workers Builds Git Connect** still required for ongoing PR/main promotion
  (agent redeploy is a one-shot recovery path, not the ADR 0002 steady state).
  Deep link:
  https://dash.cloudflare.com/0dd046dab63171c38a6548642bc9f2d4/workers/services/view/blueskyz-web/settings
- Canonical **corporate** HTTPS domain + production emails remain owner-gated
  (`validate:public-truth`).
- Prefer Builds Connect over long-lived agent deploy tokens for day-to-day shipping.
