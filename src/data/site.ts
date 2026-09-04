const localFallback = "http://localhost:4321";

export const SITE = {
  name: "BlueSkyz Labs",
  proposition:
    "We build products that make complex things feel naturally clear.",
  url: import.meta.env.PUBLIC_SITE_URL?.trim() || localFallback,
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || null,
  securityEmail: import.meta.env.PUBLIC_SECURITY_EMAIL?.trim() || null,
} as const;

/** Public GitHub private vulnerability reporting (SECURITY.md). */
export const SECURITY_ADVISORY_URL =
  "https://github.com/BlueSkyz-Labs/SGPS-Marketing/security/advisories/new";

export const NAV = [
  { label: "Products", href: "/products/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const FOOTER_LINKS = [
  { label: "Products", href: "/products/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Support", href: "/support/" },
  { label: "Privacy", href: "/privacy/" },
  { label: "Security", href: "/security/" },
] as const;
