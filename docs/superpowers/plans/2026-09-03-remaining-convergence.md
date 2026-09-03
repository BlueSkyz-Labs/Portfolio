# Remaining Convergence Plan — Owner-gated & residual gaps

> **For agentic workers:** Execute only items that are still open and safe.
> Do not merge #33 or claim Issue #8 closed without verified GitHub ruleset reads.

**Goal:** Finish SGPS:Experience FULL / production convergence for items that
remain after the 2026-09-03 autonomous pass.

**Current `main` baseline (verified this session):** narrative sections shipped,
JS budget &lt;120 kB (112 kB First Load), brand OG/favicon, custom cursor,
Button/Dialog inventory, Cloudflare-first Edge smoke on `pages.dev`, Dependabot
lucide remediation merged. Open: draft #33 (hold), Issue #8 (ruleset).

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
