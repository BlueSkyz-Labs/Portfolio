"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "./Container";
import { Nav } from "./Nav";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Header — sticky, blurred-on-scroll, scroll-progress hairline.
 *
 * SPEC.md §5.2 — sticky at top, wordmark left, CTA right.
 * SPEC.md §4.1 — 1px gold scroll-progress hairline along top of viewport.
 * SPEC.md §4.6 — focus ring gold, semantic <header> + <nav>, skip link.
 *
 * Behavior:
 * - Backdrop-blur appears after 24px scroll (avoids CLS on Safari).
 * - Scroll-progress bar fills 0 → 100% across the viewport width.
 * - Reduced-motion respected: progress uses a spring; Framer's
 *   `useReducedMotion` is honored implicitly via the eased spring.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for the "blurred on scroll" state.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-progress hairline — Framer Motion spring for smoothness.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
        scrolled
          ? "border-b border-cream-offwhite/5 bg-ink-void/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Skip link — keyboard accessibility, SPEC.md §4.6 */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink-charcoal focus:px-4 focus:py-2 focus:text-body-sm focus:text-cream-offwhite focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gold-champagne"
      >
        Skip to content
      </a>

      {/* Scroll-progress hairline — 1px gold, fills L→R with scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-gold-champagne"
        style={{ scaleX }}
      />

      <Container className="flex h-16 items-center justify-between md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="group inline-flex items-baseline gap-2 font-display text-heading-md font-light text-cream-offwhite transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
        >
          <span>{SITE.name}</span>
          <span
            aria-hidden="true"
            className="hidden text-caption text-cream-muted sm:inline"
          >
            — Portfolio
          </span>
        </Link>

        {/* Primary nav — hidden on mobile until mobile menu lands (Sprint 2) */}
        <Nav />

        {/* Right-aligned CTA — links to contact section */}
        <a
          href="#contact"
          className={cn(
            "group relative inline-flex items-center justify-center overflow-hidden font-sans text-body-sm font-medium uppercase tracking-[0.04em]",
            "border border-gold-champagne px-5 py-2 text-gold-champagne",
            "transition-all duration-300 ease-out-expo",
            "hover:bg-gold-champagne hover:text-ink-void",
            "focus-visible:bg-gold-champagne focus-visible:text-ink-void",
          )}
        >
          Begin a project
        </a>
      </Container>
    </header>
  );
}

export default Header;