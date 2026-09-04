# Trust / UX hardening — 2026-09-04

Independent red-team falsified the prior “in-repo material work exhausted”
checkpoint. Agent-safe P1/P2 closed in this pass:

| Finding                                          | Fix                                        |
| ------------------------------------------------ | ------------------------------------------ |
| `/products/` leaked `docs/evidence`              | Customer-safe empty copy                   |
| Contact empty-state exposed env var names        | Neutral configuration-state copy           |
| Privacy lacked §7.4 practical summary            | What/why/how/deletion factual bullets      |
| Support had no corporate email fallback          | `SITE.contactEmail` mailto when set        |
| Profile rendered internal lifecycle/availability | Public `publicLabel` + platforms/audience  |
| Schema allowed incoherent public maturity        | `PUBLIC_LABEL_COHERENCE` + private ban     |
| Proof/action URLs allowed preview hosts          | Reject non-production claim hosts          |
| `--text-muted` failed WCAG AA on Porcelain       | `#475569` (≥4.5:1)                         |
| HSTS `preload` before canonical domain           | Deferred; keep max-age + includeSubDomains |
| JSON-LD `set:html` breakout brittleness          | `safeJsonLd` escapes `<`                   |
| Status chrome pills/all-caps                     | Radius card + sentence case                |
| Featured empty teased “audit under review”       | Honest empty copy                          |
| Duplicate `public/og-image.png`                  | Canonical `/social/og-default.png` only    |

Regression: `tests/architecture/customer-copy-hygiene.test.mjs` + e2e bans.

## Remaining external blockers (unchanged)

- Workers Builds Git Connect (`total_count=0`)
- Issue #8 main ruleset
- R4d / `sgps-core` read access
- Canonical corporate domain + production emails + legal/founder assets
