import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS } from "@/lib/constants";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <Reveal className="mb-space-7 lg:mb-space-8">
          <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
            Selected Pieces
          </p>
          <h2
            id="work-title"
            className="mt-space-3 max-w-3xl font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
          >
            Systems designed to stay quiet under pressure.
          </h2>
        </Reveal>

        <div className="grid gap-space-4 md:grid-cols-2 lg:gap-space-6">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={
                index === 0
                  ? "group md:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-space-6"
                  : "group"
              }
            >
              <Reveal
                delay={index * 0.08}
                className="relative h-full overflow-hidden border border-cream-offwhite/10 bg-ink-charcoal/60 transition-[border-color] duration-300 ease-out-expo after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gold-champagne after:transition-transform after:duration-300 after:ease-out-expo group-hover:border-cream-offwhite/20 group-hover:after:scale-x-100"
              >
                <div className="flex aspect-[16/10] flex-col justify-between overflow-hidden border-b border-cream-offwhite/10 bg-gradient-to-br from-ink-graphite/80 via-ink-charcoal to-ink-void p-space-5 sm:p-space-6">
                  <span className="font-sans text-caption text-cream-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    aria-hidden="true"
                    className="max-w-lg origin-left scale-100 font-display text-display-sm font-light italic text-cream-offwhite/25 transition-transform duration-300 ease-out-expo group-hover:scale-[1.02] group-hover:text-gold-champagne/40 sm:text-display-md motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  >
                    {project.title}
                  </p>
                </div>

                <div className="p-space-5 sm:p-space-6">
                  <div className="flex flex-wrap items-center gap-x-space-3 gap-y-space-2 font-sans text-caption text-cream-muted">
                    <span>{project.client}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-space-3 font-display text-display-sm font-light text-cream-offwhite">
                    {project.title}
                  </h3>
                  <p className="mt-space-3 max-w-xl font-sans text-body text-cream-muted">
                    {project.summary}
                  </p>

                  <ul
                    aria-label={`${project.title} disciplines`}
                    className="mt-space-5 flex flex-wrap gap-space-2"
                  >
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-cream-offwhite/10 px-3 py-1.5 font-sans text-caption text-cream-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WorkSection;
