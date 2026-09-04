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
pnpm dev
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm test:architecture
pnpm test:e2e
pnpm lighthouse
```

## Deployment

Cloudflare Workers Static Assets serves the Astro `dist/` artifact (`wrangler.toml`).

GitHub remains source control and PR review. Required long-run CI compute is intentionally not GitHub Actions — see ADR 0002 / ADR 0004 / C1.1 Task 3.

## License

UNLICENSED — proprietary to BlueSkyz Labs.
