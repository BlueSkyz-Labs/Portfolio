"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Nav } from "./Nav";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MobileNavDialog = lazy(
  () => import("@/components/layout/MobileNavDialog"),
);

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
 * - Progress is a direct transform of scroll position, so reduced-motion
 *   users are not given an additional spring/easing animation.
 * - Mobile keeps the wordmark and a 44px menu trigger; the dialog itself is
 *   lazy-loaded only after interaction so it does not tax the initial route.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateFromScroll = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(scrollY / scrollable, 0), 1);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const nextScrolled = scrollY > 24;
      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateFromScroll);
      }
    };

    updateFromScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeAtDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
        scrolled
          ? "border-b border-cream-offwhite/5 bg-ink-void/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink-charcoal focus:px-4 focus:py-2 focus:text-body-sm focus:text-cream-offwhite focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gold-champagne"
      >
        Skip to content
      </a>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-gold-champagne"
        style={{ transform: "scaleX(0)" }}
      />

      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="group inline-flex items-baseline gap-2 font-display text-heading-md font-light text-cream-offwhite transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
        >
          <span>{SITE.name}</span>
        </Link>

        <Nav />

        <Link
          href="/#contact"
          className={cn(
            "group relative hidden items-center justify-center overflow-hidden font-sans text-body-sm font-medium uppercase tracking-[0.04em] md:inline-flex",
            "border border-gold-champagne px-5 py-2 text-gold-champagne",
            "transition-all duration-300 ease-out-expo",
            "hover:bg-gold-champagne hover:text-ink-void",
            "focus-visible:bg-gold-champagne focus-visible:text-ink-void",
          )}
        >
          Begin a project
        </Link>

        <button
          ref={mobileTriggerRef}
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center text-cream-offwhite md:hidden",
            "transition-colors duration-200 ease-out-expo hover:text-gold-champagne",
            "focus-visible:outline-none focus-visible:shadow-focus-gold",
          )}
        >
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </span>
        </button>
      </Container>

      {mobileOpen ? (
        <Suspense fallback={null}>
          <MobileNavDialog
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            onRestoreFocus={() => mobileTriggerRef.current?.focus()}
          />
        </Suspense>
      ) : null}
    </header>
  );
}

export default Header;
