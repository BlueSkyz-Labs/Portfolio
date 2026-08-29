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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.tonydemo.com",
  email: "hello@blueskyz.io",
  hero: {
    statement: "Quiet luxury,|loud conviction.",
    subline:
      "A studio building digital experiences with the discipline of a master tailor — restraint, materiality, and precision, delivered at the speed of the edge.",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/BlueSkyz-Labs" },
    { label: "X", href: "https://x.com/blueskyz" },
    { label: "LinkedIn", href: "https://linkedin.com/company/blueskyz-labs" },
  ],
} as const;

export const NAV_LINKS = SITE.nav;
export const SOCIAL_LINKS = SITE.social;
