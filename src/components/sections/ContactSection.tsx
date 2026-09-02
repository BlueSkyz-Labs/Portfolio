import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Reveal } from "@/components/ui/Reveal";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/layout/Container";
import { CONTACT, SITE } from "@/lib/constants";

export function ContactSection() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const action = endpoint ?? `mailto:${SITE.email}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <div className="grid gap-space-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-space-8">
          <Reveal distance={8}>
            <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
              {CONTACT.eyebrow}
            </p>
            <h2
              id="contact-title"
              className="mt-space-4 max-w-xl font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
            >
              {CONTACT.title}
            </h2>
            <p className="mt-space-4 max-w-lg font-sans text-body-lg text-cream-muted">
              {CONTACT.body}
            </p>
            <p className="mt-space-6 font-sans text-body-sm text-cream-muted">
              Prefer email?{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-cream-offwhite underline decoration-gold-champagne/60 underline-offset-4 transition-colors duration-200 hover:text-gold-champagne focus-visible:outline-none focus-visible:shadow-focus-gold"
              >
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.06} distance={8}>
            <form
              action={action}
              method="post"
              encType={endpoint ? undefined : "text/plain"}
              className="space-y-space-5"
            >
              <Input
                id="contact-name"
                name="name"
                label="Name"
                autoComplete="name"
                required
              />
              <Input
                id="contact-email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
              />
              <Textarea
                id="contact-message"
                name="message"
                label="Message"
                rows={6}
                required
              />
              <div className="pt-space-2">
                <Button>Send inquiry</Button>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
