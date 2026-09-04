export interface PublicTruthInput {
  siteUrl?: string;
  contactEmail?: string;
  securityEmail?: string;
}

/** RFC 2606 / common non-production hosts that must never pass a production truth gate. */
const RESERVED_HOST_SUFFIXES = [
  "example.com",
  "example.org",
  "example.net",
  "invalid",
  "localhost",
  "test",
] as const;

function hostnameOf(siteUrl: string): string | null {
  try {
    return new URL(siteUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isReservedDocumentationHost(hostname: string): boolean {
  if (hostname === "127.0.0.1" || hostname === "::1") return true;
  return RESERVED_HOST_SUFFIXES.some(
    (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`),
  );
}

/**
 * Sites that must not be treated as indexable production identity.
 * Includes local/dev hosts, workers.dev previews, and RFC 2606 documentation domains.
 */
export function isNonProductionSiteUrl(siteUrl: string): boolean {
  const hostname = hostnameOf(siteUrl);
  if (!hostname) return true;
  if (hostname.endsWith(".workers.dev")) return true;
  return isReservedDocumentationHost(hostname);
}

function isPlausibleEmail(value: string | undefined): boolean {
  if (!value) return false;
  // Minimal shape only — do not invent corporate addresses.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validatePublicTruth(input: PublicTruthInput): string[] {
  const errors: string[] = [];
  if (!input.siteUrl?.startsWith("https://")) {
    errors.push("PUBLIC_SITE_URL must be an https URL");
  } else if (isNonProductionSiteUrl(input.siteUrl)) {
    errors.push(
      "PUBLIC_SITE_URL must be a canonical corporate https domain (not localhost, workers.dev, or documentation/example hosts)",
    );
  }
  if (!isPlausibleEmail(input.contactEmail)) {
    errors.push("PUBLIC_CONTACT_EMAIL is required");
  }
  if (!isPlausibleEmail(input.securityEmail)) {
    errors.push("PUBLIC_SECURITY_EMAIL is required");
  }
  return errors;
}
