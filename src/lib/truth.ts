export interface PublicTruthInput {
  siteUrl?: string;
  contactEmail?: string;
  securityEmail?: string;
}

export function validatePublicTruth(input: PublicTruthInput): string[] {
  const errors: string[] = [];
  if (!input.siteUrl?.startsWith("https://")) {
    errors.push("PUBLIC_SITE_URL must be an https URL");
  }
  if (!input.contactEmail?.includes("@")) {
    errors.push("PUBLIC_CONTACT_EMAIL is required");
  }
  if (!input.securityEmail?.includes("@")) {
    errors.push("PUBLIC_SECURITY_EMAIL is required");
  }
  return errors;
}
