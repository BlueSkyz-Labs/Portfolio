# Act-path + workers.dev noindex hardening — 2026-09-05

## Finding (real-user red-team)

With an empty public product registry **and** empty `PUBLIC_CONTACT_EMAIL`,
#62 soft-landed Act CTAs on `/contact/`. Contact business lane is inert text;
Support↔Contact is a loop; only Security advisory works. Spec Experience FULL
Act (“take the correct next action”) failed for the default production-like
env (tonydemo + empty emails).

Separately, `public/_headers` only noindexed versioned
`:version.:subdomain.workers.dev` hosts. The stable
`blueskyz-web.thinhnguyen-km10.workers.dev` host could serve the same `dist/`
(with `SITE.url=https://tonydemo.com`, so HTML robots allowindex) without
`X-Robots-Tag: noindex`.

## Changes (agent-safe)

1. `src/lib/act.ts` — email-aware empty-registry primary/secondary CTAs:
   Contact only when email exists; else About → Security.
2. Hero / Header / NextStep / 404 / products empty state use the helper.
3. Omit hollow `Featured products` section when registry length is 0.
4. Contact / Support / Privacy empty-email states lead with Security (or About),
   not a Contact dead-end loop.
5. `_headers` — exact stable workers.dev host + `:version.:worker.:account`
   preview pattern (per Cloudflare Static Assets headers docs).
6. Architecture + Playwright regressions updated; UI muted ≠ brand `slate_500`
   guard documented in CSS.

## Verification

- `pnpm test:architecture`
- `pnpm typecheck` / `pnpm lint` / `pnpm format:check`
- `pnpm build` / `pnpm check:client-budget` / `pnpm check:static-links`
- Playwright chromium: shell / home / empty / contact empty-email

## Out of scope (owner-gated)

- Production emails / enable `validate:public-truth` on Builds
- Issue #8 rulesets
- Public product YAML
- About photography
- Cursor App `sgps-core` grant (optional; R4d already imported)
