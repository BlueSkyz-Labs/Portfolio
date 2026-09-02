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

        <ol className="grid border-t border-cream-offwhite/10 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.number}
              className="relative border-b border-cream-offwhite/10 py-space-6 md:px-space-4 md:[&:nth-child(odd)]:border-r lg:border-r lg:px-space-5 lg:last:border-r-0"
            >
              <Reveal delay={index * 0.05} distance={8}>
                <span className="font-sans text-caption text-gold-champagne">
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
