# sgps-core access re-verify — 2026-09-05

Owner asked whether Cursor can see `BlueSkyz-Labs/sgps-core` yet, then continue
work. Fresh check on this agent identity:

## Access matrix (this session)

| Identity                                                   | Result                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Cursor GitHub App `GET /installation/repositories`         | `repository_selection=selected`, `total_count=1` → **only** `SGPS-Marketing` |
| Cursor `gh api repos/BlueSkyz-Labs/sgps-core`              | **HTTP 404**                                                           |
| `PORTFOLIO_GITHUB_TOKEN` → same repo                       | **HTTP 200** (`full_name=BlueSkyz-Labs/sgps-core`, `private=true`, `id=1336680359`) |
| Cloudflare Pages GitHub connection list (account API)      | Lists `sgps-core` (`1336680359`) among org repos (also `sgps-control-plane`, `SGPS-DASHBOARD`, …) |

**Verdict:** Cursor App grant is **unchanged** — still omits `sgps-core`. The
portfolio PAT can read the private repo. Cloudflare’s GitHub App still proves
the repo exists.

## R4d SoT sync (continue work)

Using `PORTFOLIO_GITHUB_TOKEN`:

```text
sgps-core main = 28dbbc7e28442173c367212096e9095b9e09c0d6
```

Byte compare of projected files vs remote `r4d-v1.1/` at that revision:

| File                  | Result |
| --------------------- | ------ |
| `symbol_mono_ink.svg` | MATCH  |
| `micro_mark_ink.svg`  | MATCH  |
| `brand_tokens.json`   | MATCH  |

Local manifest `sourceRevision` already records the same SHA. No re-import
needed. C1.1 Task 4 remains **LANDED** (#61); social/empty-CTA follow-up
**LANDED** (#62).

## Live smoke (tonydemo.com)

| Check                         | Result                      |
| ----------------------------- | --------------------------- |
| `https://tonydemo.com/`       | 200, canonical apex         |
| `www` / `blueskyz` hosts      | 200, canonical → apex       |
| R4d SVG paths on homepage     | present                     |
| `/favicon.ico`                | 200                         |

## Owner fix (still optional but recommended)

GitHub → Organization `BlueSkyz-Labs` → Settings → GitHub Apps → **Cursor** →
Repository access → add **`sgps-core`** (or switch to All repositories).

Until then, agents without `PORTFOLIO_GITHUB_TOKEN` cannot `gh`/`git ls-remote`
the R4d SoT. Import itself is not blocked while the PAT remains valid.

## Remaining agent-safe work

None material after #61/#62. Still owner-gated:

- Production emails → enable `pnpm validate:public-truth` on Builds
- Issue #8 ruleset (owner left `rulesets=[]`)
- Public product YAML / About photography
- Cursor App grant for `sgps-core` (optional)
