# Framework benchmark — Astro 7 vs Next 16.3 static

**Date:** 2026-09-04  
**Machine:** Node v24.20.0; fixture installs via pnpm 11.6.0; host PATH also exposes repository pnpm 9.15.9  
**Spec:** `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`  
**Plan task:** Task 1 of `docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`  
**Fixture location:** `.tmp/framework-benchmark/` (gitignored; deleted after this record)

## Fixture contract (identical content)

Both candidates rendered the same C1.1 fixture:

- Hero: BlueSkyz Labs; “We build products that make complex things feel naturally clear.”; Explore products; About BlueSkyz; shared R4d-style SVG symbol
- Product grid: 1 flagship + 2 secondary + 2 ecosystem cards with status + CTA
- Styling: Ink `#0B1020` / Porcelain `#F7F8FA` / Cobalt `#2568FF`; system font stack; Tailwind CSS 4 pipeline; no animation framework; no remote fonts

Astro fixture: Astro 7.3.1, `@tailwindcss/vite` 4.3.3, `output: "static"`, no React, no client directives.  
Next fixture: Next 16.3.3, React 19.2.8, App Router, `output: "export"`, `@tailwindcss/postcss` 4.3.3, no `"use client"`.

## Build timings (5 cold + 5 warm; median)

| Candidate        | Cold runs (ms)               | Cold median | Warm runs (ms)               | Warm median |
| ---------------- | ---------------------------- | ----------- | ---------------------------- | ----------- |
| ASTRO_7          | 2616, 2884, 2643, 2620, 2688 | **2643 ms** | 2599, 2629, 2623, 2644, 2680 | **2629 ms** |
| NEXT_16_3_STATIC | 6980, 6698, 6823, 6717, 6850 | **6823 ms** | 1895, 1906, 1918, 1882, 1880 | **1895 ms** |

## Asset bytes (production output)

| Metric                                                           | ASTRO_7 | NEXT_16_3_STATIC |
| ---------------------------------------------------------------- | ------: | ---------------: |
| HTML bytes                                                       |   2,269 |           25,815 |
| CSS bytes                                                        |  44,477 |           68,803 |
| Uncompressed JS bytes (all)                                      |       0 |          565,678 |
| Initial compressed JavaScript (gzip of index-referenced scripts) |   **0** |      **173,074** |
| Initial compressed JavaScript (brotli)                           |   **0** |      **149,008** |
| Critical asset bytes (HTML + CSS + referenced JS)                |  46,746 |          659,901 |
| Referenced initial JS files                                      |       0 |                6 |

## Browser / accessibility parity

Playwright + axe against local static output (`scripts/tmp-framework-browser-qa.mjs`, Chromium):

| Check                                        | ASTRO_7 | NEXT_16_3_STATIC |
| -------------------------------------------- | ------- | ---------------- |
| H1 visible without JS reveal                 | PASS    | PASS             |
| Explore products keyboard reachable          | PASS    | PASS             |
| Five product cards expose name/status/action | PASS    | PASS             |
| 320px no horizontal overflow                 | PASS    | PASS             |
| Reduced-motion keeps content                 | PASS    | PASS             |
| axe critical/serious                         | 0       | 0                |

## Lighthouse / lab performance

Chrome DevTools MCP `lighthouse_audit` (desktop navigation; performance category excluded by tool) + `performance_start_trace` on Cloudflare Workers Static Assets previews:

| Metric         | ASTRO_7 | NEXT_16_3_STATIC |
| -------------- | ------: | ---------------: |
| Accessibility  |     100 |              100 |
| Best Practices |     100 |              100 |
| SEO            |     100 |              100 |
| Observed LCP   |   79 ms |            88 ms |
| Observed CLS   |    0.00 |             0.00 |

Performance judgment for the promotion gate uses the measured initial JS + observed LCP/CLS rather than a missing LH performance category score from the MCP path.

## Cloudflare preview

Temporary Workers Static Assets deploys (same account as production Cloudflare token):

| Candidate        | Preview URL                                              | Index                           | Missing path |
| ---------------- | -------------------------------------------------------- | ------------------------------- | ------------ |
| ASTRO_7          | https://c11-bench-astro-tmp.thinhnguyen-km10.workers.dev | HTTP 200, hero/products present | HTTP 404     |
| NEXT_16_3_STATIC | https://c11-bench-next-tmp.thinhnguyen-km10.workers.dev  | HTTP 200, hero/products present | HTTP 404     |

Both previews are one-time evidence hosts and are deleted after this record is committed.

## Promotion gate evaluation

| #   | Gate                                                    | Result                                                              |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | No customer-experience regression                       | PASS — identical fixture content and browser checks                 |
| 2   | Accessibility and SEO parity or improvement             | PASS — both 100 / axe clean                                         |
| 3   | Clean Cloudflare deployment                             | PASS — Workers Static Assets deploy + 200/404                       |
| 4   | Browser/QA contracts remain portable                    | PASS — Playwright/axe ran against static dirs                       |
| 5   | Materially lower initial JS and/or complexity reduction | PASS — 0 B vs 173,074 B gzip initial JS; no React runtime           |
| 6   | Bounded migration effort                                | PASS — C1.1 plan already targets Astro; cold builds faster on Astro |

**Decision: ASTRO_7**
