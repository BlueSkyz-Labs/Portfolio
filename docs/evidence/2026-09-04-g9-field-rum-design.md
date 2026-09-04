# Field INP / RUM design (G9) — privacy-conscious, non-blocking

Date: 2026-09-04  
Status: **Design only** — not a merge/promotion gate until owner enables measurement.

## Goal

Observe field responsiveness (INP) and Core Web Vitals without invasive tracking,
session recording, fingerprinting, or ad pixels (C1.1 §7.7).

## Preferred candidate

Cloudflare Web Analytics (first-party / platform) if it meets:

- page/product view
- product CTA / contact intent (events only when needed)
- basic device/referrer/performance aggregation
- no third-party ad scripts
- CSP widen documented in `SECURITY.md` before enable

## Explicit non-goals (V1)

- session replay
- canvas/audio fingerprinting
- cross-site advertising pixels
- consent UI beyond what the chosen analytics product legally requires

## Promotion rule

Field INP/RUM remains advisory until:

1. Owner enables the analytics product on production domain
2. CSP / `_headers` updated with the exact approved source
3. A documented review of collected fields vs §7.7

Local Lighthouse lab metrics and Playwright remain the current required gates.
