# Legacy Cloudflare Pages disable — 2026-09-04

## Trigger

GitHub check **Cloudflare Pages** failed on Astro C1.1 commits (e.g. `ffff92e` on `cursor/c1-1-astro-foundation-ea89`). Root cause: Pages project `blueskyz-labs-portfolio` still used `destination_dir: ".next"` after the Astro → `dist/` migration.

## Action (Cloudflare API)

Account `0dd046dab63171c38a6548642bc9f2d4`, project `blueskyz-labs-portfolio`:

1. Disabled Git deployments:
   - `deployments_enabled: false`
   - `production_deployments_enabled: false`
   - `preview_deployment_setting: none`
   - `pr_comments_enabled: false`
2. Corrected build output for safety if re-enabled:
   - `build_command: pnpm build`
   - `destination_dir: dist` (was `.next`)

## Canonical host

Unchanged: Cloudflare Workers Static Assets worker `blueskyz-web`  
Preview: https://blueskyz-web.thinhnguyen-km10.workers.dev/

In-flight Pages deployments from earlier pushes may still finish as failures; new commits should no longer enqueue Pages builds.
