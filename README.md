# BlueSkyz Labs — Portfolio

> **Quiet luxury, loud conviction.**
> A digital atelier. Built with restraint, materiality, and precision.

The official portfolio site for [BlueSkyz Labs](https://blueskyz.io), deployed to **[portfolio.tonydemo.com](https://portfolio.tonydemo.com)**.

---

## ✦ The Design

This is a **premium-grade** portfolio, not a template. The full design specification — every color, motion timing, spatial rule, accessibility target, and performance budget — lives in [`SPEC.md`](./SPEC.md). Read it first.

In short:

- **Quiet Luxury** aesthetic — the web equivalent of a bespoke Savile Row suit
- Palette: `#0A0A0A` · `#1A1A1A` · `#C9A962` (champagne) · `#F5F5F0` (off-white)
- Display: **Cormorant Garamond** · Body: **DM Sans**
- 8px spatial grid, generous whitespace
- Motion is restrained, reduced-motion aware, and budgeted alongside runtime performance

## ✦ Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 15.5.x (App Router, React Server Components, static export) |
| Runtime | React 19 |
| Language | TypeScript 5.6 (strict mode) |
| Styling | Tailwind CSS 4.3 via `@tailwindcss/postcss`, with the existing token config retained through the supported `@config` bridge |
| Animation | Framer Motion 11 via `LazyMotion` plus native `requestAnimationFrame` for lightweight scroll effects |
| Icons | Lucide React |
| Fonts | `next/font/google` (self-hosted at build time) |
| Testing | Node architecture tests + Playwright cross-browser/a11y + Lighthouse CI |
| Deploy | Cloudflare Pages static export (`out/`) |
| Domain | `portfolio.tonydemo.com` |

Exact dependency versions are pinned by [`package.json`](./package.json) and [`pnpm-lock.yaml`](./pnpm-lock.yaml); those files are authoritative when this summary and the lockfile differ.

## ✦ Project Structure

```text
.
├── SPEC.md                    # Product/design truth
├── README.md                  # Repository entry point
├── package.json
├── next.config.ts
├── tailwind.config.ts         # Design tokens consumed through Tailwind v4 @config bridge
├── postcss.config.mjs         # Tailwind v4 PostCSS integration
├── playwright.config.ts
├── lighthouserc.json
├── wrangler.toml              # Cloudflare Pages deployment contract
├── .env.example               # Environment template only; never commit secrets
├── .github/workflows/qa.yml   # Blocking repository QA workflow
├── src/
│   ├── app/                   # App Router entry points + global CSS
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives
│   │   ├── layout/            # Header, Footer, Nav, Container
│   │   ├── providers/         # Client-side providers with bounded JS cost
│   │   └── sections/          # Home-page narrative sections
│   ├── lib/                   # Constants, utilities, motion feature loading
│   └── types/                 # Shared domain types
├── tests/
│   ├── architecture/          # Architecture/security/deploy/bundle contracts
│   └── e2e/                   # Cross-browser, runtime and accessibility coverage
├── scripts/                   # Static-export and bundle verification tools
├── public/                    # Static assets + Cloudflare response headers
└── docs/                      # QA strategy, decisions and implementation plans
```

## ✦ Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

### Install & Develop

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Local development runs at `http://localhost:3000` by default.

### Quality Gates

Use the same gates CI relies on rather than a reduced local subset:

```bash
pnpm audit --prod --audit-level=high
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm test:e2e
pnpm lighthouse
```

The production bundle contract includes both a **hard initial-route JavaScript budget below 120 kB** and an exact-base regression guard. Do not weaken either gate to make a change pass.

## ✦ Deployment

Cloudflare Pages serves the verified static Next.js export.

1. Connect this repository to the `blueskyz-labs-portfolio` Cloudflare Pages project.
2. Build command: `pnpm install --frozen-lockfile && pnpm build`.
3. Build output: `out`.
4. Production branch: `main`; pull requests use preview deployments.
5. Add `portfolio.tonydemo.com` as the production custom domain.

`wrangler.toml`, `next.config.ts`, `scripts/verify-static-export.mjs`, `tests/architecture/cloudflare-pages.test.mjs`, and `public/_headers` together define and verify the deployment contract.

## ✦ Engineering Decisions

Architectural and product decisions live in [`docs/decisions/`](./docs/decisions/). Implementation plans and convergence evidence live in [`docs/superpowers/plans/`](./docs/superpowers/plans/).

The repository follows a PR-first promotion discipline: review the exact candidate, require fresh QA evidence, preserve the performance/security budgets, and merge only the verified head.

> Repository note: GitHub branch protection/rulesets are account-level controls and must remain aligned with this documented promotion discipline. The repository itself cannot substitute CI conventions for an enforced ruleset.

## ✦ License

UNLICENSED — proprietary to BlueSkyz Labs.

---

Built with the discipline of a master tailor.
