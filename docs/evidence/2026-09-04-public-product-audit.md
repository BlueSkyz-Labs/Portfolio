# Public product audit — 2026-09-04

**Auditor:** autonomous SGPS agent  
**Spec:** `docs/superpowers/specs/2026-09-03-blueskyz-web-v1-c1-1-design.md` §6  
**Rule:** no evidence → do not infer; no proof artifact / missing trust paths → **HIDDEN**

## Method

Checked org-visible GitHub repos via `gh api orgs/BlueSkyz-Labs/repos`, live Workers hostnames from the Cloudflare account listing, and selected `*.tonydemo.com` responses. Private product repositories and internal dashboards were **not** treated as public proof.

## Candidates

| Product      | Live URL evidence                                                                               | Repo revision                                                               | Privacy / security / support | Screenshot                               | Decision   |
| ------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------- | ---------- |
| Sổ Trọ       | `https://sotro.tonydemo.com/` HTTP 200; title/meta describe boarding-house management for Ba/Mẹ | Product source repo not readable from this agent (no public org repo match) | Not verified on this pass    | Not captured as approved public artifact | **HIDDEN** |
| Sổ Tâm       | `https://sotam.tonydemo.com/` HTTP 200; Workers `sotam-web-production` returned 404             | Not readable                                                                | Not verified                 | Not captured                             | **HIDDEN** |
| ApexAgent    | No verified public product URL on this pass                                                     | Not in public org listing                                                   | Not verified                 | Not captured                             | **HIDDEN** |
| FluentArc    | No verified public product URL on this pass                                                     | Not in public org listing                                                   | Not verified                 | Not captured                             | **HIDDEN** |
| Vững Tay Lái | Workers `vungtaylai-production` returned 404; no confirmed public marketing URL                 | Not readable                                                                | Not verified                 | Not captured                             | **HIDDEN** |

## Outcome

Zero products enter `src/content/products/` as `public: true` on this revision. The registry schema and query helpers ship empty-ready. Homepage/product surfaces must render an honest empty/forthcoming state rather than inventing cards.

Re-open candidates only after: product owner confirmation, lifecycle/availability evidence, at least one proof artifact, and privacy/security/support paths appropriate to the product risk profile.
