# BlueSkyz Labs — Portfolio

> **Quiet luxury, loud conviction.**
> A digital atelier. Built with restraint, materiality, and precision.

The official portfolio site for [BlueSkyz Labs](https://blueskyz.io), deployed to **[portfolio.tonydemo.com](https://portfolio.tonydemo.com)**.

---

## ✦ The Design

This is a **premium-grade** portfolio, not a template. The full design specification — every color, every motion timing, every spatial rule — lives in [`SPEC.md`](./SPEC.md). Read it first.

In short:

- **Quiet Luxury** aesthetic — the web equivalent of a bespoke Savile Row suit
- Palette: `#0A0A0A` · `#1A1A1A` · `#C9A962` (champagne) · `#F5F5F0` (off-white)
- Display: **Cormorant Garamond** · Body: **DM Sans**
- 8px spatial grid, generous whitespace
- All motion 200–400ms, `cubic-bezier(0.16, 1, 0.3, 1)`

## ✦ Stack

| Layer     | Tech                                                  |
| --------- | ----------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, RSC)    |
| Language  | TypeScript 5 (strict mode)                            |
| Styling   | Tailwind CSS 3 + CSS variables                        |
| UI        | [shadcn/ui](https://ui.shadcn.com) + Radix primitives |
| Animation | [Framer Motion](https://www.framer.com/motion/)       |
| Icons     | [Lucide](https://lucide.dev)                          |
| Fonts     | `next/font/google` (self-hosted)                      |
| Deploy    | [Cloudflare Pages](https://pages.cloudflare.com)      |
| Domain    | `portfolio.tonydemo.com`                              |

## ✦ Project Structure

```
.
├── SPEC.md                    # The design bible (read first)
├── README.md                  # This file
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── wrangler.toml
├── .env.example               # Environment template
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, fonts, metadata
│   │   ├── page.tsx           # Home (composition of sections)
│   │   ├── globals.css        # Tailwind + design tokens
│   │   └── not-found.tsx      # 404
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layout/            # Header, Footer, Nav
│   │   └── sections/          # Hero, Work, Process, About, Contact
│   ├── lib/
│   │   ├── utils.ts           # cn() helper, utilities
│   │   └── constants.ts       # Site config
│   └── types/
│       └── index.ts           # Shared TS types
├── public/                    # Static assets
└── docs/
    └── decisions/             # SGPS-style decision log
```

## ✦ Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm install -g pnpm`)

### Install & Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # → http://localhost:3000
```

### Quality Gates

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm format:check # prettier
pnpm build        # production build
```

## ✦ Deployment

Cloudflare Pages — static Next.js export, automatic through the connected Pages project.

1. Connect this repo to the `blueskyz-labs-portfolio` Cloudflare Pages project
2. Build command: `pnpm install --frozen-lockfile && pnpm build`
3. Build output: `out`
4. Production branch: `main`; other branches and pull requests use Pages preview deployments
5. Add the custom domain `portfolio.tonydemo.com` in the Cloudflare dashboard

`wrangler.toml` declares the Pages project and build output. `public/_headers` carries the static security and cache headers that ship with the exported artifact.

## ✦ Decisions

Architectural decisions are recorded in [`docs/decisions/`](./docs/decisions/) using a lightweight SGPS format. Add a new file (`NNNN-short-slug.md`) for every meaningful decision. The current one:

- [`0001-quiet-luxury-aesthetic.md`](./docs/decisions/0001-quiet-luxury-aesthetic.md)

## ✦ License

UNLICENSED — proprietary to BlueSkyz Labs.

---

Built with the discipline of a master tailor.
