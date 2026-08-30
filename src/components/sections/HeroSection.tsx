"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { SITE } from "@/lib/constants";

/**
 * HeroSection — full-viewport typographic statement + scroll cue.
 *
 * SPEC.md §3.2 — the hero is THE typography. No carousel, no video,
 * no 3D. Hairline gold rule at 8%, 96px Cormorant Garamond Light
 * statement (italic optional), subline, meta line, scroll cue.
 *
 * Motion (SPEC §2.4 / §4.2 / §4.3):
 *  - Entry: fade up 16px, 400ms, out-expo (Framer Motion via LazyMotion)
 *  - Subtle parallax on the gold hairline rule (0.4× scroll)
 *  - Scroll cue pulses opacity 0.4 → 1.0 → 0.4 over 2.4s
 *  - prefers-reduced-motion: opacity-only fades at 150ms; parallax off
 *  - parallax disabled on mobile
 *
 * Layout: 100vh desktop / 100svh mobile (respects browser chrome).
 */
export function HeroSection() {
  const ruleRef = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const syncPreference = () => setPrefersReduced(reducedMotion.matches);

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);
    return () => reducedMotion.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const disableParallax = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce)",
    );
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      if (!ruleRef.current) return;

      const translateY = disableParallax.matches
        ? 0
        : Math.min(window.scrollY * 0.4, 400);
      ruleRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    disableParallax.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      disableParallax.removeEventListener("change", scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const entryEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      aria-labelledby="hero-statement"
      className="relative flex min-h-screen min-h-[100svh] flex-col justify-between overflow-hidden bg-hero-gradient px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-16 lg:px-24 lg:pt-32 lg:pb-20"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReduced ? 0.15 : 0.4, ease: entryEase }}
        className="flex items-center justify-between"
      >
        <span className="font-sans text-caption text-cream-muted">
          {SITE.name} — Portfolio
        </span>
        <span className="font-sans text-caption text-cream-muted">
          {SITE.edition}
        </span>
      </m.div>

      <div
        ref={ruleRef}
        aria-hidden="true"
        className="absolute left-0 top-[8%] w-full"
      >
        <m.div
          className="h-px w-full origin-left bg-gold-champagne/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: prefersReduced ? 0.15 : 0.8,
            ease: entryEase,
            delay: prefersReduced ? 0 : 0.1,
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-space-7">
        <h1
          id="hero-statement"
          className="max-w-5xl font-display text-display-md font-light leading-[1.05] tracking-tight text-cream-offwhite sm:text-display-lg lg:text-display-xl xl:text-display-2xl"
        >
          {SITE.hero.statement.split("|").map((line, i, arr) => (
            <span key={i} className="block overflow-hidden">
              <m.span
                className="block"
                initial={{ y: prefersReduced ? 0 : "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.15 : 0.7,
                  ease: entryEase,
                  delay: prefersReduced ? 0 : 0.2 + i * 0.1,
                }}
              >
                {i === arr.length - 1 ? (
                  <em className="font-display italic text-gold-champagne">
                    {line}
                  </em>
                ) : (
                  line
                )}
              </m.span>
            </span>
          ))}
        </h1>

        <m.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReduced ? 0.15 : 0.4,
            ease: entryEase,
            delay: prefersReduced ? 0 : 0.6,
          }}
          className="mt-space-4 max-w-xl font-sans text-body-lg font-normal text-cream-muted lg:mt-space-5"
        >
          {SITE.hero.subline}
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReduced ? 0.15 : 0.4,
          ease: entryEase,
          delay: prefersReduced ? 0 : 0.8,
        }}
        className="flex flex-col items-center gap-3"
      >
        <span className="font-sans text-caption text-cream-muted">Scroll</span>
        <div
          aria-hidden="true"
          className="relative h-16 w-px overflow-hidden bg-ink-graphite"
        >
          <div className="absolute inset-0 animate-pulse-soft bg-gradient-to-b from-gold-champagne via-gold-champagne/60 to-transparent" />
        </div>
      </m.div>
    </section>
  );
}

export default HeroSection;
