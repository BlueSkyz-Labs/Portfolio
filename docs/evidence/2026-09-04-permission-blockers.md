# Agent permission blockers — 2026-09-04

Evidence for external holds that still block remote promotion / governance.
PRs **#46–#49** are merged on `main` (HEAD `a51dd56`). Live Workers redeploy and
Builds Git Connect remain owner actions. Agent re-verify at **2026-09-04T06:32Z**
confirmed the same external hold set — no new material in-repo work.

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
3. Close draft #33 after acknowledgement it is superseded by Astro C1.1:  
   https://github.com/BlueSkyz-Labs/SGPS-Marketing/pull/33

### Least-privilege token (if expanding agent later)

- Contents: Read and Write (enough for PR merge with squash when combined with Pull requests: Read and Write)
- Pull requests: Read and Write
- Administration: **not** required for merge; rulesets typically need admin/settings access — keep human-owned
- Do **not** grant `delete_repo`, org owner, or workflow write unless separately justified

## 2) Cloudflare — Workers Builds Git attach

See `docs/evidence/2026-09-04-workers-builds-gap.md`.

Deep link:  
https://dash.cloudflare.com/0dd046dab63171c38a6548642bc9f2d4/workers/services/view/blueskyz-web/settings

Worker `blueskyz-web` still `modified_on` ≈ `2026-09-04T02:08:32Z` (pre-#46 surface). Builds list `total_count=0`.

## 3) R4d / sgps-core

`BlueSkyz-Labs/sgps-core` returns HTTP 404 to this agent. Grant read access to that
private repo (or publish the R4d v1.1 asset projection) before Task 4 can complete.

## 4) Production truth env

Set on Workers production (not invent locally):

- `PUBLIC_SITE_URL` (https canonical corporate domain)
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_SECURITY_EMAIL`

Then `pnpm validate:public-truth` can pass on production Builds.

## 5) Convergence checkpoint (agent re-verify)

Date/HEAD: `a51dd56` on `main` (post-#49). Re-verify: **2026-09-04T06:32Z**.

| Check                                          | Result                                                                                       |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Open material in-repo work                     | **None** (independent audit: still converged-for-in-repo)                                    |
| `pnpm test:architecture`                       | PASS (37)                                                                                    |
| Local `dist/security/` CTA                     | Contains `Open private vulnerability reporting` → advisories URL                             |
| Live `blueskyz-web…workers.dev/security/`      | Still pre-#46 copy (“See SECURITY.md…”); **no** advisory CTA                                 |
| Live `Permissions-Policy`                      | `camera=(), microphone=(), geolocation=()` — missing payment/usb/interest-cohort from `main` |
| Live HSTS                                      | **Absent** on response                                                                       |
| Workers Builds list                            | `total_count=0`                                                                              |
| Shell Cloudflare secrets                       | `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` **missing**                                 |
| GitHub rulesets                                | `[]`                                                                                         |
| Close/comment #33 / Issue #8 comment / ruleset | `403 Resource not accessible by integration`                                                 |
| Env setup actions requested                    | `CLOUDFLARE_API_TOKEN` (+ optional account id); Connect Builds; close #33 + ruleset          |

### Unblock paths (pick one)

**A — Preferred (no agent token):** Dashboard Connect Git → Workers Builds (auto build token).  
Deep link: https://dash.cloudflare.com/0dd046dab63171c38a6548642bc9f2d4/workers/services/view/blueskyz-web/settings  
Docs: https://developers.cloudflare.com/workers/ci-cd/builds/

**B — Agent one-shot redeploy:** add env secret `CLOUDFLARE_API_TOKEN` (user token) with least privilege for `wrangler deploy` of Static Assets Worker `blueskyz-web`:

- Account → Workers Scripts → **Edit** (required)
- Account → Account Settings → **Read** (often needed by Wrangler)
- Zone → Workers Routes → **Edit** (only if custom routes/zones used)

Create token: https://dash.cloudflare.com/profile/api-tokens  
Official auth notes: https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/authentication/#generate-tokens

Do **not** grant Billing, User Details beyond Memberships/Read unless Wrangler requires it; prefer Workers Builds Connect (A) over long-lived agent deploy tokens.

After A or B: verify `/security/` shows advisory CTA and response includes `Strict-Transport-Security`.
