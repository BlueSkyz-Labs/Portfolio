import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

/**
 * Home — composition of all sections.
 *
 * The page is intentionally a single, scroll-driven narrative.
 * No routing complexity. No nested layouts. The work speaks.
 *
 * Sections in this sprint:
 *   - Header             (sticky, scroll-aware nav)
 *   - HeroSection        (full-viewport typographic statement)
 *   - Manifesto          (placeholder, Sprint 2)
 *   - Selected Work      (placeholder, Sprint 2)
 *   - Process            (placeholder, Sprint 2)
 *   - About              (placeholder, Sprint 2)
 *   - Contact            (placeholder, Sprint 2)
 *   - Footer             (single-row closing mark)
 */
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected works, process, and quiet conviction. A portfolio built with restraint, materiality, and precision.",
};

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-ink-void">
        <HeroSection />

        {/* Placeholder sections — implemented in Sprint 2 */}
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
          id="process"
          className="flex min-h-[60vh] items-center justify-center border-t border-cream-offwhite/5 px-6 py-space-9 lg:px-24"
        >
          <p className="font-display text-display-sm italic text-cream-muted">
            Process — forthcoming
          </p>
        </section>

        <section
          id="about"
          className="flex min-h-[60vh] items-center justify-center border-t border-cream-offwhite/5 px-6 py-space-9 lg:px-24"
        >
          <p className="font-display text-display-sm italic text-cream-muted">
            About — forthcoming
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

      <Footer />
    </>
  );
}