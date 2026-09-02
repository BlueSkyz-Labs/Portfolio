import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/layout/Container";
import { LIVE_SITE_URL } from "@/lib/site";
import { SO_TRO } from "@/lib/so-tro";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? LIVE_SITE_URL;

export const metadata: Metadata = {
  title: SO_TRO.title,
  description: SO_TRO.subhero,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    locale: "vi_VN",
    url: `${siteUrl}${SO_TRO.href}`,
    title: SO_TRO.title,
    description: SO_TRO.subhero,
  },
};

export default function SoTroPage() {
  return (
    <article id="so-tro" lang="vi" className="pt-16 md:pt-20">
      <header className="relative overflow-hidden bg-hero-gradient px-6 py-space-9 md:px-12 lg:px-24 lg:py-space-10">
        <div
          aria-hidden="true"
          className="absolute left-0 top-[8%] h-px w-full bg-gold-champagne/70"
        />
        <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
          {SO_TRO.eyebrow}
        </p>
        <h1
          id="so-tro-title"
          className="mt-space-5 max-w-5xl font-display text-display-md font-light leading-[1.05] text-cream-offwhite sm:text-display-lg lg:text-display-xl"
        >
          {SO_TRO.hero.map((line, index) => (
            <span key={line} className="block">
              {index === SO_TRO.hero.length - 1 ? (
                <em className="font-display italic text-gold-champagne">
                  {line}
                </em>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>
        <p className="mt-space-5 max-w-xl font-sans text-body-lg text-cream-muted">
          {SO_TRO.subhero}
        </p>
        <p className="mt-space-3 max-w-xl font-sans text-body text-cream-muted">
          {SO_TRO.icp}
        </p>
        <p className="mt-space-5 max-w-xl font-sans text-body-sm text-cream-muted">
          {SO_TRO.hypothesis}
        </p>
        <a
          href={SO_TRO.cta.href}
          className="mt-space-6 inline-flex min-h-11 items-center border border-gold-champagne px-5 py-2 font-sans text-body-sm font-medium uppercase tracking-[0.04em] text-gold-champagne transition-colors duration-300 ease-out-expo hover:bg-gold-champagne hover:text-ink-void"
        >
          {SO_TRO.cta.label}
        </a>
      </header>

      <Container className="space-y-space-9 py-space-9 lg:space-y-space-10 lg:py-space-10">
        <section aria-labelledby="so-tro-jobs-title">
          <h2
            id="so-tro-jobs-title"
            className="font-display text-display-sm font-light text-cream-offwhite sm:text-display-md"
          >
            {SO_TRO.jobs.title}
          </h2>
          <ol className="mt-space-6 grid gap-space-6 md:grid-cols-3">
            {SO_TRO.jobs.items.map((job, index) => (
              <li
                key={job.title}
                className="border-t border-cream-offwhite/10 pt-space-4"
              >
                <span className="font-sans text-caption text-cream-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-space-3 font-display text-heading-lg font-light text-cream-offwhite">
                  {job.title}
                </h3>
                <p className="mt-space-3 font-sans text-body text-cream-muted">
                  {job.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="so-tro-not-for-title">
          <h2
            id="so-tro-not-for-title"
            className="font-display text-display-sm font-light text-cream-offwhite sm:text-display-md"
          >
            {SO_TRO.notFor.title}
          </h2>
          <ul className="mt-space-5 max-w-2xl space-y-space-3 font-sans text-body-lg text-cream-muted">
            {SO_TRO.notFor.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="so-tro-pricing-title">
          <h2
            id="so-tro-pricing-title"
            className="font-display text-display-sm font-light text-cream-offwhite sm:text-display-md"
          >
            {SO_TRO.pricing.title}
          </h2>
          <p className="mt-space-4 max-w-2xl font-sans text-body-lg text-cream-muted">
            {SO_TRO.pricing.body}
          </p>
        </section>

        <section aria-labelledby="so-tro-proof-title">
          <h2
            id="so-tro-proof-title"
            className="font-display text-display-sm font-light text-cream-offwhite sm:text-display-md"
          >
            {SO_TRO.proof.title}
          </h2>
          <figure className="mt-space-5 border border-cream-offwhite/10 bg-ink-charcoal/60">
            <div className="flex aspect-[16/10] items-center justify-center p-space-6">
              <p className="max-w-md text-center font-sans text-body text-cream-muted">
                {SO_TRO.proof.empty}
              </p>
            </div>
            <figcaption className="border-t border-cream-offwhite/10 px-space-5 py-space-3 font-sans text-caption uppercase tracking-[0.04em] text-cream-muted">
              Ô minh họa trống
            </figcaption>
          </figure>
        </section>
      </Container>

      <ContactSection
        id="lien-he"
        fieldPrefix="lien-he"
        copy={SO_TRO.contact}
      />
    </article>
  );
}
