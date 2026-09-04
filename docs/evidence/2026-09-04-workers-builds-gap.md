# Workers Builds gap — blueskyz-web

Date: 2026-09-04  
Worker: `blueskyz-web` (`8a8fece25ca94b0cb05bcabac63c9020`)  
Account: `0dd046dab63171c38a6548642bc9f2d4`  
Live preview observed: `https://blueskyz-web.thinhnguyen-km10.workers.dev/` (HTTP 200)

## Finding

Cloudflare Workers Builds API listing for this Worker returned **0 builds**
(`total_count=0`) on re-verify **2026-09-04T06:32Z** (post-#49 `main`). The
Worker itself exists and still serves a **pre-#46** Astro static snapshot
(`modified_on` ≈ `2026-09-04T02:08:32Z`), but the preferred remote promotion
path from ADR 0002 / QA_STRATEGY is not yet emitting build records.

Agent Cloudflare MCP can **read** Workers/Builds metadata but has **no write
tool** to attach a Git repository to Workers Builds. Shell has no usable
`CLOUDFLARE_API_TOKEN` for account-scoped API writes / `wrangler deploy`.

## Owner action (least privilege)

1. Open Worker Builds settings:  
   [blueskyz-web → Settings → Builds](https://dash.cloudflare.com/0dd046dab63171c38a6548642bc9f2d4/workers/services/view/blueskyz-web/settings)
2. Or Workers & Pages index:  
   [Workers & Pages](https://dash.cloudflare.com/?to=/0dd046dab63171c38a6548642bc9f2d4/workers-and-pages)
3. **Connect** GitHub repo `BlueSkyz-Labs/SGPS-Marketing` (Worker `name` must
   remain `blueskyz-web` to match `wrangler.toml`).
4. Build command (production):

```text
pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget
```

5. Deploy command: default `npx wrangler deploy` (or account equivalent).
6. Enable non-production branch builds for PR previews; preview may omit
   `validate:public-truth` when production env vars are intentionally absent.
7. Official guide:  
   https://developers.cloudflare.com/workers/ci-cd/builds/  
   https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/

### Minimum Cloudflare permission

- Dashboard: account member who can edit Worker `blueskyz-web` Builds/Git
  connection (Workers edit on that Worker / account Workers admin — not
  account-wide Super Admin unless that is the only role available).
- If using API tokens later for automation (optional; dashboard Connect is
  enough): scoped token with Workers Scripts Edit + Workers Builds/CI as
  documented by Cloudflare for Builds — do **not** grant User Details Read All
  or account-wide Billing.

## Verify after owner action

```bash
# Builds list must become non-empty for workerId 8a8fece25ca94b0cb05bcabac63c9020
# Push a commit to the connected branch and confirm a Workers Builds check/run.
```

Do **not** recreate this pipeline as required GitHub Actions workload.

## Related

- ADR 0002 Cloudflare-first CI
- `docs/QA_STRATEGY.md` §5
- `docs/evidence/2026-09-04-pages-disable.md` (legacy Pages Git disabled)
