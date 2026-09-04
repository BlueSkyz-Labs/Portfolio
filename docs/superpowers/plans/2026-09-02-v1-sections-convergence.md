# V1 Narrative Sections Convergence Implementation Plan

> **Historical / superseded.** Atelier-era Next.js plan. Canonical SoT is C1.1 Astro (`docs/superpowers/plans/2026-09-04-blueskyz-web-v1-c1-1-implementation.md`). Do not execute this plan against current `main`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every Sprint-2 `forthcoming` placeholder on the home page with a complete, accessible, performance-budgeted v1 narrative that follows `SPEC.md` without exposing private repository or customer information.

**Architecture:** Keep section content server-rendered and data-driven. Add one tiny reusable client reveal boundary that reuses the existing lazy-loaded Framer Motion runtime, while keeping form delivery progressive-enhancement friendly and dependency-free. Product content must be public-safe: use BlueSkyz Labs studio language and generic internal practice/capability pieces only; do not derive copy from private repositories.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5.6 strict, Tailwind CSS 4.3 via `@config`, Framer Motion 11 `LazyMotion`, Playwright, axe-core, Lighthouse CI.

**Spec:** `SPEC.md`

## Global Constraints

- Preserve `SPEC.md` single-page IA: Hero → Manifesto → Work → Process → About → Contact.
- Preserve the hard initial-route JavaScript budget: **<120 kB**.
- Preserve exact-base G5: no bundle regression greater than 5%.
- Keep content server-rendered wherever interaction is not required.
- Do not add a dependency for section reveal, form validation, or form submission.
- Respect `prefers-reduced-motion`; no required content may depend on animation completing.
- Keep semantic landmarks and headings valid; sections use stable IDs consumed by `Nav`.
- Do not expose private repository names, customer names, URLs, or private product details.
- Contact must remain usable without a JavaScript API route because the site is a static export.
- All changes must pass production dependency audit, architecture tests, typecheck, lint, format, static export, Playwright cross-browser/a11y, Lighthouse, and the hard JS budget before merge.

---

### Task 1: Add the failing v1 narrative contract

**Files:**

- Create: `tests/e2e/sections.spec.ts`

**Interfaces:**

- Consumes: existing section IDs from `src/app/page.tsx` and the `SPEC.md` IA.
- Produces: an executable contract for all five v1 sections and the removal of placeholder copy.

- [ ] **Step 1: Write the failing test**

```ts
import { test, expect } from "@playwright/test";

const sections = ["manifesto", "work", "process", "about", "contact"] as const;

test.describe("V1 narrative sections", () => {
  test("all required sections render real content instead of placeholders", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    for (const id of sections) {
      const section = page.locator(`#${id}`);
      await expect(section, `#${id} must exist exactly once`).toHaveCount(1);
      await expect(section).toBeVisible();
      await expect(section.getByRole("heading").first()).toBeVisible();
    }

    await expect(page.getByText(/forthcoming/i)).toHaveCount(0);
  });

  test("work and process expose structured content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("#work article")).toHaveCount(3);
    await expect(page.locator("#process li")).toHaveCount(4);
  });

  test("contact exposes labeled native controls and direct email fallback", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
  });

  test("reduced motion keeps narrative content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    for (const id of sections) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(
        page.locator(`#${id}`).getByRole("heading").first(),
      ).toBeVisible();
    }
  });
});
```

- [ ] **Step 2: Verify RED on the exact feature head**

Run in PR CI: `pnpm test:e2e`

Expected: FAIL because `page.tsx` still contains `forthcoming`, the placeholder sections have no headings, `#work article` count is 0, `#process li` count is 0, and the contact controls do not exist.

- [ ] **Step 3: Commit the failing contract before production code**

Commit message: `test: define v1 narrative section contract`

---

### Task 2: Add public-safe content data

**Files:**

- Modify: `src/lib/constants.ts`
- Modify: `src/types/index.ts`

**Interfaces:**

- Consumes: `Project` and site-wide constants.
- Produces: `MANIFESTO`, `PROJECTS`, `PROCESS_STEPS`, `ABOUT`, and `CONTACT` constants used by server section components.

- [ ] **Step 1: Extend types only as required**

Add:

```ts
export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}
```

Keep `Project` unchanged.

- [ ] **Step 2: Add public-safe constants**

Use exactly three studio-owned practice pieces, all with `client: "BlueSkyz Labs"` and no private URLs:

```ts
export const PROJECTS: readonly Project[] = [
  {
    id: "experience-systems",
    title: "Experience Systems",
    client: "BlueSkyz Labs",
    year: 2026,
    summary:
      "Design systems where brand, interaction, accessibility, and performance are treated as one product surface.",
    tags: ["Product", "Experience", "Web"],
  },
  {
    id: "agentic-delivery",
    title: "Agentic Delivery",
    client: "BlueSkyz Labs",
    year: 2026,
    summary:
      "AI-assisted engineering workflows that bind plans, tests, review evidence, and safe promotion into one operating discipline.",
    tags: ["AI", "Engineering", "Assurance"],
  },
  {
    id: "edge-native-products",
    title: "Edge-Native Products",
    client: "BlueSkyz Labs",
    year: 2026,
    summary:
      "Lean digital products shaped for fast global delivery, low runtime cost, and measurable quality budgets from the first release.",
    tags: ["Architecture", "Performance", "Cloud"],
  },
] as const;
```

Add four process steps: **Frame**, **Distill**, **Build**, **Prove**. Add concise manifesto/about/contact copy consistent with `SPEC.md` and the existing hero; do not claim customer outcomes or private facts.

- [ ] **Step 3: Commit data model**

Commit message: `feat(content): define public v1 portfolio narrative`

---

### Task 3: Add the minimal reveal primitive

**Files:**

- Create: `src/components/ui/Reveal.tsx`
- Modify: `src/components/providers/MotionProvider.tsx`

**Interfaces:**

- Consumes: existing lazy `domAnimation` Motion features.
- Produces: `Reveal({ children, delay?, distance? })` for section title/body entry motion.

- [ ] **Step 1: Make reduced-motion policy global**

Wrap the existing `LazyMotion` children with `MotionConfig reducedMotion="user"` so all new Motion entry effects honor the operating-system preference without adding per-section hooks.

- [ ] **Step 2: Create the minimal wrapper**

```tsx
"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  distance = 16,
}: {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly distance?: 8 | 16 | 24;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
```

No new dependency and no scroll listener per section.

- [ ] **Step 3: Commit motion primitive**

Commit message: `feat(ui): add reduced-motion reveal primitive`

---

### Task 4: Implement Manifesto, Work, Process, and About as server sections

**Files:**

- Create: `src/components/sections/ManifestoSection.tsx`
- Create: `src/components/sections/WorkSection.tsx`
- Create: `src/components/sections/ProcessSection.tsx`
- Create: `src/components/sections/AboutSection.tsx`

**Interfaces:**

- Consumes: `Container`, `Reveal`, and the public constants from Task 2.
- Produces: semantic `<section>` components with IDs `manifesto`, `work`, `process`, `about`.

- [ ] **Step 1: Manifesto**

Use one centered column with `max-w-[720px]`, a caption label, a display heading, and two short body paragraphs. Gold appears only as a hairline divider.

- [ ] **Step 2: Work**

Render exactly three semantic `<article>` cards in an asymmetric responsive grid. Each card includes year/client metadata, title, summary, and tags. When `Project.image` is absent, render a non-informational typographic surface using the project number and title instead of inventing imagery.

- [ ] **Step 3: Process**

Render exactly four `<li>` steps: Frame, Distill, Build, Prove. Desktop is horizontal with hairline connectors; mobile stacks vertically. Each step has its number, title, and one-paragraph description.

- [ ] **Step 4: About**

Use an asymmetric split. The visual side is a CSS-only material panel with no fake portrait or inaccessible decorative image. The copy side describes BlueSkyz Labs as a studio focused on restrained design, product engineering, and verifiable delivery; do not claim team size, location, clients, awards, or revenue.

- [ ] **Step 5: Commit server sections**

Commit message: `feat(sections): implement v1 studio narrative`

---

### Task 5: Implement a dependency-free contact section

**Files:**

- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/sections/ContactSection.tsx`

**Interfaces:**

- Consumes: `SITE.email`, optional `NEXT_PUBLIC_CONTACT_ENDPOINT` at build time.
- Produces: a semantic native form plus a direct `mailto:` fallback.

- [ ] **Step 1: Add server-safe form primitives**

`Input` and `Textarea` use native labels/controls, bottom-border styling, `required`/`type` passthrough, `aria-describedby` passthrough, and no client JavaScript. `Button` renders a native `<button>` with the primary quiet-luxury treatment and minimum 44px hit target.

- [ ] **Step 2: Add progressive enhancement contact form**

Read:

```ts
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
```

When present, render `action={endpoint}` and `method="post"`. When absent, render the same fields with `action={`mailto:${SITE.email}`}` and `encType="text/plain"`. Always render a separate direct email link `mailto:${SITE.email}` beneath the form so contact remains available even when the visitor does not use the form workflow.

Use native `required`, `type="email"`, and `autoComplete` attributes; do not ship a client validation library.

- [ ] **Step 3: Commit contact surface**

Commit message: `feat(contact): add progressive enhancement contact form`

---

### Task 6: Compose the real home narrative and remove placeholders

**Files:**

- Modify: `src/app/page.tsx`

**Interfaces:**

- Consumes: all section components from Tasks 4–5.
- Produces: the final v1 home composition in the `SPEC.md` order.

- [ ] **Step 1: Replace placeholder markup**

The final composition is exactly:

```tsx
<>
  <HeroSection />
  <ManifestoSection />
  <WorkSection />
  <ProcessSection />
  <AboutSection />
  <ContactSection />
</>
```

Remove every `forthcoming` comment/string.

- [ ] **Step 2: Commit composition**

Commit message: `feat(home): converge complete v1 narrative`

---

### Task 7: GREEN verification and performance gate

**Files:**

- Modify only if a failing gate identifies a concrete defect.

**Interfaces:**

- Consumes: exact PR head and exact `main` base.
- Produces: merge evidence.

- [ ] **Step 1: Verify section contract**

Run: `pnpm test:e2e`

Expected: all v1 narrative tests plus existing smoke/a11y tests pass across Chromium, Firefox, WebKit, and mobile Chromium.

- [ ] **Step 2: Run full repository gates**

Run:

```bash
pnpm audit --prod --audit-level=high
pnpm test:architecture
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm test:e2e
pnpm lighthouse
```

Expected: zero blocking failures.

- [ ] **Step 3: Inspect exact-base bundle evidence**

Require both:

- Product Truth hard budget: candidate First Load JS **<120 kB**.
- G5: candidate does not regress >5% versus exact PR base.

If the bundle gate fails, reduce client boundaries first; do not weaken the budget.

- [ ] **Step 4: Review PR diff and threads**

Require no unresolved review thread and no accidental private repository/customer identifiers in user-facing copy.

- [ ] **Step 5: Merge only exact verified head**

Use squash merge with `expected_head_sha` and verify resulting `main` before considering the workstream converged.
