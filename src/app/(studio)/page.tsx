import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkSection } from "@/components/sections/WorkSection";

/**
 * Home — the complete single-page narrative defined by SPEC.md.
 *
 * The root layout owns the global Header, main landmark, and Footer.
 */
export const metadata: Metadata = {
  title: { absolute: "PortfolioMKT" },
  description:
    "Selected works, process, and quiet conviction. A portfolio built with restraint, materiality, and precision.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
