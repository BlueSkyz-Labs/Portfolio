import type { ProcessStep, Project } from "@/types";
import { LIVE_SITE_URL } from "@/lib/site";
import { SO_TRO } from "@/lib/so-tro";

/**
 * Site-wide constants.
 *
 * Anything user-facing and brand-related lives here so the design system
 * is data-driven and easy to evolve without touching components.
 */

export const SITE = {
  name: "BlueSkyz Labs",
  shortName: "BlueSkyz",
  edition: "Edition 2026",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? LIVE_SITE_URL,
  hero: {
    statement: "Quiet luxury,|loud conviction.",
    subline:
      "A studio building digital experiences with the discipline of a master tailor — restraint, materiality, and precision, delivered at the speed of the edge.",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  social: [{ label: "GitHub", href: "https://github.com/BlueSkyz-Labs" }],
} as const;

export const NAV_LINKS = SITE.nav;
export const SOCIAL_LINKS = SITE.social;

export const MANIFESTO = {
  eyebrow: "Manifesto",
  title: "Clarity is a feature.",
  body: [
    "BlueSkyz Labs shapes digital products by removing what does not earn its place. The result is quieter interfaces, clearer decisions, and systems built to hold their standard over time.",
    "Design, engineering, and assurance are treated as one craft. Every interaction should feel intentional; every technical choice should be able to explain itself.",
  ],
} as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "experience-systems",
    title: "Experience Systems",
    client: "Studio / Internal",
    year: 2026,
    summary:
      "Design systems where brand, interaction, accessibility, and performance are treated as one product surface.",
    tags: ["Product", "Experience", "Web"],
  },
  {
    id: "agentic-delivery",
    title: "Agentic Delivery",
    client: "Studio / Internal",
    year: 2026,
    summary:
      "AI-assisted engineering workflows that bind plans, tests, review evidence, and safe promotion into one operating discipline.",
    tags: ["AI", "Engineering", "Assurance"],
  },
  {
    id: "edge-native-products",
    title: "Edge-Native Products",
    client: "Studio / Internal",
    year: 2026,
    summary:
      "Lean digital products shaped for fast global delivery, low runtime cost, and measurable quality budgets from the first release.",
    tags: ["Architecture", "Performance", "Cloud"],
  },
  {
    id: SO_TRO.slug,
    title: "Sổ Trọ",
    client: "Studio / Internal",
    year: 2026,
    summary: "Sổ cho Ba Mẹ giữ dãy nhà trọ.",
    tags: ["Product", "Rental ops"],
    href: SO_TRO.href,
  },
] as const;

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Frame",
    description:
      "Define the real problem, audience, constraints, success signals, and what must remain deliberately out of scope.",
  },
  {
    number: "02",
    title: "Distill",
    description:
      "Reduce the system to its essential hierarchy, interaction model, visual language, and technical boundaries before polish.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Implement the smallest coherent release with accessible semantics, explicit budgets, and reversible architectural choices.",
  },
  {
    number: "04",
    title: "Prove",
    description:
      "Exercise the product against automated checks, real browser behavior, performance evidence, and a reviewable promotion path.",
  },
] as const;

export const ABOUT = {
  eyebrow: "About",
  title: "A studio for products that need conviction.",
  body: [
    "BlueSkyz Labs works at the intersection of product design and software engineering. We turn ambiguous ideas into focused systems with a restrained visual language and an explicit quality bar.",
    "Our practice favors small surfaces, strong defaults, measurable performance, accessible interaction, and delivery evidence that can survive scrutiny.",
  ],
} as const;

export const CONTACT = {
  eyebrow: "Contact",
  title: "Have something worth making?",
  body: "Share the problem, the constraint, and what a good outcome should feel like. No public mailbox is listed — use the form on this page.",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  submitLabel: "Send inquiry",
} as const;
