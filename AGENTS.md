# Agent guide — BlueSkyz Labs Web (SGPS-Marketing)

Trusted Source of Truth only:

| Role                        | Path                                                                       |
| --------------------------- | -------------------------------------------------------------------------- |
| Experience contract         | `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`         |
| Implementation plan         | `docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md` |
| Residual / owner-gated work | `docs/superpowers/plans/2026-09-03-remaining-convergence.md`               |
| Framework decision          | `docs/decisions/0004-web-framework-selection.md` (`ASTRO_7`)               |
| Decisions index             | `docs/decisions/README.md`                                                 |

## Hard rules

- Do **not** invent corporate emails, legal prose, product claims, screenshots, photography, or final domain facts.
- Prefer smallest **sufficient** change (root cause) over symptom patches.
- Never weaken tests, lint, truth gates, or security controls to go green.
- Temporary site identity may be `tonydemo.com`; emails may still be empty.
- Empty public registry + empty email → Act soft-land via `src/lib/act.ts` (About / Security), not a Contact dead-end.
- Issue #8 ruleset is **owner deferred** (`rulesets=[]`); leave open.

## Local source gate

`architecture → typecheck → lint → format → build → client budget → static links`

See `README.md` for full commands. Prefer Workers Builds over GitHub Actions compute.
