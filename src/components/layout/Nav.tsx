"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";

/**
 * Nav — anchor links with active-section highlighting.
 *
 * SPEC.md §5.2 / §4.4 — anchor links to in-page sections, active
 * state driven by IntersectionObserver. Underline animates in
 * from left on hover, 200ms, out-expo. Reduced motion respected.
 *
 * Sticky header consumers pass this directly.
 */
export function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Only observe sections that match a nav href — avoids noise.
    const ids = NAV_LINKS.map((link) => link.href.replace(/^#/, ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Track which sections are visible; pick the topmost visible one
    // as active so the highlight tracks the user's reading position.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the section with highest visibility (ties → first/topmost).
        let topId: string | null = null;
        let topRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }

        // Fallback for the very first nav target (when hero is full-screen
        // and no section has crossed the threshold yet).
        if (!topId && typeof window !== "undefined") {
          const hash = window.location.hash.replace(/^#/, "");
          if (hash && ids.includes(hash)) topId = hash;
          else topId = ids[0] ?? null;
        }

        setActiveId(topId);
      },
      {
        // Activate when section's top edge crosses the upper third of viewport.
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-8 md:flex"
    >
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const id = link.href.replace(/^#/, "");
          const isActive = activeId === id;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative inline-block font-sans text-body-sm font-normal uppercase tracking-[0.04em] transition-colors duration-200 ease-out-expo",
                  isActive
                    ? "text-gold-champagne"
                    : "text-cream-offwhite hover:text-gold-champagne",
                )}
              >
                {link.label}
                {/* Hairline underline — animates in from left, 200ms out-expo */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-gold-champagne transition-transform duration-200 ease-out-expo",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Hidden reference to SITE for tree-shaking guard */}
      <span className="sr-only">{SITE.name}</span>
    </nav>
  );
}

export default Nav;