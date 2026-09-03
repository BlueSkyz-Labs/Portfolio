import type { SVGProps } from "react";

/**
 * Brand social marks as first-party SVGs.
 *
 * Lucide React v1 removed brand icons; keeping these local avoids a second
 * icon dependency while preserving lucide for product UI glyphs.
 */
type SocialIconProps = SVGProps<SVGSVGElement>;

function socialIconDefaults({
  className,
  ...props
}: SocialIconProps): SocialIconProps {
  return {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    className,
    ...props,
  };
}

export function GitHubIcon(props: SocialIconProps) {
  return (
    <svg {...socialIconDefaults(props)}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.2-.4 6.5-1.6 6.5-7.2a5.6 5.6 0 0 0-1.5-3.9 5.2 5.2 0 0 0-.1-3.9s-1.2-.4-4 1.5a13.4 13.4 0 0 0-7 0c-2.8-1.9-4-1.5-4-1.5a5.2 5.2 0 0 0-.1 3.9A5.6 5.6 0 0 0 2.5 7.6c0 5.6 3.3 6.8 6.5 7.2A4.8 4.8 0 0 0 8 18v4" />
      <path d="M9 18c-4.5 1.5-4.5-2.2-6.4-2.5" />
    </svg>
  );
}

export function LinkedInIcon(props: SocialIconProps) {
  return (
    <svg {...socialIconDefaults(props)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function XIcon(props: SocialIconProps) {
  return (
    <svg {...socialIconDefaults(props)}>
      <path d="M4 4l11.7 16H20L8.3 4H4z" />
      <path d="M20 4L4 20" />
    </svg>
  );
}
