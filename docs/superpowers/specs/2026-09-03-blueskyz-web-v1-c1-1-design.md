# BlueSkyz Labs Web V1 — C1.1 Design Architecture

**Status:** DESIGN SPEC — OWNER-APPROVED IN CHAT, PENDING WRITTEN-SPEC REVIEW  
**Date:** 2026-09-03  
**Repository:** `BlueSkyz-Labs/SGPS-Marketing`  
**Experience direction:** `C1.1 — Porcelain-first, Trust-forward Hybrid Product House`  
**Governance alignment:** SGPS / SGPS:Experience FULL / DEC-010 brand architecture  
**Implementation gate:** No implementation work starts until this written spec is reviewed and approved, then a separate implementation plan is produced.

---

## 1. Executive decision

BlueSkyz Labs Web V1 is the official public front door of BlueSkyz Labs. It is not a personal portfolio, an agency showcase, a Brand Kit gallery, a public SGPS documentation site, or a catalogue of every repository owned by BlueSkyz Labs.

The experience model is:

> **Brand gives meaning → Products give proof → Shared principles create coherence → Trust removes doubt → Action continues the relationship.**

The design direction is **C1.1 — Porcelain-first, Trust-forward Hybrid Product House**. BlueSkyz establishes the first impression; products become the conversion path immediately afterward; trust and evidence prevent the site from looking like polished vaporware.

The existing experience truth based on "Quiet Luxury", champagne gold, Cormorant Garamond, dark-only presentation, studio/atelier language, and portfolio/work/process narrative is obsolete for the new masterbrand direction. The implementation plan must explicitly supersede those legacy contracts rather than incrementally layering C1.1 over them.

---

## 2. Product and customer mission

### 2.1 Website role

The website must let a visitor who has never heard of BlueSkyz Labs:

1. understand what BlueSkyz does;
2. discover a product relevant to them;
3. understand that product's real maturity and availability;
4. verify enough evidence to decide whether to trust it;
5. take the correct next action.

### 2.2 Customer comprehension contract

Target experience outcomes:

- **5–10 seconds:** visitor understands that BlueSkyz Labs builds digital products.
- **20–30 seconds:** visitor understands there are multiple distinct products and can identify at least one potentially relevant product.
- **≤90 seconds:** visitor can understand what a selected product does, who it is for, whether it is Available/Beta/Preview/In development, and what action is possible now.
- **≤2 minutes:** visitor can reach the appropriate product, support, business, security, or contact path.

The website must not require the visitor to understand internal terminology such as SGPS, Product House, House DNA, Quiet Excellence, BPXS, or VCDI before they understand customer value.

### 2.3 Audience priority

1. Prospective product user.
2. Business/professional evaluator.
3. Partner/collaborator/potential customer.
4. Curious non-technical visitor.
5. Developer/technical evaluator.

Technical provenance is useful but must not dominate the public front door.

### 2.4 Customer jobs

Every homepage section must serve at least one of these jobs:

- **Understand:** What is BlueSkyz Labs?
- **Discover:** Is there a product for me?
- **Evaluate:** What does it do and how mature is it?
- **Trust:** Is this real and responsibly operated?
- **Act:** What can I do next?

If a section serves none of these jobs, it does not belong in V1.

---

## 3. Brand proposition and portfolio coherence

### 3.1 Proposition territory

The approved proposition territory is:

> **BlueSkyz builds products that make complex things feel naturally clear.**

This is a design/content direction, not a locked trademark/tagline. Final production copy receives a dedicated copy audit before launch.

This territory is intentionally organized around **WHY + HOW**, not a single product category. BlueSkyz is not defined as an AI company, productivity company, wellness company, education company, or generic digital innovation company.

### 3.2 Shared product philosophy

Products may solve very different problems, but they should belong to BlueSkyz because they share a way of thinking:

- make complexity clearer;
- use intelligence with purpose;
- respect human agency;
- build for real-world use;
- treat trust, accessibility, performance, security, and evidence as product requirements.

AI is a capability when relevant, not the universal masterbrand identity.

### 3.3 Endorsed product-house relationship

BlueSkyz owns the house context. Each product keeps distinct Product DNA.

Preferred endorsement:

> **A BlueSkyz Labs product**

The corporate site must not rename products into constructions such as "BlueSkyz Sổ Tâm" unless a product-specific naming decision explicitly does so.

The masterbrand should not be watermarked on every product surface.

---

## 4. Homepage information architecture

The homepage is a decision funnel:

> **Understand → Discover → Believe → Evaluate → Act**

### 4.1 Header

Minimal navigation:

- Products
- About
- Contact
- contextual `Explore products` action where useful

No V1 mega-menu. Do not create empty corporate categories such as Industries, Newsroom, Careers, Resources, Partners, Insights, or Solutions without real content.

The header uses the appropriate R4d lockup; constrained contexts may use the responsive identity / Micro Mark.

### 4.2 Hero — masterbrand clarity

The hero must answer who BlueSkyz is and what it makes. It must not be a manifesto or splash screen.

Copy direction:

> **We build products that make complex things feel naturally clear.**

Supporting copy should explain the idea in plain customer language. Primary CTA: `Explore products`. Secondary CTA: `About BlueSkyz`.

The R4d mark may be the main visual focal object here, but content must render immediately. Signature reveal motion is progressive enhancement and cannot block content or LCP.

On common laptop viewports, the next product section should be discoverable without forcing the visitor through a full-screen brand theatre sequence.

### 4.3 Featured Products

Products appear immediately after the hero.

Do not show every product with equal weight. The default editorial pattern is:

- one flagship/hero product;
- up to two secondary featured products;
- selected ecosystem products;
- `Explore all products` when the portfolio grows.

Each product card exposes only the information needed for orientation:

- product identity;
- concise customer outcome;
- optional real product visual;
- truthful public status;
- platform when useful;
- primary action.

No fake equal maturity, no "AI-powered" badge everywhere, no generic `Learn more` repeated without a meaningful action.

### 4.4 One House

This section answers why products from different domains belong together.

Approved content direction:

> **We do not build around one category. We build around a way of thinking.**

It translates internal SGPS/House principles into plain customer language. It must not expose internal framework terminology merely to prove sophistication.

### 4.5 Flagship Product Proof

A major homepage section must show one real product in depth enough to defeat the "nice concept / vaporware" interpretation.

Required proof ingredients:

- actual product screenshot or other real product artifact;
- real user problem;
- two to three real capabilities;
- truthful status;
- valid CTA.

Generated concept UI is not production evidence.

### 4.6 Trust Layer

A small, factual layer covering:

- product truth / maturity;
- privacy and security paths;
- support / recourse.

Avoid giant shield icons, unsupported certifications, and slogans such as "bank-grade" or "military-grade" unless exact claims are supported.

### 4.7 About BlueSkyz

Short, human, factual, and non-agency-like.

It explains why BlueSkyz exists and may include:

> **Tony Nguyen — Founder & CEO**

Founder visibility is a trust signal, not the primary brand identity. The homepage must remain BlueSkyz-led rather than become a personal portfolio.

Do not imply fake team size, offices, or global workforce.

### 4.8 Final Next Step

Primary: `Explore products` or equivalent customer-oriented product path.  
Secondary: `Contact BlueSkyz` when appropriate.

No newsletter modal, forced signup, or `Book a demo` unless the business process actually exists.

### 4.9 Footer

Compact corporate closure containing the real information that exists:

- BlueSkyz Labs;
- products;
- about;
- contact;
- support;
- privacy;
- security;
- terms when applicable;
- active, verified social/profile links only.

The footer can provide the final strong Ink/R4d signature moment.

---

## 5. Visual Experience System

### 5.1 North star

The experience should feel:

> **Calm authority. Precise intelligence. Human warmth.**

Working control words:

> **Clear · Considered · Capable**

"Quiet Excellence" remains an internal quality doctrine; it should be felt, not repeatedly self-claimed in public copy.

### 5.2 Core palette

Masterbrand primitives:

- **Ink:** `#0B1020`
- **Porcelain:** `#F7F8FA`
- **Cobalt:** `#2568FF`
- supporting Slate scale as semantic UI neutrals
- Verdigris only as contextual/system accent where justified

Directional visual distribution:

- Porcelain ~70%
- Ink ~23%
- Cobalt ~7%

These are review heuristics, not literal pixel quotas.

Gold/champagne is not part of the C1.1 core masterbrand experience.

### 5.3 Brand token vs semantic UI token

Raw brand colors must not automatically become UI text tokens.

The validated R4d Cobalt/Porcelain contrast is below the intended comfort level for arbitrary small normal text. Therefore Cobalt is primarily a signal/action/accent primitive. Links and small critical text must use a semantic accessible color that passes the required contrast.

Required token layering:

`Brand primitives → Semantic tokens → Component tokens`

### 5.4 Typography

V1 direction: refined modern sans-first system. Cormorant Garamond is removed from the masterbrand core.

The exact production UI typeface remains a validation decision, with an open variable sans such as Inter as a strong candidate. Selection requirements:

- excellent Vietnamese glyph quality;
- strong mobile legibility;
- minimal font payload;
- open/portable licensing or otherwise verified rights;
- consistent web/product portability.

R4d wordmark remains outlined vector artwork and is independent of runtime font loading.

Typography grammar:

- sentence case;
- display weight generally restrained rather than 800/900;
- strong scale without shouting;
- body measure around 60–70 characters;
- no all-caps giant tech slogan as default style.

### 5.5 Grid and spacing

- desktop: 12-column grid;
- tablet: 8-column grid;
- mobile: 4-column grid;
- max content width roughly 1280–1360px;
- editorial text measure roughly 680–760px;
- mobile gutters roughly 20–24px.

Use controlled asymmetry where it improves hierarchy. Symmetry is not forbidden.

Spacing uses a restrained scale (4/8/12/16/24/32/48/64/96/128 family) and must communicate grouping rather than imitate "luxury whitespace".

### 5.6 Shape and surface language

- default card radius generally 8–12px maximum;
- no universal pill treatment;
- spacing and tonal surfaces before shadows;
- restrained hairline borders;
- no glassmorphism as default;
- no giant blur orbs / neon AI gradients;
- R4d diagonal/aperture geometry appears rarely and deliberately.

### 5.7 R4d usage rhythm

R4d should follow:

> **Introduce → retreat → remind → sign.**

- Header: compact lockup.
- Hero: full mark may be focal.
- Constrained mobile: responsive identity / Micro Mark.
- Product sections: products become primary; no repeated masterbrand watermark.
- One House / transition: subtle geometry may reappear.
- Footer: final house signature.

Material/porcelain-silver expression is allowed on expressive brand surfaces, but operational UI and identity must still work in flat/solid/monochrome form.

### 5.8 Product-expression boundary

> **BlueSkyz owns the frame. Product owns the room inside it.**

BlueSkyz controls global grid, navigation, accessibility, status semantics, CTA semantics, spacing, endorsement, interaction quality, and trust conventions.

Products may control their own logo, approved accent, imagery, screenshots, illustration, tone, and feature storytelling.

Products should feel like siblings, not clones.

### 5.9 Imagery

Priority:

1. actual product UI;
2. bespoke useful illustration/diagram;
3. purposeful real photography;
4. abstract R4d expression.

Generic stock photography and generic "AI" imagery are discouraged.

### 5.10 Motion grammar

Only four motion purposes are recognized:

- Reveal
- Respond
- Transition
- Signature

Default implementation is CSS/native platform first.

Suggested timing bands:

- micro feedback: 100–180ms;
- UI state: 160–240ms;
- content reveal: 280–450ms;
- rare signature transition: maximum roughly 600–700ms.

No scroll hijacking, full-page snap, cursor gravity, decorative parallax, or repeated signature animation.

`prefers-reduced-motion` must remove unnecessary transforms, not merely shorten them.

---

## 6. Public Product Information Model

### 6.1 Product is a first-class public entity

Each public product is modeled through a validated registry/collection rather than hard-coded JSX cards.

Conceptual contract:

- identity;
- customer value;
- lifecycle;
- availability;
- audience;
- jobs-to-be-done;
- platforms;
- actions;
- evidence;
- trust/support links;
- BlueSkyz relationship;
- presentation metadata;
- provenance/freshness metadata.

### 6.2 Lifecycle and availability are distinct

Internal lifecycle vocabulary may include:

- concept
- prototype
- development
- beta
- active
- maintenance
- sunset
- archived

Availability may include:

- private
- waitlist
- preview
- public
- invite-only
- unavailable

Public labels remain simple:

- Preview
- In development
- Beta
- Available
- Sunsetting
- Archived

A development product must never render a `Try now` action unless availability truth supports that action.

### 6.3 Jobs-to-be-done before category taxonomy

The portfolio should not be front-door organized primarily as AI / Education / Property / Wellness / Mobility. Product data should capture what the user is trying to accomplish.

Technology metadata may exist but does not define the masterbrand.

### 6.4 Platforms

Canonical platform vocabulary should be structured (for example web/android/ios/macos/windows/api) rather than free-text labels.

Platform availability may differ and must be truthful.

### 6.5 CTA contract

Primary and optional secondary actions are data, not component improvisation.

Allowed vocabulary should remain small and literal, such as:

- Open product
- Try
- Explore
- Preview
- Join waitlist
- Get started
- View on GitHub
- Contact

Avoid aspirational CTA copy that obscures the action.

### 6.6 Evidence-aware marketing

Public claims may reference:

- live product URL;
- actual screenshots;
- release/store page;
- repository when relevant;
- documentation;
- privacy policy;
- security page;
- support URL.

Unsupported claims are not "TODO after publish"; they are **Do not publish**.

Internal claim state may use a guardrail such as `verified / approved / draft / prohibited` if implementation evidence shows it is useful.

### 6.7 Featured hierarchy

`featured` does not mean newest. Editorial prominence is chosen by evidence: maturity, product quality, customer value, public readiness, brand representation, and proof availability.

A future 20-product portfolio must not force the homepage to show 20 products. Scale complexity belongs in `/products`, not on the homepage.

### 6.8 Public inclusion gate

A repository does not automatically become a BlueSkyz public product.

Minimum public promotion evidence:

- clear product identity;
- clear customer problem;
- usable artifact or proof;
- product owner;
- truthful lifecycle/availability;
- support/contact path;
- required privacy/security information for its risk profile.

The current candidate portfolio includes ApexAgent, Sổ Tâm, Sổ Trọ, FluentArc, and Vững Tay Lái, but final public inclusion and prominence must follow this promotion gate rather than assume all five are equally launch-ready.

### 6.9 Product pages

Shared information contract:

1. product identity + value;
2. status/platform/action;
3. actual product proof;
4. core problem;
5. main capabilities;
6. intended audience;
7. trust/privacy/support;
8. BlueSkyz endorsement;
9. next action.

A product may route from a BlueSkyz profile page to an independent product site. URL uniformity is secondary to clear endorsed-brand relationship.

### 6.10 Source flow

Do not fetch private SGPS governance data at browser runtime.

Approved flow:

`Product project truth + SGPS governance → approved public snapshot/collection → BlueSkyz website build → public runtime`

The public registry should be versionable, diffable, deterministic, and capable of recording source revision / review freshness.

---

## 7. Trust, Credibility, and Public Evidence Architecture

### 7.1 Trust model

Trust is built through:

> **Identity → Reality → Responsibility → Recourse**

The website should not ask visitors to "trust us"; it should let them verify enough truth to decide.

### 7.2 Identity

Public corporate identity must remain factual:

- BlueSkyz Labs;
- Founder & CEO attribution where approved;
- primary corporate domain;
- corporate email;
- active official profiles only;
- company/legal/location information only when the facts and owner decision are ready for publication.

Do not fake offices, team size, user numbers, press coverage, or institutional scale.

### 7.3 Reality

Every promoted public product must have at least one meaningful proof artifact. Generated presentation mockups cannot masquerade as runtime product evidence.

### 7.4 Privacy

Corporate website privacy should document corporate-site data practices. Product-specific privacy remains owned by each product where necessary.

Where useful, user-facing trust UX should summarize the practical answer before legal prose:

- what is collected;
- why;
- how it is used;
- deletion/export path when applicable.

### 7.5 Security

Corporate security surface should provide a factual vulnerability reporting path. Do not claim certifications, bug bounties, SLAs, or "enterprise-grade" guarantees that do not exist.

A canonical security contact on the final corporate domain is preferred.

### 7.6 Support and contact routing

Corporate contact semantics should distinguish at least:

- product support;
- business/partnerships;
- security;
- general inquiry.

Do not retain agency-style copy such as "Have something worth making?" unless service work is explicitly part of the business model.

### 7.7 Analytics and consent

V1 analytics should measure customer decisions with minimum data:

- page/product view;
- product CTA;
- contact/support intent;
- basic device/referrer/performance data.

Do not add invasive session recording, fingerprinting, ad pixels, or unnecessary consent UI.

Cloudflare Web Analytics is the preferred first-party/platform candidate if it satisfies measurement needs.

### 7.8 Prohibited trust shortcuts

Do not publish without evidence:

- fake user/customer counts;
- fabricated ratings;
- press logos without real coverage;
- ISO/SOC/security badges without certification;
- unsupported uptime promises;
- vague "bank-grade" / "military-grade" security claims;
- fake testimonials;
- fake team/global-office language.

### 7.9 AI accountability

Approved operating principle:

> **AI may assist the work. BlueSkyz remains accountable for the outcome.**

AI-native engineering may be described contextually, but the public brand does not hide behind AI for accountability.

---

## 8. Interaction, Accessibility, Performance, SEO, and E4 Assurance

### 8.1 Interaction contract

Every interaction must primarily do one of:

- Navigate
- Reveal
- Confirm
- Progress

Use semantic links for navigation and semantic buttons for state/action.

### 8.2 Progressive enhancement

Architecture order:

`HTML content → CSS visual system → minimal interaction JS → optional signature motion`

If JavaScript fails, the public site must remain understandable and navigable.

### 8.3 Accessibility

Launch baseline: **WCAG 2.2 AA**.

Additional internal expectations:

- primary touch targets generally ≥44×44 CSS px;
- keyboard-first focus quality;
- skip-to-content link;
- no hover-only information;
- visible focus not clipped by containers;
- semantic heading hierarchy;
- explicit form labels;
- purposeful alt text;
- textual product status, never color alone;
- reduced-motion support;
- zoom/mobile robustness.

Accessibility wins over brand decoration when the two conflict.

### 8.4 Motion and scroll

- native scrolling;
- no splash gate;
- no scroll hijacking;
- no forced section snap;
- no decorative parallax requirement;
- signature R4d reveal must degrade to immediate/static content under reduced motion.

### 8.5 Performance

Customer-facing field goals:

- LCP good threshold: ≤2.5s at p75;
- INP good threshold: ≤200ms at p75;
- CLS good threshold: ≤0.1 at p75.

Internal ambition:

- CLS ≤0.05 where practical;
- homepage client JavaScript materially below the old `<120 kB` hard limit;
- for Astro candidate, near-zero JavaScript by default except islands that earn their cost.

Performance beats motion. A static R4d experience must remain excellent without signature effects.

### 8.6 Asset strategy

- SVG for masterbrand/vector identity;
- AVIF/WebP or appropriately optimized raster for screenshots/editorial visuals;
- fixed image dimensions to prevent layout shift;
- lazy load outside the critical viewport;
- no autoplay hero video in V1;
- typography payload kept intentionally small.

### 8.7 SEO

The website is an entity/product architecture, not a keyword farm.

Homepage metadata must describe BlueSkyz Labs rather than `Portfolio`. Product pages use product-specific titles and real customer problem language.

Requirements:

- one canonical corporate domain;
- correct canonical URLs;
- no staging domain leakage;
- sitemap for public pages only;
- robots settings that do not pretend to secure private content;
- Organization + WebSite structured data on corporate surface;
- SoftwareApplication structured data only where truthful/applicable;
- product-specific OpenGraph artwork;
- no thin programmatic SEO pages.

### 8.8 E4 validation layers

1. **Automated evidence:** lint/type/schema, architecture tests, accessibility automation, link validation, Lighthouse, bundle/asset budgets, structured data checks.
2. **Browser evidence:** Chromium, Firefox, WebKit/Safari class, mobile, keyboard, reduced motion, throttled network.
3. **Customer task tests:** real users performing real discovery/trust tasks.
4. **Brand interpretation tests:** comprehension, coherence, skepticism, recognition signals.

Minimum customer tasks:

1. Look for five seconds: What does BlueSkyz do?
2. Find a product for learning/driving (or another real customer goal).
3. Determine whether that product is currently usable.
4. Find help/support.
5. Find who is responsible for BlueSkyz.
6. Explain why the products appear to belong together.
7. Identify anything that feels exaggerated or fake.

The final skeptical question is mandatory.

### 8.9 Decision policy

Comprehension/trust failures carry more weight than visual preference.

Examples:

- "I do not know what the company does" → serious product/experience issue.
- "I prefer darker blue" → preference signal, not automatic redesign.

Do not design-by-committee.

---

## 9. Technical Architecture — Frontier-Stable Candidate

### 9.1 Principle

> **Stable core, frontier edges.**

Adopt modern technology when it reduces complexity, improves measurable customer outcomes, strengthens security/operability, or materially improves one-human/multi-agent delivery. Do not adopt technology merely because it is new.

### 9.2 Preferred V1 implementation candidate

**Preferred framework:** Astro 7  
**Build:** Vite 8 + Rolldown  
**Language:** TypeScript 6 stable baseline; TypeScript 7 remains a gated technology-adoption pilot until ecosystem/tooling support is proven for this repository  
**Runtime/tooling:** Node 24 LTS  
**Package manager:** pnpm 11  
**Styling:** Tailwind CSS 4 via Vite integration + semantic tokens + modern native CSS  
**Content:** Astro Content Collections / typed schema for the Public Product Registry  
**Client JavaScript:** zero by default; islands only where interaction earns its cost  
**Motion:** CSS + View Transitions/native browser capabilities first  
**Hosting:** Cloudflare Workers Static Assets  
**Build/deploy:** Cloudflare Workers Builds + GitHub PR integration  
**Analytics:** Cloudflare Web Analytics first, if measurement requirements are satisfied  
**Backend:** none by default  
**Database/CMS:** none in V1

### 9.3 Mandatory pre-implementation benchmark gate

Astro 7 is the preferred architecture but is **not allowed to win by trend or opinion**. Before migration implementation begins, create an isolated throwaway benchmark using the same representative C1.1 fixture (Hero + Product Grid + R4d assets + comparable CSS/content) in:

- Astro 7;
- Next.js 16.3 static export.

Measure at minimum:

- cold build ×5;
- warm build ×5;
- output HTML size;
- CSS size;
- initial gzip/brotli JavaScript;
- total critical asset size;
- Lighthouse/performance;
- LCP/CLS/INP lab evidence where meaningful;
- Playwright functional/accessibility parity;
- Cloudflare preview deployment success;
- implementation/component complexity;
- migration effort for existing QA contracts.

**Astro promotion criteria:**

- no customer-experience regression;
- accessibility and SEO parity or improvement;
- clean Cloudflare deployment;
- existing browser/QA contracts remain portable;
- materially lower initial JS and/or meaningful complexity reduction;
- migration effort remains bounded and does not jeopardize the C1.1 delivery horizon.

If these criteria are not met, adopt **Next.js 16.3 static export** as the production framework without sunk-cost bias.

The benchmark is evidence-only and must not turn into a second maintained product implementation.

### 9.4 Why Astro is preferred directionally

C1.1 is primarily a content/product-house website, not an authenticated application. Its key surfaces are static content, product discovery, evidence, SEO, responsive brand presentation, and minimal interaction. Astro makes "ship no client JavaScript unless necessary" a framework default and provides structured content collections well aligned with the Product Registry.

The current repository is small enough that the legacy framework coupling is limited, while most old homepage sections must be replaced regardless of framework. Therefore this is the lowest-cost point at which a framework switch can be evaluated responsibly.

### 9.5 Next.js fallback standard

If benchmark evidence favors Next:

- Next.js 16.3 Active LTS;
- React 19.2;
- static export / server-static first;
- Turbopack;
- client boundaries only where required;
- no full-stack Next runtime solely for a corporate contact form;
- Cloudflare Workers Static Assets rather than unnecessary dynamic runtime.

`vinext` remains a technology lab candidate while beta and is not required for V1 static hosting.

### 9.6 Modern browser platform policy

Prefer browser-native capabilities when support and progressive enhancement make them safe:

- View Transitions for selected page/signature transitions;
- Container Queries for component responsiveness;
- native Dialog/Popover where behavior and accessibility requirements are satisfied;
- CSS Anchor Positioning where it reduces JavaScript and has an acceptable fallback;
- `@scope`/modern CSS where it improves isolation;
- CSS before viewport JavaScript for responsive layout.

Rule:

> **Browser/compiler/platform does the work before a library is added.**

### 9.7 Technology adoption ladder

Recommended portfolio governance model:

`DISCOVER → WATCH → LAB → PILOT → VALIDATED → ADOPT → STANDARD → DEPRECATE`

Current BlueSkyz Web assessment:

- Astro 7 → **ADOPT candidate, benchmark-gated**
- Vite 8 / Rolldown → **ADOPT with Astro path**
- Tailwind 4 → **STANDARD**
- Node 24 LTS → **STANDARD**
- pnpm 11 → **ADOPT**
- Workers Static Assets → **ADOPT**
- Workers Builds → **ADOPT**
- modern CSS / View Transitions → **progressive ADOPT**
- Next.js 16.3 → **validated fallback / alternative standard**
- TypeScript 7 → **PILOT**
- React Compiler → **profile-gated; not needed if React runtime is absent/minimal**
- vinext → **LAB while beta**
- Biome/Oxlint → **WATCH/LAB, not default migration requirement**
- Node Current releases → **WAIT until appropriate LTS promotion**
- D1/KV/R2/Durable Objects/Workers AI → **not V1 requirements**
- heavy animation/3D frameworks → **not default V1 dependencies**

### 9.8 One-human / multi-agent engineering contract

The repository should be agent-legible by design:

- concise `AGENTS.md` / agent instructions if framework/tooling provides a reliable convention;
- canonical design/spec/plan locations;
- small understandable component boundaries;
- typed product truth;
- deterministic builds;
- local canonical source gate;
- explicit Cloudflare deployment contract;
- evidence instead of hidden conventions.

Do not make GitHub Actions a required execution dependency. GitHub remains source control + PR/review. Cloudflare is the preferred build/deployment platform, with local SGPS gates remaining canonical before promotion.

### 9.9 No unnecessary platform services

Do not add a database, CMS, KV, R2, D1, Durable Objects, Workers AI, or runtime API until a customer/product requirement earns the complexity.

A future contact endpoint may use a small Cloudflare Worker with validation/rate limiting if a real form is needed. V1 may start with clear email/contact routing if that is sufficient.

---

## 10. Security and operational architecture

### 10.1 Static-first attack surface

V1 should remain largely static. Required baseline includes:

- locked dependencies;
- supported package-manager/toolchain versions;
- supply-chain controls;
- CSP appropriate to the final asset model;
- HSTS on production domain;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy where appropriate;
- frame/embed policy appropriate to the site;
- no random third-party scripts;
- validated external links.

### 10.2 Dependency modernization

Do not combine all possible ecosystem upgrades into one unreviewable change. The implementation plan should sequence framework/hosting/toolchain changes so failures are attributable and rollback is simple.

The preferred modernization direction includes supported pnpm 11 and a current supported lint configuration. TypeScript 7 adoption remains gated by ecosystem compatibility rather than version novelty.

### 10.3 Environments

V1 needs only:

- local;
- preview;
- production.

Branch previews act as review/UAT surfaces. Do not manufacture enterprise environment tiers without a need.

### 10.4 Promotion flow

`Feature branch → local source gate → PR → Cloudflare preview → browser/E4 review → merge main → production deployment → post-deploy smoke`

Git remains source-of-truth. Do not hotfix production infrastructure in a way that is not represented in source.

---

## 11. Non-goals for V1

Do not build unless a separate approved requirement introduces them:

- complex CMS;
- database-backed corporate content;
- account/login;
- app marketplace;
- large blog/newsroom platform;
- careers portal;
- mega-menu;
- multilingual CMS platform;
- WebGL/3D hero theatre;
- AI chatbot merely for brand signalling;
- public SGPS documentation as the homepage mission;
- product recommendation engine;
- elaborate search/filtering for a five-product portfolio;
- dark/light theme toggle;
- invasive analytics/session replay;
- fake social proof.

---

## 12. Public launch gates

### P0 — required before official production promotion

- canonical corporate domain owner decision is supplied and implemented consistently;
- no staging/`portfolio.tonydemo.com` canonical metadata leakage;
- public product inventory and prominence are evidence-reviewed;
- product maturity and availability are truthful;
- every CTA works;
- founder/company identity copy is factual and approved;
- privacy path exists;
- support/contact path exists;
- security reporting path exists;
- no generated mockup masquerades as runtime product proof;
- unsupported claims = 0;
- critical broken links = 0.

The canonical domain is intentionally treated as an external owner/business dependency rather than guessed in this spec. Public production promotion is blocked until that decision is supplied.

### P1 — launch quality

- WCAG 2.2 AA;
- keyboard/reduced-motion/mobile critical paths pass;
- Core Web Vitals targets have acceptable lab evidence and a field measurement plan;
- metadata/canonical/sitemap/structured data are valid;
- social preview assets are correct;
- analytics is minimal and operational if enabled;
- source/deployment gates pass.

### P2 — post-launch maturation

- richer product-specific trust summaries where evidence exists;
- testimonials/reviews only when real and permissioned;
- updates/history where useful;
- stronger E5 recognition testing after E4 product/brand runtime evidence matures.

---

## 13. E4 acceptance matrix

| Domain                       | Minimum acceptance                                              |
| ---------------------------- | --------------------------------------------------------------- |
| Brand clarity                | Real users understand BlueSkyz builds products                  |
| Ecosystem clarity            | Visitors understand there are distinct products under one house |
| Product discovery            | Relevant product can be found in ≤2 interactions                |
| Product truth                | Status/availability understood without guessing                 |
| Trust                        | Support/privacy/security/identity paths are findable            |
| Accessibility                | WCAG 2.2 AA + manual keyboard checks                            |
| Reduced motion               | PASS                                                            |
| Mobile                       | PASS on representative narrow widths and real touch behavior    |
| Performance                  | CWV good thresholds targeted; no decorative regression accepted |
| Client JS                    | Minimal; near-zero by default if Astro path wins                |
| SEO                          | Canonical/entity/product fundamentals PASS                      |
| Broken critical links        | 0                                                               |
| Unsupported public claims    | 0                                                               |
| Fake/generated product proof | 0                                                               |
| Skeptical-user red team      | no unresolved P0 credibility issue                              |

E4 validates runtime experience in context. It does not prove unprompted standalone brand recognition; that remains a later E5 evidence domain.

---

## 14. Visual and customer red-team gates

Before promotion, run these deliberately:

### Visual red team

- blur the homepage: hierarchy must remain obvious;
- grayscale it: hierarchy and quality must remain;
- remove the R4d logo: layout/craft must still be strong;
- remove Cobalt: the experience must still work;
- imagine a competitor logo on the page: if it remains perfectly generic, distinctiveness is insufficient.

### Customer red team

Test with:

- non-technical family member;
- consumer product user;
- business evaluator;
- skeptical technologist;
- partner/collaborator;
- impatient mobile user.

Ask not only "Do you like it?" but:

> **What makes you doubt this company or product?**

Credibility failures outrank aesthetic preferences.

---

## 15. Migration posture from the existing site

### Keep conceptually

- strict TypeScript discipline;
- architecture tests as a pattern;
- Playwright cross-browser testing;
- axe accessibility testing;
- Lighthouse/performance evidence;
- bundle/asset budgets;
- static-first hosting philosophy;
- PR-first promotion;
- local source gates;
- security headers/policy discipline.

### Supersede/remove from product truth

- `Portfolio` identity;
- Quiet Luxury / Savile Row / digital atelier language;
- champagne gold core palette;
- Cormorant-led core typography;
- old Work/Manifesto/Process homepage narrative;
- equal generic "projects" instead of real product registry;
- custom cursor;
- decorative parallax;
- motion provider as a global architectural requirement;
- agency-style contact copy;
- Cloudflare Pages as the long-term hosting contract if Workers Static Assets path passes implementation validation;
- GitHub Actions as a required CI execution dependency.

### Validate before removal

- Lucide / existing icon dependency;
- any Radix primitive that still materially improves accessibility;
- React only if an island/use case genuinely benefits from it;
- existing tests individually, preserving customer-value contracts even if framework-specific tests are replaced.

---

## 16. Decision summary

1. **C1.1 is the canonical experience direction.**
2. **Porcelain-first; Ink provides depth; Cobalt signals rather than floods.**
3. **Products appear immediately after masterbrand clarity.**
4. **Real product evidence beats brand theatre.**
5. **BlueSkyz frames; products keep distinct DNA.**
6. **Product lifecycle, availability, evidence, and CTA are modeled truth.**
7. **Never fake scale.**
8. **Accessibility beats decoration; performance beats motion; truth beats marketing urgency.**
9. **Static/browser-native architecture is preferred.**
10. **Astro 7 is the preferred V1 implementation candidate, but must beat Next 16.3 static through a mandatory pre-implementation benchmark gate.**
11. **Cloudflare Workers Static Assets + Workers Builds are the preferred hosting/build direction.**
12. **No GitHub Actions dependency is required for canonical project convergence.**
13. **No CMS/database/runtime service is added without an earned requirement.**
14. **Technology adoption follows evidence maturity rather than hype.**
15. **E4 promotion requires real customer/browser/quality evidence.**

---

## 17. Explicit dependencies that block public promotion but not design/implementation planning

These are external truth inputs, not unresolved design ambiguity:

- final canonical corporate domain;
- final public product inventory and each product's lifecycle/availability;
- real product screenshots/artifacts approved for public use;
- approved founder/company bio wording;
- product/corporate privacy and support destinations;
- final production UI typeface after Vietnamese/accessibility/performance validation;
- naming/trademark/rightsholder decisions where required by SGPS governance.

The implementation plan must model these as gates and safe fallbacks. It must not invent values merely to close a checklist.

---

## 18. Spec review checklist

This design is intentionally scoped to BlueSkyz Web V1. It defines experience, product-information, trust, assurance, and technical architecture. It does **not** prescribe implementation task order; that belongs in the implementation plan after written-spec approval.

Before planning implementation, confirm:

- no contradictory legacy design contract remains treated as canonical;
- Astro-vs-Next benchmark is the first technical decision gate;
- no production claim or product status is fabricated to satisfy layout;
- public launch blockers remain explicit owner/evidence dependencies;
- implementation remains small enough to converge through staged PRs rather than a giant rewrite.
