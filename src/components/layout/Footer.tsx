import Link from "next/link";
import { Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "./Container";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { SO_TRO } from "@/lib/so-tro";

/**
 * Footer — single-row closing mark.
 *
 * SPEC.md §3.1 / §5.2 — single row with wordmark, social links, copyright.
 * SPEC.md §4.6 — semantic <footer>, focus ring gold, links open in new
 * tab with rel="noopener noreferrer".
 *
 * Layout (desktop, single row):
 *   [wordmark · tagline]  ───────  [socials]  [© year]
 *
 * On smaller screens this collapses to a stacked column with a hairline
 * divider above the copyright row.
 */
const SOCIAL_ICONS: Readonly<Record<string, LucideIcon>> = {
  GitHub: Github,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative border-t border-cream-offwhite/10 bg-ink-void"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <Container className="py-space-7 md:py-space-8">
        {/* ── Single row: wordmark · tagline · socials · copyright ── */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* Wordmark + tagline */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              aria-label={`${SITE.name} — home`}
              className="font-display text-heading-lg font-light text-cream-offwhite transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
            >
              {SITE.name}
              <span aria-hidden="true" className="text-gold-champagne">
                .
              </span>
            </Link>
            <p className="font-sans text-body-sm text-cream-muted">
              Quiet luxury, loud conviction.
            </p>
          </div>

          {/* Products + remaining real socials */}
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href={SO_TRO.href}
                className="font-sans text-caption uppercase tracking-[0.04em] text-cream-muted transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
              >
                Sổ Trọ
              </Link>
            </li>
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.label];
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${SITE.name} on ${link.label} (opens in new tab)`}
                    className="group inline-flex items-center gap-2 font-sans text-caption uppercase tracking-[0.04em] text-cream-muted transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 transition-colors duration-200 ease-out-expo group-hover:text-gold-champagne"
                      />
                    ) : null}
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Copyright */}
          <p className="font-sans text-caption uppercase tracking-[0.04em] text-cream-muted">
            © {year} {SITE.name}
          </p>
        </div>

        {/* Hairline + tagline row */}
        <div className="mt-space-6 border-t border-cream-offwhite/10 pt-space-4">
          <p className="font-sans text-caption uppercase tracking-[0.04em] text-cream-muted">
            Built with restraint.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
