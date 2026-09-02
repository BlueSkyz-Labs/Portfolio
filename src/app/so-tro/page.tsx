import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/layout/Container";
import { LIVE_SITE_URL } from "@/lib/site";
import { SO_TRO } from "@/lib/so-tro";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? LIVE_SITE_URL;

export const metadata: Metadata = {
  title: { absolute: SO_TRO.title },
  description: SO_TRO.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    locale: "vi_VN",
    url: `${siteUrl}${SO_TRO.href}`,
    title: SO_TRO.title,
    description: SO_TRO.description,
  },
};

export default function SoTroPage() {
  return (
    <article id="so-tro" lang="vi-VN" className="pt-16 md:pt-20">
      <header className="relative overflow-hidden px-6 py-space-9 md:px-12 lg:px-24 lg:py-space-10">
        <div
          aria-hidden="true"
          className="so-tro-rule absolute left-0 top-[8%] h-px w-full"
        />
        <p className="so-tro-eyebrow">{SO_TRO.eyebrow}</p>
        <h1 id="so-tro-title" className="mt-space-5 max-w-5xl">
          {SO_TRO.hero.map((line, index) => (
            <span key={line} className="block">
              {index === SO_TRO.hero.length - 1 ? (
                <em className="so-tro-kicker">{line}</em>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>
        <p className="so-tro-muted mt-space-5 max-w-xl">{SO_TRO.subhero}</p>
        <p className="so-tro-muted mt-space-3 max-w-xl">{SO_TRO.icp}</p>
        <p className="so-tro-muted mt-space-5 max-w-xl">{SO_TRO.hypothesis}</p>
        <a
          href={SO_TRO.cta.href}
          className="so-tro-cta mt-space-6 inline-flex min-h-11 items-center px-5 py-2"
        >
          {SO_TRO.cta.label}
        </a>
      </header>

      <Container className="space-y-space-9 py-space-9 lg:space-y-space-10 lg:py-space-10">
        <section aria-labelledby="so-tro-alternative-title">
          <h2 id="so-tro-alternative-title">{SO_TRO.alternative.title}</h2>
          <p className="so-tro-muted mt-space-4 max-w-2xl">
            {SO_TRO.alternative.body}
          </p>
        </section>

        <section aria-labelledby="so-tro-jobs-title">
          <h2 id="so-tro-jobs-title">{SO_TRO.jobs.title}</h2>
          <ol className="mt-space-6 grid gap-space-6 md:grid-cols-3">
            {SO_TRO.jobs.items.map((job, index) => (
              <li key={job.title} className="so-tro-job border-t pt-space-4">
                <span className="so-tro-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-space-3">{job.title}</h3>
                <p className="so-tro-muted mt-space-3">{job.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="so-tro-not-for-title">
          <h2 id="so-tro-not-for-title">{SO_TRO.notFor.title}</h2>
          <ul className="so-tro-muted mt-space-5 max-w-2xl space-y-space-3">
            {SO_TRO.notFor.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="so-tro-pricing-title">
          <h2 id="so-tro-pricing-title">{SO_TRO.pricing.title}</h2>
          <p className="so-tro-muted mt-space-4 max-w-2xl">
            {SO_TRO.pricing.body}
          </p>
        </section>

        <section aria-labelledby="so-tro-proof-title">
          <h2 id="so-tro-proof-title">{SO_TRO.proof.title}</h2>
          <figure className="so-tro-card mt-space-5">
            <div className="flex aspect-[16/10] items-center justify-center p-space-6">
              <p className="so-tro-muted max-w-md text-center">
                {SO_TRO.proof.empty}
              </p>
            </div>
            <figcaption className="so-tro-muted border-t px-space-5 py-space-3">
              {SO_TRO.proof.placeholder}
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
