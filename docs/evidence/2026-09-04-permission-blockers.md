# Agent permission blockers — 2026-09-04

Evidence for external holds that still block remote promotion / governance.
PRs **#46–#50** are merged on `main`. Agent session at **2026-09-04T06:50Z**
closed the live Workers drift via Wrangler redeploy when `CLOUDFLARE_API_TOKEN`
became available. Workers Builds Git Connect was later closed by agent via the
Builds REST API on **2026-09-05** (see
`docs/evidence/2026-09-05-workers-builds-connected.md`). GitHub rulesets remain
owner-gated.

## 1) GitHub — merge / ruleset / PR moderation

| Item                     | Observed                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resource                 | `BlueSkyz-Labs/SGPS-Marketing`                                                                                                                     |
| Agent can                | push feature branches; open/update PR body via Cursor ManagePullRequest; GraphQL ready + REST squash-merge for agent-authored PRs                  |
| Agent cannot             | ManagePullRequest draft→ready (`resource_exhausted`); comment/close #33 (`403`); write repository rulesets (API `[]`); comment on Issue #8 (`403`) |
| Repo permissions via API | `admin/maintain/push/pull/triage` all reported `false` for the integration identity (branch push still works through Cursor git remote)            |

### Minimum owner actions (remaining)

1. Create branch ruleset for `main` (Issue #8):  
   https://github.com/BlueSkyz-Labs/SGPS-Marketing/settings/rules  
   Official docs: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository
2. Prefer required checks from **Cloudflare Workers Builds** / local source-gate evidence over resurrecting required GitHub Actions workload. If a status check name must exist, align Issue #8 with the actual Workers Builds check name after Connect — do not invent a GA job solely to satisfy the legacy string.
3. PR #33 is already **CLOSED** (superseded by Astro C1.1) — no further close action required:  
   https://github.com/BlueSkyz-Labs/SGPS-Marketing/pull/33

### Least-privilege token (if expanding agent later)

- Contents: Read and Write (enough for PR merge with squash when combined with Pull requests: Read and Write)
- Pull requests: Read and Write
- Administration: **not** required for merge; rulesets typically need admin/settings access — keep human-owned
- Do **not** grant `delete_repo`, org owner, or workflow write unless separately justified

## 2) Cloudflare — Workers Builds Git attach

**CLOSED 2026-09-05** by agent via Builds API (repo connection + production/
preview triggers + successful build `2fa74438-1fc0-408c-beb2-70eeb653c6bc`).
Evidence: `docs/evidence/2026-09-05-workers-builds-connected.md`.

Historical gap note: `docs/evidence/2026-09-04-workers-builds-gap.md`.

Deep link (settings still useful for env/truth vars):  
https://dash.cloudflare.com/0dd046dab63171c38a6548642bc9f2d4/workers/services/view/blueskyz-web/settings

Temporary domain (owner 2026-09-05): `PUBLIC_SITE_URL=https://tonydemo.com`
set on Builds triggers; custom domains `tonydemo.com` / `www` / `blueskyz`
attached to `blueskyz-web`. Emails still empty — keep
`pnpm validate:public-truth` **out** of build until owner supplies them.
Evidence: `docs/evidence/2026-09-05-owner-domain-sgps-core.md`.

## 3) R4d / sgps-core

**C1.1 Task 4 projection landed 2026-09-05** from `sgps-core` main
`28dbbc7e28442173c367212096e9095b9e09c0d6` using `PORTFOLIO_GITHUB_TOKEN`.
Evidence: `docs/evidence/2026-09-05-r4d-sgps-core-import.md`.

Cursor `gh` / GitHub App install is still `repository_selection=selected` with
**only** `SGPS-Marketing` (`sgps-core` → HTTP 404). Cloudflare GitHub App still
lists `sgps-core` (`repo_id=1336680359`).

**Owner fix (optional, for future Cursor `gh` reads):** GitHub → Org
`BlueSkyz-Labs` → GitHub Apps → **Cursor** → add repo `sgps-core`.

## 4) Production truth env

Set on Workers production (not invent locally):

- `PUBLIC_SITE_URL` (https canonical corporate domain)
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_SECURITY_EMAIL`

Then `pnpm validate:public-truth` can pass on production Builds.

For workers.dev preview/recovery deploys, set `PUBLIC_SITE_URL` to the factual
`https://blueskyz-web.thinhnguyen-km10.workers.dev` host (or use
`pnpm deploy:workers`) so canonical/OG URLs are not baked as localhost.

## 5) Convergence checkpoint (agent re-verify)

Date/HEAD: post-redeploy + product-proof/QA hardening branch (2026-09-04T06:50Z).

| Check                                          | Result                                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Live `/security/` advisory CTA                 | **PASS** after Wrangler redeploy                                                               |
| Live HSTS + extended Permissions-Policy        | **PASS**                                                                                       |
| Live canonical on workers.dev                  | **PASS** (`https://blueskyz-web…workers.dev/...`) after rebuild with `PUBLIC_SITE_URL`         |
| Workers Builds list                            | **PASS** `total_count≥1` after API Connect (2026-09-05)                                        |
| Shell Cloudflare secrets                       | `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` present (redeploy works)                      |
| GitHub rulesets                                | `[]`                                                                                           |
| Close/comment #33 / Issue #8 comment / ruleset | #33 already CLOSED; Issue #8 comment / ruleset write still `403`                               |
| In-repo material follow-ups                    | Product proof contract + static link gate + WCAG 2.2 axe + Playwright bootstrap (this session) |

### Unblock paths (remaining)

**A — Workers Builds Git Connect:** **DONE** (agent API, 2026-09-05).  
**B — Agent recovery redeploy:** `PUBLIC_SITE_URL=https://tonydemo.com pnpm deploy:workers` (temporary owner domain; emails still empty).  
**C — Still owner-gated:** Issue #8 ruleset (deferred by owner); add `sgps-core` to Cursor GitHub App selected repos; production emails for `validate:public-truth`.
