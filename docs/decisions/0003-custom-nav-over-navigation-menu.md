# 0003 — Custom Nav over Radix NavigationMenu

- **Status:** Accepted
- **Date:** 2026-09-03
- **Deciders:** Autonomous SGPS convergence (inferred from SPEC §6.3 JS budget + existing Nav)

## Context

SPEC.md §5.1 lists `NavigationMenu` (Radix) in the v1 primitive inventory.
The shipped desktop nav is a lightweight custom `Nav` with
`IntersectionObserver` active-section highlighting, and mobile uses a lazy
Radix Dialog. `@radix-ui/react-navigation-menu` was declared but unused,
adding supply-chain weight without UX value.

## Decision

1. Keep **custom `Nav` + lazy `MobileNavDialog`** as the v1 navigation
   surface — it already meets SPEC §4.6 / §5.2 semantics and budget.
2. **Remove** the unused `@radix-ui/react-navigation-menu` dependency.
3. Provide a shared `src/components/ui/Dialog.tsx` wrapper (no overlay tint)
   and multi-variant `Button` so the inventory remaining items are real,
   reusable primitives rather than placeholders.

## Consequences

- SPEC inventory “NavigationMenu” is satisfied by custom Nav for v1;
  revisit only if multi-level menus appear.
- Bundle and audit surface shrink by one Radix package.
- Architecture tests assert Dialog/Button exist and NavigationMenu is absent.
