# BlueSkyz Labs — Web

> **Porcelain-first, trust-forward.**  
> Public front door for BlueSkyz Labs products — C1.1 Hybrid Product House.

Canonical design: [`docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`](./docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md)  
Implementation plan: [`docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`](./docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md)  
Framework decision: [`docs/decisions/0004-web-framework-selection.md`](./docs/decisions/0004-web-framework-selection.md) (`ASTRO_7`)

## Stack

| Layer     | Tech                                                 |
| --------- | ---------------------------------------------------- |
| Framework | Astro 7 (static output)                              |
| Language  | TypeScript 6 (strict)                                |
| Runtime   | Node.js 24.20.0 LTS for build/tooling                |
| Package   | pnpm 11.6.0                                          |
| Styling   | Tailwind CSS 4 via `@tailwindcss/vite`               |
| Testing   | Node architecture tests + Playwright + Lighthouse CI |
| Deploy    | Cloudflare Workers Static Assets (`dist/`)           |

## Commands

```bash
pnpm install --frozen-lockfile
pnpm test:e2e:install
pnpm dev
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
pnpm check:static-links
pnpm test:architecture
pnpm test:e2e
pnpm lighthouse
pnpm validate:public-truth
```

Local source gate (pre-commit): architecture → typecheck → lint → format → build → client budget → static links.

`pnpm test:e2e:install` installs Playwright browser binaries (not covered by `pnpm install`). One-shot Workers deploy: set `PUBLIC_SITE_URL` then `pnpm deploy:workers` — prefer Workers Builds Git Connect for ongoing promotion.

## Promotion

```text
feature branch → local source gate → PR → Cloudflare Workers preview
  → Playwright/axe + Lighthouse + E4 → merge main
  → production truth gate/build → post-deploy smoke
```

GitHub remains source control and PR review. Required long-run CI compute is intentionally not GitHub Actions — see ADR 0002 / ADR 0004 / C1.1 Task 13.

## License

UNLICENSED — proprietary to BlueSkyz Labs.
