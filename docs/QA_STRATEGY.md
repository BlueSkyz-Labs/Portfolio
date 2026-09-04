# QA Strategy — BlueSkyz Labs Web (C1.1)

> **Project:** BlueSkyz Labs Web — Astro 7 static, Tailwind CSS 4, TypeScript 6
> **Product/design source of truth:** [`docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`](./superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md)
> **Status:** Living engineering-assurance document for the Astro + Workers Static Assets contract.

---

## 1. Mission

Protect product truth and trust with deterministic, reviewable promotion evidence. A change is not safe because it "looks fine": the exact candidate SHA must satisfy the applicable gates.

Core principles:

- **PR-first promotion.** Develop on a feature branch; promote through a pull request.
- **Exact-head evidence.** A green run belongs to the commit SHA it tested.
- **Do not weaken gates to land a change.** Fix the root cause or escalate a product/risk decision.
- **Static-export truth.** Browser and Lighthouse tests exercise the same `dist/` artifact Workers Static Assets serve.
- **Cloudflare-native remote compute.** GitHub remains source + PR review; do not reintroduce required GitHub Actions workload.

---

## 2. Local canonical source gate

`.githooks/pre-commit` runs:

```text
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm check:client-budget
```

Full Playwright matrix and Lighthouse are promotion/preview evidence, not every-commit hooks.

---

## 3. Client JS budget (G5 replacement)

`pnpm check:client-budget` reads `dist/index.html`, Brotli-compresses referenced local `.js` files, and fails at `>= 120000` bytes. Next.js First Load JS log parsing is retired.

---

## 4. Browser / a11y / perf

- Playwright: Chromium, Firefox, WebKit, mobile Chromium (`pnpm test:e2e`)
- Optional remote target: `PLAYWRIGHT_BASE_URL`
- Local server: `pnpm start` (Astro preview on `127.0.0.1:3000`)
- Lighthouse CI: three desktop runs against Astro preview; categories ≥0.90; CLS ≤0.05

---

## 5. Cloudflare promotion flow

```text
feature branch
  → local source gate
  → PR
  → Cloudflare Workers preview (Workers Builds)
  → Playwright/axe + Lighthouse + E4 review
  → merge main
  → production truth gate + build (`validate:public-truth` + build + client budget)
  → post-deploy smoke
```

### Workers Builds (dashboard)

Production:

```text
repo: BlueSkyz-Labs/SGPS-Marketing
branch: main
command: pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget
preview branches: enabled
```

Preview builds may omit `validate:public-truth` when production-only domain/email variables are intentionally absent, but must still build and pass static gates.

**Do not** recreate this pipeline in `.github/workflows`.

Legacy Cloudflare Pages project `blueskyz-labs-portfolio` is superseded by Workers Static Assets. On 2026-09-04 Git deployments were disabled via Cloudflare API (`deployments_enabled=false`, preview=`none`), and `destination_dir` was corrected from `.next` → `dist` so an accidental re-enable cannot revive the Next output contract. Canonical host remains Workers (`blueskyz-web`).

---

## 6. Public truth

`pnpm validate:public-truth` requires:

- `PUBLIC_SITE_URL` (https)
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_SECURITY_EMAIL`

Production promotion is blocked until these are owner-supplied. Do not invent domain/email fallbacks.
