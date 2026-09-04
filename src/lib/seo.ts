export function absoluteUrl(base: string, path: string): string {
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BlueSkyz Labs",
    url: siteUrl,
  } as const;
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BlueSkyz Labs",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "BlueSkyz Labs",
      url: siteUrl,
    },
  } as const;
}

export function defaultOgImagePath(): string {
  return "/social/og-default.png";
}

export function canonicalForPath(path: string, siteUrl: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(siteUrl, normalized);
}

export const PUBLIC_STATIC_PATHS = [
  "/",
  "/products/",
  "/about/",
  "/contact/",
  "/support/",
  "/privacy/",
  "/security/",
] as const;
