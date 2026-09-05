# R4d Task 4 import from sgps-core — 2026-09-05

## Access used

Cursor GitHub App is still `repository_selection=selected` with **only**
`BlueSkyz-Labs/SGPS-Marketing` (`GET /installation/repositories`,
`total_count=1`). Direct `gh api repos/BlueSkyz-Labs/sgps-core` remains HTTP 404.

This import used `PORTFOLIO_GITHUB_TOKEN`, which returns HTTP 200 for the
private repo (`full_name=BlueSkyz-Labs/sgps-core`). Cloudflare’s GitHub App
continues to list `sgps-core` as `repo_id=1336680359`. Re-verified 2026-09-05:
Cursor App still omits the repo; PAT still works; projected bytes MATCH —
`docs/evidence/2026-09-05-sgps-core-access-reverify.md`.

Owner still should add `sgps-core` to the **Cursor** GitHub App selected
repositories so future agents can `git ls-remote` / `gh` without the portfolio
token.

## Source revision

```text
git ls-remote https://github.com/BlueSkyz-Labs/sgps-core.git refs/heads/main
28dbbc7e28442173c367212096e9095b9e09c0d6
```

Source path: `standards/experience/brand/assets/blueskyz/r4d-v1.1/`

No outlined wordmark SVG exists in that reference subset. Header / Footer /
Hero therefore use the exact `symbol_mono_ink.svg` plus live text `BlueSkyz Labs`.
The SVG files were not edited.

## Projected bytes

| File                  | SHA-256                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `symbol_mono_ink.svg` | `f566a1a1104de1a3a27011a569d2f49f7a93339663927cf183a2734ce0a019d4` |
| `micro_mark_ink.svg`  | `ce83f517aaec32239805d5a8937f38bf7c2e7c1919509bd7b02272e09ab18469` |
| `brand_tokens.json`   | `7b8008bf93f5bb0d1ab48f33d7d12cde8fbf7ce1b0ed3ab5944c21f6132b021c` |

Manifest fields copied from `BLUESKYZ_MASTERBRAND_CANDIDATE.json` at the same
revision: `assetId=BLUESKYZ-MASTERBRAND-R4D`, `assetVersion=1.1.0`,
`status=IDENTITY_PROTOTYPE_READY`, `designState=DESIGN_FREEZE_CANDIDATE`,
`runtimeFontDependencyForWordmark=NONE_VECTOR_OUTLINES`.

## Not done (still owner-gated)

- Cursor App grant for `sgps-core`
- Production emails / `pnpm validate:public-truth` on Builds
- Issue #8 ruleset (owner left `rulesets=[]`; leave OPEN)
- Invented contact/security addresses
