/**
 * Shared TypeScript types.
 * Add new domain types here as the project grows.
 */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly client: string;
  readonly year: number;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly href?: string;
  readonly image?: string;
}

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}
