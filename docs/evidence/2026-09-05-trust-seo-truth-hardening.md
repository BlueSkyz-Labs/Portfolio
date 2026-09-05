# Trust / SEO / truth hardening — 2026-09-05

Independent red-team falsified the prior “in-repo material work exhausted”
checkpoint. Agent-safe P1 closed in this pass:

| Finding                                                                                                                     | Fix                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Customer surfaces used ops jargon (`environment is configured`, `owner review`, `inclusion gates`, `approved public truth`) | Neutral customer copy on contact/support/privacy/about/products                                             |
| Empty featured house still pushed “Explore all products” dead-end                                                           | Empty state CTA → Contact; Explore gated to non-empty registry                                              |
| Claim URL gate accepted `*.pages.dev` / `*.tonydemo.com` / trailing-dot FQDNs                                               | `isNonProductionSiteUrl` denylist + trailing-dot normalize                                                  |
| CTA truth only blocked `development` + primary `try`                                                                        | Ban `try` for concept/prototype/development on primary+secondary; ban `try` when availability is `waitlist` |
| 404 omitted `noindex` once production `PUBLIC_SITE_URL` is set                                                              | `noindex={true}` on 404                                                                                     |
| Non-prod sitemap still emitted absolute `<loc>` entries                                                                     | Empty urlset when `isNonProductionSiteUrl(SITE.url)`                                                        |
| Early redeploy evidence still recorded HSTS `preload`                                                                       | Corrected to match `_headers` / SECURITY.md (no preload)                                                    |
| Endorsement all-caps / raw audience enums / “Customer jobs”                                                                 | Sentence-case endorsement; human labels; “What it’s for”                                                    |
| External CTAs lacked `rel="noopener noreferrer"`                                                                            | ButtonLink + ProductCard external rel                                                                       |

Regression: architecture + e2e assertions for jargon bans, empty featured CTA,
staging-host claim URLs, Try coherence, 404 noindex, non-prod empty sitemap,
HSTS preload deferral.

## Verification (this SHA)

```text
pnpm typecheck          PASS
pnpm lint               PASS
pnpm format:check       PASS
pnpm build              PASS
pnpm check:client-budget PASS (0 < 120000)
pnpm check:static-links PASS
pnpm test:architecture  PASS (73)
pnpm exec playwright test --project=chromium --project=firefox --project=mobile-chromium
                        PASS (96)
webkit                  BLOCKED in this VM — missing host libs (apt mirror flaky);
                        not a product regression; full matrix remains the promotion target
```

## Remaining external blockers (unchanged)

- Workers Builds Git Connect (`total_count=0`)
- Issue #8 main ruleset
- R4d / `sgps-core` read access
- Canonical corporate domain + production emails + legal/founder assets
