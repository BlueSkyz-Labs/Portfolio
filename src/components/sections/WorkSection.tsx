import Link from "next/link";
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
                delay={index * 0.05}
                className="h-full border border-cream-offwhite/10 bg-ink-charcoal/60"
              >
                <div className="flex aspect-[16/10] flex-col justify-between overflow-hidden border-b border-cream-offwhite/10 bg-gradient-to-br from-ink-graphite/80 via-ink-charcoal to-ink-void p-space-5 sm:p-space-6">
                  <span className="font-sans text-caption text-cream-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    aria-hidden="true"
                    className="max-w-lg font-display text-display-sm font-light italic text-cream-offwhite/25 transition-colors duration-300 ease-out-expo group-hover:text-gold-champagne/40 sm:text-display-md"
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
                    {project.href ? (
                      <Link
                        href={project.href}
                        className="transition-colors duration-200 ease-out-expo hover:text-gold-champagne focus-visible:text-gold-champagne"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
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
                        className="border border-cream-offwhite/10 px-3 py-1.5 font-sans text-caption text-cream-muted"
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
