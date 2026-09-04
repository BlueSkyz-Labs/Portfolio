# Remaining Convergence Plan — Owner-gated & residual gaps

> **For agentic workers:** Execute only items that are still open and safe.
> Do not merge #33 or claim Issue #8 closed without verified GitHub ruleset reads.

**Goal:** Finish residual atelier-era gaps only where they do not conflict with
C1.1. Canonical product direction is now
`docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md` and
`docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`
(ADR 0004: `ASTRO_7`). Do not invest further in Quiet Luxury atelier polish
except owner-gated holds below.

**Current baseline (2026-09-04 agent):** ADR 0004 locks `ASTRO_7`. PR #43
carries Tasks 2–3 (Astro + Workers Static Assets) and Tasks 5–6 (tokens +
shell). Task 4 blocked: `BlueSkyz-Labs/sgps-core` is not readable (HTTP 404)
so R4d provenance cannot be projected yet — Header uses text lockup only.
Open: draft #33 (hold), Issue #8 (ruleset), C1.1 Tasks 4 + 7–14, agent merge
403 (human merge required).

---

### Task 1: Enable main promotion ruleset (Issue #8)

**Owner-only.** GitHub API/MCP cannot write rulesets in this environment.

- [ ] Create active branch ruleset on `main` per Issue #8 checklist
- [ ] Require status check name exactly:
      `Quality Gates (architecture, lint, typecheck, build, e2e, a11y, perf)`
- [ ] Verify direct push to `main` is rejected; green PR remains mergeable
- [ ] Close Issue #8 only after read-back verification

---

### Task 2: Custom domain DNS

- [ ] Publish public DNS for `portfolio.tonydemo.com` → Cloudflare Pages
- [ ] After NXDOMAIN clears, optionally retarget Edge smoke or keep `pages.dev`
      as the CI host of record

---

### Task 3: Brand photography / About portrait

- [ ] Supply public-safe About visual (no private customer imagery)
- [ ] Optionally add Work card media + §4.3 image parallax at 0.9×
- [ ] Keep typographic placeholders until assets exist

---

### Task 4: GTM `/so-tro` (#33)

- [ ] Keep draft until Copy kit v2.1 + Designer tokens + product chrome confirmed
- [ ] Do not merge into atelier `main` IA without explicit owner go

---

### Task 5: Residual QA (G9 / G10)

- [ ] G9: privacy-conscious field INP/RUM design before blocking gate
- [ ] G10: screenshot visual regression baselines + review lifecycle

---

### Task 6: Contact delivery backend (optional)

- [ ] Configure `NEXT_PUBLIC_CONTACT_ENDPOINT` with abuse controls
- [ ] Add loading/error client states only when endpoint is real

---

## Autonomous-safe work already landed (do not redo)

- Lucide v1 + SocialIcons (#36)
- Experience polish + Pages.dev smoke contract (#37 / #39)
- Button variants + untinted Dialog; drop unused NavigationMenu (#38)
- Token/docs hygiene on this branch when merged
