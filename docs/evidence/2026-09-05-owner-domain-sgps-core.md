# Owner follow-up — rulesets, tonydemo.com, sgps-core — 2026-09-05

## Owner statements (this turn)

1. All RULE MAIN GitHub rules disabled.
2. Temporary site domain: `tonydemo.com` (emails empty; owner will add later).
3. Claimed `sgps-core` access + full Cursor connect — ask why agent still cannot read.

## 1) GitHub main rulesets

`GET /repos/BlueSkyz-Labs/SGPS-Marketing/rulesets` → `[]`.

Matches owner intent. Issue #8 stays OPEN as governance backlog (do not
auto-close without explicit owner instruction). Workers Builds success still
often does not appear as GitHub check-runs (`total_count` frequently `0`).

## 2) Temporary domain `tonydemo.com`

| Host                    | Workers custom domain → `blueskyz-web` | HTTP                 |
| ----------------------- | -------------------------------------- | -------------------- |
| `tonydemo.com`          | attached                               | 200 (via CF resolve) |
| `www.tonydemo.com`      | attached                               | 200 (via CF resolve) |
| `blueskyz.tonydemo.com` | attached                               | 200                  |

Zone `tonydemo.com` id `ea86f082bae4282cf9b958016543fd2d` (active). Apex /
www / blueskyz use proxied Workers `AAAA 100::` records.

Builds trigger env (production + preview) patched to:

`PUBLIC_SITE_URL=https://tonydemo.com`

`pnpm validate:public-truth` remains **omitted** from build commands until
emails exist.

Code (`src/lib/truth.ts`) allowlists only:

- `tonydemo.com`
- `www.tonydemo.com`
- `blueskyz.tonydemo.com`

as temporary site identity. Product/staging hosts (`sotro.tonydemo.com`,
`portfolio.tonydemo.com`, …) stay non-production for claim URLs / SEO gates.

### Live verify after Wrangler redeploy

Version ID: `2c212770-2e03-445c-9008-ef1ec13a4bc6`

| Check                                      | Result                                                  |
| ------------------------------------------ | ------------------------------------------------------- |
| `https://tonydemo.com/` canonical          | `https://tonydemo.com/`                                 |
| `https://www.tonydemo.com/` canonical      | `https://tonydemo.com/`                                 |
| `https://blueskyz.tonydemo.com/` canonical | `https://tonydemo.com/`                                 |
| `robots.txt`                               | `Allow: /` + sitemap `https://tonydemo.com/sitemap.xml` |
| `sitemap.xml`                              | absolute `https://tonydemo.com/...` locs                |

## 3) Why Cursor still cannot read `sgps-core`

| Identity                                                                       | What it sees                                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Cursor GitHub App (`/installation/repositories`)                               | `repository_selection=selected`, **only** `BlueSkyz-Labs/SGPS-Marketing` (`total_count=1`) |
| Cursor `gh` token                                                              | `BlueSkyz-Labs/sgps-core` → **HTTP 404**                                                   |
| `PORTFOLIO_GITHUB_TOKEN`                                                       | HTTP **200** for private `BlueSkyz-Labs/sgps-core` (used for R4d #61 import)               |
| Cloudflare GitHub App (`GET .../pages/connections/github/BlueSkyz-Labs/repos`) | Lists **`sgps-core`** (`repo_id=1336680359`) among org repos                               |

**Root cause (Cursor `gh` 404):** `sgps-core` is private and **not** in the
Cursor GitHub App selected-repository grant. Cloudflare App visibility does
not grant Cursor `gh` read. R4d Task 4 still **LANDED** via
`PORTFOLIO_GITHUB_TOKEN` (`docs/evidence/2026-09-05-r4d-sgps-core-import.md`).

**Owner fix (optional, for future Cursor `gh` reads):**

GitHub → Organization `BlueSkyz-Labs` → Settings → GitHub Apps → **Cursor** →
Repository access → add **`sgps-core`** (keep Selected repositories, or switch
to All).

Unrelated public hit `openwifi-su/sgps-core` is **not** the BlueSkyz R4d source.

Until Cursor App includes `sgps-core`, future Cursor `gh`/`git ls-remote` reads
stay blocked for that identity — but C1.1 Task 4 R4d **import already LANDED**.
