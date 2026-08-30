# BlueSkyz Labs Portfolio — Design Specification

> **"Quiet Luxury, Loud Conviction."**
> The web equivalent of a bespoke Savile Row suit: impeccable fit, restraint as the loudest gesture, and materials that whisper rather than shout.

---

## 1. Concept & Vision

### The Quiet Luxury Manifesto

**Quiet luxury** is the discipline of removing everything that is not essential — until what remains cannot be ignored. It is the opposite of attention-grabbing: it is _attention-earning_. A user who lands on this site should feel they have arrived somewhere curated, not somewhere that was launched.

We are not building a startup MVP. We are not building a template. We are building a **digital atelier** — a place where the work, the craft, and the people speak first; where the interface recedes into the background like a perfectly cut window frame that only draws attention to what it frames.

### The Savile Row Analogy

A bespoke suit is quiet because every decision has been made:

- The fabric was chosen, not defaulted
- The buttons are horn, not plastic
- The lapel is hand-stitched, not fused
- The fit is tailored to a body, not a mannequin

This portfolio is the web equivalent. Every pixel is chosen. Every transition is intentional. Nothing is here because it was easy — only because it was right.

### The Visitor's First Seven Seconds

A visitor who arrives should feel:

1. **Stillness** — the page does not move at them, it holds
2. **Authority** — the typography and color say "this person has taste"
3. **Curiosity** — there is something to discover, but it is not sold
4. **Respect** — the page respects their time, their attention, their intelligence

### Brand Pillars

- **Restraint** — if a design choice does not earn its place, it is removed
- **Materiality** — colors, fonts, and motion evoke physical materials
- **Permanence** — nothing here feels trendy or disposable
- **Precision** — alignment, spacing, and motion are surgical

---

## 2. Design Language

### 2.1 Color Palette

The palette is deliberately small. Four colors, used with discipline.

| Token              | Hex       | Use                                                     |
| ------------------ | --------- | ------------------------------------------------------- |
| `--ink-void`       | `#0A0A0A` | Primary background (near-black, warmer than pure black) |
| `--ink-charcoal`   | `#1A1A1A` | Surface elevation (cards, dividers, hover states)       |
| `--ink-graphite`   | `#2A2A2A` | Tertiary surfaces, subtle borders                       |
| `--gold-champagne` | `#C9A962` | Accent only — links, dividers, selected states, key UI  |
| `--cream-offwhite` | `#F5F5F0` | Primary text (warm off-white, never pure `#FFF`)        |
| `--cream-muted`    | `#A8A8A0` | Secondary text, captions, metadata                      |

**Rules of use:**

- The gold accent is a _single_ hairline (`1px` solid `var(--gold-champagne)`), not a fill. Champagne is the thread of a stitch, not a button color.
- Never use pure black (`#000000`) or pure white (`#FFFFFF`). The warmth of the off-palette is what makes the design feel _physical_.
- Dark mode is the only mode for v1. Light mode is a v2 consideration; the palette is engineered so it could be inverted with a 1-line CSS variable change.

### 2.2 Typography

Typography carries the entire brand voice. Two families, used surgically.

**Display: Cormorant Garamond**

- A 16th-century garalde, used at the largest sizes for hero statements and section titles
- Weight 300 (Light) for restraint; 500 (Medium) for emphasis
- Italic (300/500) used for the occasional poetic line
- Letter-spacing: `0.005em` tight, never wider than `0.02em`

**Body: DM Sans**

- A humanist sans, geometric but warm
- Weights 400 (Regular) body, 500 (Medium) UI labels, 700 (Bold) only for the most emphatic CTA
- Letter-spacing: `-0.011em` for body, `0.04em` for uppercase labels

**Scale (8px base):**

- `text-display-2xl` — 96px / 1.0 line-height (hero statements)
- `text-display-xl` — 72px / 1.05
- `text-display-lg` — 56px / 1.1
- `text-display-md` — 40px / 1.15
- `text-display-sm` — 32px / 1.2
- `text-heading-lg` — 24px / 1.3
- `text-heading-md` — 20px / 1.4
- `text-body-lg` — 18px / 1.6
- `text-body` — 16px / 1.65
- `text-body-sm` — 14px / 1.7
- `text-caption` — 12px / 1.5 (uppercase, letter-spaced)

### 2.3 Spatial System

The 8px grid is non-negotiable. Every margin, padding, and gap is a multiple of 8.

- `space-1` = 4px (use sparingly, only inside chips/badges)
- `space-2` = 8px
- `space-3` = 16px
- `space-4` = 24px
- `space-5` = 32px
- `space-6` = 48px
- `space-7` = 64px
- `space-8` = 96px
- `space-9` = 128px
- `space-10` = 192px (section dividers)

**Container:** max-width 1440px, with 96px horizontal padding on desktop, 48px on tablet, 24px on mobile.

**Section vertical rhythm:** minimum `space-9` (128px) between major sections on desktop, `space-8` (96px) on tablet, `space-7` (64px) on mobile.

**Whitespace is the design.** When in doubt, add space.

### 2.4 Motion Philosophy

Motion is the _fingerprint_ of an interface. We use motion to:

1. Confirm an action (button press, link hover)
2. Guide attention (a section entering viewport)
3. Establish hierarchy (the hero animates first, the footer last)

We do _not_ use motion to:

- Impress
- Fill waiting time
- Demonstrate that we know how to animate

**Timing:** all transitions are **200–400ms**. Never faster (feels jumpy) or slower (feels sluggish).

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) for entries, `cubic-bezier(0.4, 0, 0.2, 1)` (standard) for state changes. Never `linear`.

**Distance:** elements move between **8px and 24px** during animation. Larger movement is reserved for full-page transitions.

**Respect `prefers-reduced-motion`.** When set, all motion reduces to opacity-only fades at 150ms.

### 2.5 Shape & Edge

A common mistake is making everything rounded. We mix:

- **Sharp 0px** on hero text, divider lines, primary buttons
- **Soft 4px** on cards, inputs, secondary surfaces
- **Pill 9999px** only on tags and status badges
- **Diagonal 45°** on the occasional accent cut (use sparingly)

The mix of sharp and soft is what makes the design feel _intentional_ rather than template-y.

### 2.6 Elevation & Shadow

In dark mode, shadows are subtle and warm:

- `--shadow-sm`: `0 1px 2px rgba(0,0,0,0.3)`
- `--shadow-md`: `0 4px 12px rgba(0,0,0,0.4)`
- `--shadow-lg`: `0 12px 32px rgba(0,0,0,0.5)`
- `--shadow-gold`: `0 0 0 1px var(--gold-champagne)` (used on focus rings only)

No drop shadows under text. No glow effects. No glassmorphism.

---

## 3. Layout & Structure

### 3.1 Information Architecture (v1, Single Page)

```
┌─────────────────────────────────────────────┐
│  HEADER (sticky, minimal)                   │
│  · Wordmark left · Nav center · CTA right   │
├─────────────────────────────────────────────┤
│  HERO (100vh)                               │
│  · Full-viewport · Asymmetric · Typographic │
├─────────────────────────────────────────────┤
│  MANIFESTO                                  │
│  · One column · 720px max-width · Centered  │
├─────────────────────────────────────────────┤
│  WORK / SELECTED PIECES                     │
│  · Asymmetric 2-column grid                 │
├─────────────────────────────────────────────┤
│  PROCESS                                    │
│  · 4-step horizontal sequence               │
├─────────────────────────────────────────────┤
│  ABOUT (split: image + text)                │
├─────────────────────────────────────────────┤
│  CONTACT (centered, minimal form)           │
├─────────────────────────────────────────────┤
│  FOOTER (single row, wordmark + links)      │
└─────────────────────────────────────────────┘
```

### 3.2 Hero — The Opening Statement

The hero is the most important screen. It is a **typographic statement**, not a marketing pitch.

- Background: `var(--ink-void)` with a subtle radial gradient to `var(--ink-charcoal)` in the lower-right
- A single hairline gold rule at the 8% horizontal mark (a horizon line)
- A 4–8 word statement at 96px Cormorant Garamond Light, italic optional
- A 1-sentence subline at 18px DM Sans, `--cream-muted`
- A small uppercase meta line ("Portfolio — 2024 Edition" or similar) at 12px in `--cream-muted`
- A scroll cue: a single hairline vertical line, 64px tall, fading from 0% to 100% opacity, centered at the bottom
- The hero takes exactly **100vh** on desktop, **100svh** on mobile (respects browser chrome)

No carousel. No video background. No 3D. The hero is _the typography_.

### 3.3 Grid System

- **Desktop (≥1024px):** 12-column grid, 96px gutter margin, 24px column gap
- **Tablet (768–1023px):** 8-column grid, 48px gutter margin, 16px column gap
- **Mobile (<768px):** 4-column grid, 24px gutter margin, 16px column gap

Asymmetric layouts: prefer 5/7, 4/8, 7/5 splits over 6/6. Symmetry is the default of templates; asymmetry is the default of designers.

### 3.4 Responsive Strategy

- **Mobile-first** CSS, with `min-width` media queries
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1440`
- Hero font scales: 96px → 72px (xl) → 56px (lg) → 40px (md) → 32px (sm)
- Section padding scales: 128px → 96px (lg) → 64px (md) → 48px (sm)

---

## 4. Features & Interactions

### 4.1 Smooth Scroll

- `scroll-behavior: smooth` on `html`
- Native CSS, no library
- A subtle "scroll progress" hairline (1px) in `--gold-champagne` along the top of the viewport

### 4.2 Scroll-Triggered Animations

Framer Motion's `useInView` (or `IntersectionObserver`) for:

- Section titles: fade up 16px, 400ms, out-expo
- Section bodies: fade up 8px, 300ms, out-expo, 100ms after the title
- Project cards: staggered 80ms between siblings
- All triggers fire once, no re-triggering on scroll back up

### 4.3 Subtle Parallax

- The hero's hairline rule moves at `0.4x` scroll speed
- Project card images move at `0.9x` (slower than scroll, creating depth)
- Implemented via CSS `transform: translate3d()` driven by `useScroll`, never `top/left` (no layout thrash)
- Disabled on mobile and when `prefers-reduced-motion: reduce`

### 4.4 Micro-Interactions

| Element      | Interaction                                                    |
| ------------ | -------------------------------------------------------------- |
| Nav link     | Underline animates in from left, 200ms, out-expo               |
| Primary CTA  | Background fades from transparent to gold, 250ms; text inverts |
| Project card | Image scales 1.02x; gold hairline border-bottom draws in 300ms |
| Form input   | Bottom border thickens from 1px to 2px on focus; label rises   |
| Scroll cue   | Pulses opacity 0.4 → 1.0 → 0.4 over 2.4s, infinite             |
| Gold accents | Never animate; they are constants                              |

### 4.5 Cursor (Desktop Only)

On hoverable pointer devices:

- Default: native cursor
- Over interactive elements: a 1px gold ring (8px diameter) following the cursor with 80ms lerp
- Over text selections: native text cursor

Implemented as a custom `useRef` cursor + `requestAnimationFrame` loop. Hidden on touch devices.

### 4.6 Keyboard & Accessibility

- All interactive elements are reachable via Tab
- Focus ring: 1px solid `var(--gold-champagne)`, 2px offset
- Skip link at the top of the page: "Skip to content"
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- ARIA only where semantics fail; never on a `<button>` that already does the right thing
- `aria-label` on icon-only buttons
- Color contrast: `--cream-offwhite` on `--ink-void` = **16.8:1** (AAA)

---

## 5. Component Inventory

### 5.1 shadcn/ui Primitives (in `src/components/ui/`)

| Component        | Variants                                 | Notes                                       |
| ---------------- | ---------------------------------------- | ------------------------------------------- |
| `Button`         | primary · secondary · ghost · link       | Primary is gold-fill; secondary is hairline |
| `Input`          | default · focus · error · disabled       | Bottom-border only, no box                  |
| `Textarea`       | same as Input                            | Min 4 rows                                  |
| `Dialog`         | default                                  | Radix Dialog primitive, no overlay tint     |
| `NavigationMenu` | vertical (mobile) · horizontal (desktop) | Radix NavigationMenu                        |

(Initial v1 ships with these five; others added as needed.)

### 5.2 Layout Components (in `src/components/layout/`)

| Component   | Responsibility                                                    |
| ----------- | ----------------------------------------------------------------- |
| `Header`    | Sticky, blurred-on-scroll, wordmark + nav + CTA                   |
| `Footer`    | Single row, wordmark, social links, copyright                     |
| `Nav`       | Anchor links, active-section highlight via `IntersectionObserver` |
| `Container` | Max-width + horizontal padding wrapper                            |

### 5.3 Section Components (in `src/components/sections/`)

| Section     | Purpose                                             |
| ----------- | --------------------------------------------------- |
| `Hero`      | Full-viewport typographic statement + scroll cue    |
| `Manifesto` | Long-form text block, centered, 720px max-width     |
| `Work`      | Asymmetric 2-column project grid                    |
| `Process`   | 4-step horizontal sequence with hairline connectors |
| `About`     | 50/50 split: portrait + bio text                    |
| `Contact`   | Centered minimal form: name, email, message         |

### 5.4 State Inventory

Every component has explicit states:

- **default** — the resting state
- **hover** — pointer over the element
- **focus** — keyboard focus (visible only for `:focus-visible`)
- **active** — pointer down / key pressed
- **disabled** — `opacity: 0.4`, `cursor: not-allowed`
- **loading** — for form submit, a single hairline progress bar in gold
- **error** — text turns `--gold-champagne` (yes, we use gold for errors — it's the only "loud" color in the palette)
- **empty** — for collections, a centered single-line message in `--cream-muted`

---

## 6. Technical Approach

### 6.1 Stack

| Layer         | Tool                                | Why                                             |
| ------------- | ----------------------------------- | ----------------------------------------------- |
| Framework     | **Next.js 15** (App Router, RSC)    | Server components by default, edge-ready        |
| Language      | **TypeScript 5.x** (strict mode)    | Catches the design system regressions           |
| Styling       | **Tailwind CSS v4** + CSS variables | Utility-first, but with our custom token layer  |
| UI primitives | **shadcn/ui** + **Radix UI**        | Accessible primitives, unstyled, we own the CSS |
| Animation     | **Framer Motion**                   | Best-in-class, gesture-aware, SSR-friendly      |
| Icons         | **Lucide React**                    | Open-source, consistent stroke width            |
| Font loading  | `next/font/google`                  | Self-hosted, no FOUT, zero CLS                  |
| Deploy        | **Cloudflare Pages** (Edge)         | Global, fast, free for our scale                |
| DNS           | Cloudflare                          | portfolio.tonydemo.com                          |

### 6.2 TypeScript Configuration

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"noImplicitOverride": true`
- Path alias: `@/*` → `src/*`

### 6.3 Performance Budget

- **LCP** < 1.2s (target: 0.8s)
- **CLS** < 0.05 (target: 0)
- **INP** < 200ms (target: 100ms)
- **Total JS** < 120KB gzipped (initial route)
- **Lighthouse**: 100 / 100 / 100 / 100 (perf/a11y/bp/seo)

### 6.4 Project Structure

```
src/
├── app/                  # App Router routes
│   ├── layout.tsx        # Root layout: fonts, metadata, header/footer
│   ├── page.tsx          # Home: composition of all sections
│   ├── globals.css       # Tailwind directives + CSS variables + base styles
│   └── not-found.tsx     # 404 page
├── components/
│   ├── ui/               # shadcn/ui primitives (Button, Input, etc.)
│   ├── layout/           # Header, Footer, Nav, Container
│   └── sections/         # Hero, Manifesto, Work, Process, About, Contact
├── lib/
│   ├── utils.ts          # cn() helper, className utilities
│   └── constants.ts      # Site metadata, nav links, social URLs
└── types/
    └── index.ts          # Shared TypeScript types
```

### 6.5 Deployment

- **Platform**: Cloudflare Pages
- **Build command**: `pnpm build`
- **Output**: OpenNext Cloudflare adapter → `.open-next/`
- **Domain**: `portfolio.tonydemo.com` (CNAME)
- **Branch**: `main` is production, `develop` is preview
- **Env vars**: managed in Cloudflare dashboard, mirrored in `.env.example`

### 6.6 Quality Gates (Pre-Commit)

1. `pnpm typecheck` — zero errors
2. `pnpm lint` — zero errors, zero warnings
3. `pnpm format:check` — Prettier clean
4. `pnpm build` — successful build, no bundle-size regression > 5%

---

## 7. The Single Sentence

If this spec were one sentence, it would be:

> _Restraint, materiality, and precision — applied with the discipline of a master tailor, delivered at the speed of the edge._

That is the design. That is the code. That is the portfolio.
