# Remaining Convergence Plan — Owner-gated & residual gaps

> **For agentic workers:** Execute only items that are still open and safe.
> Do not claim Issue #8 closed without verified GitHub ruleset reads.

**Goal:** Close residual gaps after C1.1 Astro foundation (`main` through #52)
without inventing owner-gated domain, email, legal, product, or R4d facts.

**Canonical SoT:**

- Spec: `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md`
- Plan: `docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`
- ADR 0004: `ASTRO_7` → Cloudflare Workers Static Assets

**Permission evidence:** `docs/evidence/2026-09-04-permission-blockers.md`  
**Live redeploy evidence:** `docs/evidence/2026-09-04-workers-redeploy.md`

**Current baseline (2026-09-04 agent @ trust/UX hardening pass):**

| Area                                               | Status                                                         |
| -------------------------------------------------- | -------------------------------------------------------------- |
| C1.1 Tasks 1–3, 5–14 technical foundation          | Landed on `main` (#43–#54)                                     |
| Product profile route `/products/[slug]/`          | Landed on `main` (#46)                                         |
| Trust-path CTA / FlagshipProof / SoT hygiene       | Landed on `main` (#48–#54)                                     |
| Customer copy / privacy summary / schema coherence | This hardening pass (agent-safe P1/P2)                         |
| Live Workers surface vs `main`                     | Redeploy after merge when Builds still empty                   |
| Honest empty public product registry               | PASS                                                           |
| In-repo material work                              | High-value agent-safe gaps from red-team closed in this pass   |
| R4d Task 4 (`sgps-core` import)                    | **BLOCKED** — repo HTTP 404 from this environment              |
| Cloudflare Workers Builds for `blueskyz-web`       | **GAP** — Worker exists; Builds list returns 0 runs            |
| Draft PR #33 (`/so-tro`, Next atelier)             | **CLOSED** (superseded; do not reopen/merge into Astro `main`) |
| Issue #8 main ruleset                              | **Owner-only** — API cannot write rulesets                     |
| Canonical domain / emails / legal / founder copy   | **Owner/evidence**                                             |

---

### Task 1: Enable main promotion ruleset (Issue #8)

**Owner-only.** GitHub API/MCP cannot write rulesets in this environment.

- [ ] Create active branch ruleset on `main` per Issue #8 checklist
- [ ] Prefer Cloudflare Workers Builds / local source-gate evidence names over resurrecting required GitHub Actions workload
- [ ] After Workers Builds Connect, set the **actual** Cloudflare check name in the ruleset — do not recreate a GA job solely to match the legacy Issue #8 string
- [ ] Verify direct push to `main` is rejected; green PR remains mergeable
- [ ] Close Issue #8 only after read-back verification

---

### Task 2: Cloudflare Workers Builds wiring

- [ ] Connect `BlueSkyz-Labs/SGPS-Marketing` → Worker `blueskyz-web` Builds
- [ ] Production command: `pnpm install --frozen-lockfile && pnpm validate:public-truth && pnpm build && pnpm check:client-budget && pnpm check:static-links`
- [ ] Enable preview branches; omit truth gate only when production env is intentionally absent
- [ ] Confirm Builds list is non-empty after the next `main`/PR push

---

### Task 3: Custom domain DNS

- [ ] Supply canonical corporate HTTPS domain (do not invent)
- [ ] Point DNS at Workers / custom domain for `blueskyz-web`
- [ ] Set `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_SECURITY_EMAIL` for production

---

### Task 4: R4d brand provenance (C1.1 Task 4)

- [ ] Grant this agent read access to `BlueSkyz-Labs/sgps-core` (or publish the R4d v1.1 projection)
- [ ] Import exact `symbol_mono_ink.svg`, `micro_mark_ink.svg`, `brand_tokens.json` + manifest
- [ ] Replace text-only lockup with symbol + live text until outlined wordmark exists

---

### Task 5: Brand photography / About portrait

- [ ] Supply public-safe About visual (no private customer imagery)
- [ ] Keep typographic placeholders until assets exist

---

### Task 6: GTM `/so-tro` (#33)

- [x] Draft PR #33 closed (2026-09-04) — superseded by Astro C1.1; **do not reopen or merge**
- [ ] If Sổ Trọ marketing remains desired, re-implement as an evidence-gated product entry + profile under C1.1 — do not revive Next atelier chrome

---

### Task 7: Public product promotion

- [ ] Re-audit candidates only with owner confirmation + proof artifacts + trust paths
- [ ] Promote YAML entries with `public: true` only after the §6 gate

---

### Task 8: Residual QA (G9 / G10)

- [x] G9: privacy-conscious field INP/RUM **design** recorded (`docs/evidence/2026-09-04-g9-field-rum-design.md`) — enablement still owner-gated
- [x] G10: visual baseline **lifecycle** recorded (`docs/evidence/2026-09-04-g10-visual-baseline-lifecycle.md`) — baselines not yet a merge gate

---

## Autonomous-safe work already landed (do not redo)

- Customer-facing copy hygiene (no `docs/evidence` / env jargon); privacy practical summary; Support email fallback; product profile publicLabel-only; schema coherence + production claim URLs; muted AA contrast; HSTS preload deferred; JSON-LD escape; status chrome (this pass)
- Product proof contract + static links + WCAG 2.2 axe + Playwright bootstrap + live Workers redeploy evidence (#51)
- Public-truth rejects example/preview hosts; product URLs https-only; support recourse CTAs; Builds recipe includes `check:static-links` (#53)

- Lucide v1 + SocialIcons (#36) — historical atelier era
- Experience polish + Pages.dev smoke (#37 / #39) — historical
- Button/Dialog inventory (#38) — historical
- TypeScript 6 / React 19.2 / security baseline — historical
- Astro 7 foundation through E4 (#43) + SoT sync (#44) + Pages disable note (#45)
- Product profile routes, C1.1 OG generator, porcelain atmosphere, trust-route e2e, security CTA, FlagshipProof scaffold (#46+)
