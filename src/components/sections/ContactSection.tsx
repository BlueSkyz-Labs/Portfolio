import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Reveal } from "@/components/ui/Reveal";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/layout/Container";
import { CONTACT } from "@/lib/constants";

export type ContactCopy = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly nameLabel: string;
  readonly emailLabel: string;
  readonly messageLabel: string;
  readonly submitLabel: string;
};

interface ContactSectionProps {
  readonly id?: string;
  readonly fieldPrefix?: string;
  readonly copy?: ContactCopy;
}

export function ContactSection({
  id = "contact",
  fieldPrefix = "contact",
  copy = CONTACT,
}: ContactSectionProps) {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const action = endpoint ?? `#${id}`;
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="border-t border-cream-offwhite/5 py-space-9 lg:py-space-10"
    >
      <Container>
        <div className="grid gap-space-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-space-8">
          <Reveal distance={8}>
            <p className="font-sans text-caption uppercase tracking-[0.18em] text-cream-muted">
              {copy.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-space-4 max-w-xl font-display text-display-md font-light text-cream-offwhite sm:text-display-lg"
            >
              {copy.title}
            </h2>
            <p className="mt-space-4 max-w-lg font-sans text-body-lg text-cream-muted">
              {copy.body}
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
                id={`${fieldPrefix}-name`}
                name="name"
                label={copy.nameLabel}
                autoComplete="name"
                required
              />
              <Input
                id={`${fieldPrefix}-email`}
                name="email"
                label={copy.emailLabel}
                type="email"
                autoComplete="email"
                required
              />
              <Textarea
                id={`${fieldPrefix}-message`}
                name="message"
                label={copy.messageLabel}
                rows={6}
                required
              />
              <div className="pt-space-2">
                <Button>{copy.submitLabel}</Button>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
