import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/**
 * Home — composition of all sections.
 *
 * The page is intentionally a single, scroll-driven narrative.
 * No routing complexity. No nested layouts. The work speaks.
 */
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected works, process, and quiet conviction. A portfolio built with restraint, materiality, and precision.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink-void">
      {/* Hero — 100vh typographic statement */}
      <section
        id="hero"
        aria-labelledby="hero-statement"
        className="relative flex min-h-screen flex-col justify-between bg-hero-gradient px-6 pt-8 pb-12 md:px-12 md:pt-12 lg:px-24 lg:pt-16 lg:pb-16"
      >
        {/* Top meta line */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-caption text-cream-muted">
            {SITE.name} — Portfolio
          </span>
          <span className="font-sans text-caption text-cream-muted">
            {SITE.edition}
          </span>
        </div>

        {/* Hero hairline rule at the 8% horizontal mark */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-[8%] h-px w-full bg-gold-champagne/60"
        />

        {/* Center statement */}
        <div className="flex flex-1 flex-col justify-center">
          <h1
            id="hero-statement"
            className="max-w-5xl font-display text-display-md font-light leading-[1.05] tracking-tight text-cream-offwhite sm:text-display-lg lg:text-display-xl xl:text-display-2xl"
          >
            {SITE.hero.statement.split("|").map((line, i, arr) => (
              <span key={i} className="block">
                {i === arr.length - 1 ? (
                  <em className="font-display italic text-gold-champagne">
                    {line}
                  </em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl font-sans text-body-lg font-normal text-cream-muted lg:mt-12">
            {SITE.hero.subline}
          </p>
        </div>

        {/* Bottom row: scroll cue */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-sans text-caption text-cream-muted">
            Scroll
          </span>
          <div
            aria-hidden="true"
            className="h-16 w-px animate-pulse-soft bg-gradient-to-b from-gold-champagne to-transparent"
          />
        </div>
      </section>

      {/* Placeholder sections — implemented in v1.1 */}
      <section
        id="manifesto"
        className="flex min-h-[60vh] items-center justify-center border-t border-cream-offwhite/5 px-6 py-space-9 lg:px-24"
      >
        <p className="font-display text-display-sm italic text-cream-muted">
          Manifesto — forthcoming
        </p>
      </section>

      <section
        id="work"
        className="flex min-h-[60vh] items-center justify-center border-t border-cream-offwhite/5 px-6 py-space-9 lg:px-24"
      >
        <p className="font-display text-display-sm italic text-cream-muted">
          Selected Works — forthcoming
        </p>
      </section>

      <section
        id="contact"
        className="flex min-h-[60vh] items-center justify-center border-t border-cream-offwhite/5 px-6 py-space-9 lg:px-24"
      >
        <p className="font-display text-display-sm italic text-cream-muted">
          Contact — forthcoming
        </p>
      </section>
    </main>
  );
}
