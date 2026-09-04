# E4 Web Validation — 2026-09-04

Candidate branch: `cursor/c1-1-astro-foundation-ea89`  
Recorded after Tasks 11–13 (SEO, motion/budget/CSP, QA alignment).  
Exact SHA filled at commit time in launch-readiness companion.

## Automated gate

| Gate                                                                         | Result                                                    |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| `pnpm test:architecture`                                                     | PASS (25)                                                 |
| `pnpm typecheck`                                                             | PASS (hints only: Zod `.url()` deprecation; non-blocking) |
| `pnpm lint`                                                                  | PASS                                                      |
| `pnpm format:check`                                                          | PASS                                                      |
| `pnpm build`                                                                 | PASS → `dist/`                                            |
| `pnpm check:client-budget`                                                   | PASS — **0** Brotli bytes local JS on `/` (`< 120000`)    |
| Playwright Chromium (foundation + shell + home-c1 + products + seo + motion) | PASS — 12/12                                              |
| Lighthouse CI (3 desktop runs, Astro preview)                                | PASS                                                      |

### Lighthouse lab (median of 3)

| Metric         | Value       |
| -------------- | ----------- |
| Performance    | 1.00        |
| Accessibility  | 0.94        |
| Best Practices | 1.00        |
| SEO            | 1.00        |
| LCP            | ~243–245 ms |
| CLS            | 0           |
| TBT            | 0           |

Lab LCP budget in `lighthouserc.json` set to **2500 ms** to match the field p75 contract (≤2.5s) rather than the retired Next-era 1200 ms First Load proxy.

## Browser / viewport notes (agent)

- Chromium e2e covers reduced-motion hero visibility and 320px overflow on homepage.
- Full cross-browser matrix (Firefox/WebKit/mobile) remains part of `pnpm test:e2e` and should be re-run on the final promotion SHA.
- Live Workers preview previously deployed without Task 11–12 artifacts; redeploy after merge/push of this SHA to refresh CSP/robots/sitemap.

## Customer task findings (agent walkthrough)

| #   | Task                                | Finding                                                               |
| --- | ----------------------------------- | --------------------------------------------------------------------- |
| 1   | Five-second: What does BlueSkyz do? | Clear — proposition + short supporting sentence.                      |
| 2   | Find a relevant product             | Honest empty registry — no invented products.                         |
| 3   | Usable now?                         | N/A until a public product is evidence-approved.                      |
| 4   | Find help/support                   | Footer + `/support/` present.                                         |
| 5   | Who is responsible?                 | About + Contact routes present; emails env-gated.                     |
| 6   | Why products belong together        | One House section explains house framing without fake inventory.      |
| 7   | Exaggerated/fake?                   | No flagship proof without evidence; empty products state is explicit. |

## Visual red team (agent)

| Probe                              | Result                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Blur hierarchy                     | Type scale + spacing still carry hierarchy without effects.                                                                    |
| Grayscale                          | Ink/Porcelain contrast remains; Cobalt is accent-only.                                                                         |
| No Cobalt                          | Layout still readable; CTAs remain button-shaped.                                                                              |
| No logo                            | Text lockup only (Task 4 R4d mark still blocked).                                                                              |
| Competitor-logo thought experiment | Porcelain + Ink + Cobalt + proposition copy remain distinctive vs generic purple-gradient SaaS; mark import still outstanding. |

## Defects fixed in this pass

- None P0/P1 beyond planned Task 11–13 work.
- Legacy Pages Git check may still fail on PRs until disconnected — documented, not a Workers contract failure.

Recorded git SHA (docs commit follows): `008424fc1829ebf0ff272710323c5c7ada8f1c96`

Follow-up: local SITE.url fallback auto-noindexes and Disallow robots; Workers preview redeployed with PUBLIC_SITE_URL=https://blueskyz-web.thinhnguyen-km10.workers.dev; workers.dev responses carry X-Robots-Tag: noindex.
