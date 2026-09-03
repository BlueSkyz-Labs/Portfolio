import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <Reveal className="mb-space-7 lg:mb-space-8">
          <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
            Process
          </p>
          <h2
            id="process-title"
            className="mt-space-3 max-w-3xl font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
          >
            From ambiguity to evidence.
          </h2>
        </Reveal>

        <ol className="grid gap-space-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.number}
              className="relative lg:px-space-5 lg:first:pl-0 lg:last:pr-0"
            >
              {index < PROCESS_STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-3 hidden h-px w-full max-w-[calc(100%-1.5rem)] translate-x-1/2 bg-gold-champagne/40 lg:block"
                />
              ) : null}
              <Reveal delay={index * 0.08} distance={8}>
                <span className="relative z-10 inline-block bg-ink-void pr-space-3 font-sans text-caption text-gold-champagne">
                  {step.number}
                </span>
                <h3 className="mt-space-4 font-display text-display-sm font-light text-cream-offwhite">
                  {step.title}
                </h3>
                <p className="mt-space-3 font-sans text-body-sm text-cream-muted">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default ProcessSection;
