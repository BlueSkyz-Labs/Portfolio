# 0001 — Adopt Quiet Luxury Aesthetic

- **Status:** Accepted
- **Date:** 2026-08-29
- **Deciders:** Thinh Nguyen (owner), BlueSkyz Labs
- **Supersedes:** —
- **Superseded by:** —

## Context

BlueSkyz Labs needs a public portfolio that signals premium positioning to enterprise clients. The current market for designer/engineer portfolios is saturated with:

- Over-animated startup-MVP templates
- Generic Tailwind starter kits
- Heavy 3D / canvas effects that prioritize novelty over restraint

These signal "indie maker", not "premium studio". We need a design language that earns trust with a 30-second visit.

## Decision

Adopt the **Quiet Luxury** aesthetic for v1 of the portfolio. Concretely:

- Dark-mode first, palette: `#0A0A0A` / `#1A1A1A` / `#C9A962` (champagne) / `#F5F5F0` (off-white)
- Cormorant Garamond for display, DM Sans for body
- 8px spatial grid, minimum 96px section padding
- All motion between 200–400ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- Champagne gold reserved for hairline accents only — never fills

## Consequences

**Positive:**
- Visually distinct from competitor portfolios
- Aligns with premium brand positioning
- Performance-friendly: minimal motion, system fonts fallback, no heavy assets

**Negative:**
- Dark-only v1 excludes a small segment of users
- Brand voice requires discipline — easy to drift toward "template"

**Mitigations:**
- All design choices documented in `SPEC.md` (the design bible)
- Light-mode is a v2 consideration; CSS variable structure already supports it
- Pre-commit quality gates enforce the system

## References

- `SPEC.md` — full design specification
- `tailwind.config.ts` — token implementation
- `src/app/globals.css` — CSS variable layer
