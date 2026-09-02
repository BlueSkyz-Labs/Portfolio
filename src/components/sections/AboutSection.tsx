import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/constants";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <div className="grid items-stretch gap-space-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-space-8">
          <Reveal className="min-h-[360px] lg:min-h-[520px]">
            <div
              aria-hidden="true"
              className="relative h-full min-h-[360px] overflow-hidden border border-cream-offwhite/10 bg-gradient-to-br from-ink-graphite via-ink-charcoal to-ink-void lg:min-h-[520px]"
            >
              <div className="absolute inset-x-[12%] top-[14%] h-px bg-gold-champagne/55" />
              <div className="absolute inset-y-[12%] right-[16%] w-px bg-cream-offwhite/10" />
              <span className="absolute bottom-[10%] left-[10%] font-display text-display-lg font-light italic text-cream-offwhite/10 sm:text-display-xl">
                B/L
              </span>
            </div>
          </Reveal>

          <div className="flex items-center">
            <Reveal distance={8}>
              <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
                {ABOUT.eyebrow}
              </p>
              <h2
                id="about-title"
                className="mt-space-4 max-w-2xl font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
              >
                {ABOUT.title}
              </h2>
              <div className="mt-space-5 max-w-2xl space-y-space-4 font-sans text-body-lg text-cream-muted">
                {ABOUT.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
