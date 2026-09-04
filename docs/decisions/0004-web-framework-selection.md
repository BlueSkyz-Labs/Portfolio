# ADR 0004 — BlueSkyz Web V1 Framework Selection

Decision: ASTRO_7
Date: 2026-09-04
Spec: docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md
Evidence: docs/evidence/2026-09-04-framework-benchmark.md
Cold build median: ASTRO_7 2643 ms; NEXT_16_3_STATIC 6823 ms
Warm build median: ASTRO_7 2629 ms; NEXT_16_3_STATIC 1895 ms
Initial compressed JavaScript: ASTRO_7 0 B gzip / 0 B brotli; NEXT_16_3_STATIC 173074 B gzip / 149008 B brotli
Critical asset bytes: ASTRO_7 46746; NEXT_16_3_STATIC 659901
Lighthouse performance: lab LCP ASTRO_7 79 ms / NEXT_16_3_STATIC 88 ms; CLS 0.00 both (Chrome DevTools performance_start_trace on Workers previews; LH performance category unavailable on MCP lighthouse_audit path)
Accessibility parity: both PASS (axe critical/serious 0; LH accessibility/best-practices/SEO 100/100/100)
Cloudflare preview: both PASS Workers Static Assets deploy (c11-bench-astro-tmp / c11-bench-next-tmp workers.dev; index 200; missing path 404)
Migration effort: bounded — C1.1 implementation plan Tasks 2–14 already designed for Astro static + Workers; Astro cold builds ~2.6× faster than Next cold; Astro removes React/Framer from the default path
Rationale: On an identical C1.1 Hero + product-grid fixture, Astro 7 ships zero initial JavaScript while Next 16.3 static still emits ~173 kB gzip of referenced scripts, with equal accessibility/SEO browser parity and clean Cloudflare Workers Static Assets deploys, so Astro satisfies every Task 1 promotion gate including materially lower initial JS.
Rollback: An Astro regression before public launch reverts the migration and returns to Next 16.3 static from the same canonical C1.1 spec, regenerating a replacement plan before further migration work.
