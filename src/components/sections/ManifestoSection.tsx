import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MANIFESTO } from "@/lib/constants";

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
              {MANIFESTO.eyebrow}
            </p>
            <h2
              id="manifesto-title"
              className="mt-space-4 font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
            >
              {MANIFESTO.title}
            </h2>
          </Reveal>

          <div
            aria-hidden="true"
            className="mx-auto my-space-5 h-px w-12 bg-gold-champagne/70"
          />

          <Reveal delay={0.08} distance={8}>
            <div className="space-y-space-4 font-sans text-body-lg text-cream-muted">
              {MANIFESTO.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default ManifestoSection;
