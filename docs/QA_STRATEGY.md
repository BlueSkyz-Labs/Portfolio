# QA Strategy — BlueSkyz Labs Portfolio

> **Project:** BlueSkyz Labs Portfolio — Next.js 15.5.24, React 19.0.8, Tailwind CSS 4.3.3
> **Product/design source of truth:** [`../SPEC.md`](../SPEC.md)
> **Status:** Living engineering-assurance document. This file describes what the repository actually enforces today and explicitly labels residual gaps.

---

## 1. Mission

Protect the portfolio's product truth and premium user experience with deterministic, reviewable promotion evidence. A change is not considered safe because it "looks fine" or because an earlier commit passed CI: the exact candidate being promoted must satisfy the applicable gates against the exact current base.

Core principles:

- **PR-first promotion.** Routine delivery is developed on a branch and promoted through a pull request.
- **Exact-head evidence.** A green run belongs to the commit SHA it tested; a moved head requires fresh evidence.
- **Exact-base bundle comparison.** G5 compares the candidate with the pull request's exact base SHA, not an approximate historical baseline.
- **Do not weaken gates to land a change.** Fix the root cause or explicitly escalate a real product/risk decision.
- **Static-export truth.** Browser and Lighthouse tests exercise the same `out/` artifact that is deployable to Cloudflare Pages.
- **Evidence before completion claims.** Mergeability, checks, review threads, and resulting `main` are refreshed before declaring a workstream complete.

---

## 2. Current Blocking Gates

The primary GitHub Actions job is named exactly:

`Quality Gates (architecture, lint, typecheck, build, e2e, a11y, perf)`

That name is the intended required-status-check identifier once the `main` ruleset in Issue #8 is enabled.

| Gate | Current implementation | Blocking in `qa.yml`? |
| --- | --- | --- |
| Dependency audit | `pnpm audit --prod --audit-level=high` | Yes |
| Architecture regressions | `pnpm test:architecture` | Yes |
| G1 — TypeScript | `pnpm typecheck` | Yes |
| G2 — ESLint | `pnpm lint` → `eslint .` | Yes |
| G3 — Prettier | `pnpm format:check` | Yes |
| G4 — Production/static-export build | `pnpm build` + `scripts/verify-static-export.mjs` | Yes |
| G5 — Bundle regression | exact-base build + `scripts/check-bundle-regression.mjs` | Yes |
| Product Truth initial-route JS | hard budget `< 120,000 bytes` inside G5 | Yes |
| G6/G7 — E2E + accessibility | Playwright + `@axe-core/playwright` | Yes |
| G11 — Cross-browser | Chromium, Firefox, WebKit, mobile Chromium | Yes |
| G8 — Lighthouse | `pnpm lighthouse` / LHCI | Yes |
| Edge-UA smoke | separate post-merge `main` push job | Yes for that job, not a PR gate |
| G9 — Field INP/RUM | not yet implemented | **Residual gap** |
| G10 — screenshot visual regression | not yet implemented as a blocking suite | Advisory / future work |

The local versioned pre-commit hook runs architecture, G1–G4. G5 deliberately remains CI-only because CI owns the authoritative base SHA.

---

## 3. Architecture / Supply-Chain Regression Layer

`tests/architecture/*.test.mjs` protects repository invariants before heavier browser work begins. Current coverage includes:

- hard initial-route bundle budget and regression semantics;
- Cloudflare Pages static-export contract;
- Tailwind CSS v4/PostCSS pipeline;
- production framework security floors;
- explicit ESLint CLI + flat-config bridge;
- semantic layout ownership;
- versioned local pre-commit gates;
- React 19 runtime/type-declaration alignment.

These tests are intentionally cheap and fail early when a toolchain or architectural invariant drifts.

---

## 4. Static and Build Gates

### G1 — TypeScript

`pnpm typecheck` runs `tsc --noEmit`. Runtime React and declarations are kept on the validated React 19 line (`react`/`react-dom` 19.0.8, `@types/react` 19.0.8, `@types/react-dom` 19.0.3).

### G2 — ESLint

The repository uses ESLint 9 through the explicit CLI:

```text
pnpm lint     -> eslint .
pnpm lint:fix -> eslint . --fix
```

`eslint.config.mjs` uses `FlatCompat` to preserve the Next.js 15.5 policy represented by `next/core-web-vitals` and `next/typescript`. The legacy `.eslintrc.json` path is intentionally removed.

### G3 — Prettier

`pnpm format:check` is blocking. On failure, CI runs the repository formatter and uploads the deterministic `prettier-output` artifact. Apply that formatter output rather than hand-guessing formatting differences.

### G4 — Static export

`pnpm build` runs Next.js and then `scripts/verify-static-export.mjs`. The build must produce the deployable `out/` artifact, including the expected static routes/assets and Cloudflare Pages headers contract.

---

## 5. G5 — Exact-Base Bundle Assurance

G5 is both a regression gate and a Product Truth hard-budget gate.

For a pull request, CI reads `github.event.pull_request.base.sha`, builds that exact revision in a disposable worktree, builds the candidate, and compares the root-route First Load JS values.

Promotion requires both:

1. candidate growth does not exceed the configured regression tolerance; and
2. candidate initial-route JS remains **strictly below 120,000 bytes**.

`bundle-evidence.json` is uploaded on every run where evidence can be produced. Never replace exact-base evidence with a remembered number from another PR.

---

## 6. Browser, Accessibility, and Responsive Coverage

The current E2E suite is:

```text
tests/e2e/
├── accessibility.spec.ts
├── basic.spec.ts
├── navigation.spec.ts
└── sections.spec.ts
```

`playwright.config.ts` defines:

- `chromium` — Desktop Chrome profile;
- `firefox` — Desktop Firefox profile;
- `webkit` — Desktop Safari/WebKit profile;
- `mobile-chromium` — Pixel 5 profile;
- `edge-ua` — Chromium with a Microsoft Edge user agent, used by the post-merge main smoke job.

CI browser tests run against `pnpm start`, which serves the built static `out/` artifact. Failure artifacts retain traces/screenshots/video where Playwright produces them.

Accessibility coverage uses `@axe-core/playwright` and semantic/keyboard assertions. Interactive mobile navigation must preserve keyboard operation, Escape behavior, focus restoration, appropriate accessible names, and reduced-motion behavior.

### Test authoring rules

- Prefer role, label, and semantic selectors over DOM-position selectors.
- Do not use arbitrary sleeps (`waitForTimeout`) for synchronization.
- Test observable behavior, not implementation details.
- When animation is involved, explicitly cover `prefers-reduced-motion` where the behavior materially changes.
- A new user-visible behavior should receive a failing test/contract before implementation whenever practical.

---

## 7. Lighthouse

`lighthouserc.json` runs three desktop audits against the static site and currently enforces:

- Performance ≥ 0.90
- Accessibility ≥ 0.90
- Best Practices ≥ 0.90
- SEO ≥ 0.90
- LCP ≤ 1,200 ms
- CLS ≤ 0.05

TBT ≤ 150 ms is currently a warning, not an error.

Reports are stored under `.lighthouseci/` and uploaded as the `lighthouse-report` artifact.

Lighthouse is lab evidence. It does **not** close the G9 field-INP requirement by itself.

---

## 8. CI Pipeline — `.github/workflows/qa.yml`

The workflow runs on pushes and pull requests targeting `main` / `develop` and cancels stale in-flight runs for the same ref.

Primary sequence:

1. checkout;
2. install pnpm 9.15.9 and Node 20;
3. frozen dependency install;
4. production dependency audit;
5. architecture regressions;
6. G1 typecheck;
7. G2 ESLint;
8. G3 Prettier;
9. G4 candidate static build;
10. resolve and build the exact G5 base revision;
11. G5 regression + hard-budget check;
12. Playwright browser installation/caching;
13. cross-browser E2E + accessibility;
14. Lighthouse CI;
15. upload applicable evidence artifacts.

After a successful push to `main`, the separate `Edge smoke (Chromium + Edge UA)` job builds the production artifact again and executes the `edge-ua` Playwright project.

---

## 9. Promotion Discipline

Immediately before merge, verify:

- PR is open, non-draft, and mergeable;
- base SHA is still the expected current `main`;
- head SHA is exactly the SHA that passed the fresh PR QA run;
- the primary QA job completed successfully;
- no unresolved review threads remain;
- no material review finding is being bypassed;
- merge uses the expected-head SHA guard where tooling supports it.

After merge, verify the returned merge commit is the new `main` head. For changes that affect runtime/deployment behavior, also inspect the corresponding `main` workflow/deployment evidence.

Historical green runs are context, not promotion authority, after either head or base changes.

---

## 10. Governance Reality — Issue #8

**Current state:** `main` is still technically unprotected and no active repository ruleset is enforcing PR-only promotion. The engineering process follows PR-first discipline, but repository settings do not yet make direct writes impossible.

This is tracked in [Issue #8 — `governance: enforce main promotion ruleset`](https://github.com/BlueSkyz-Labs/Portfolio/issues/8).

Target ruleset:

- require a pull request before merge;
- require status check `Quality Gates (architecture, lint, typecheck, build, e2e, a11y, perf)`;
- require strict/up-to-date status checks;
- require conversation resolution;
- block force pushes and branch deletion;
- keep emergency bypass narrow and explicit;
- avoid an impossible approval-count requirement for the one-human operating model.

**Do not state that branch protection blocks merges until the setting has actually been applied and read back from GitHub.** Keep Issue #8 open until direct-main rejection and a normal green-PR merge have both been verified.

---

## 11. Evidence Artifacts

The primary workflow can publish:

- `bundle-evidence` — exact-base G5 result;
- `prettier-output` — deterministic correction, only when G3 fails;
- `playwright-report` — HTML report;
- `playwright-test-results` — test result artifacts/JUnit output;
- `lighthouse-report` — `.lighthouseci/` results.

Artifact absence is expected for conditional outputs that were never generated; it must not be confused with a successful gate when the underlying gate was skipped.

---

## 12. Explicit Residual Gaps

### G9 — real-user INP / RUM

The SPEC field-performance requirement is not yet mechanically verified. A future telemetry workstream should define privacy-conscious RUM collection, p75 evaluation, retention, alerting, and an operational owner before G9 can honestly become a blocking release gate.

### G10 — visual regression

The repository does not currently have committed screenshot baselines and a blocking visual-diff workflow. Do not describe visual regression as implemented until a deterministic baseline/review lifecycle exists.

### Repository governance

Issue #8 remains open until the GitHub ruleset is enabled and verified. Documentation is not remediation for this control gap.

---

_Last reconciled with repository reality on 2026-09-02._
