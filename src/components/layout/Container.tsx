import { cn } from "@/lib/utils";

/**
 * Container — max-width horizontal-pad wrapper.
 *
 * SPEC.md §2.3 — 1440px max, 96px horizontal padding on desktop,
 * 48px tablet, 24px mobile. Implemented via Tailwind `container`
 * (configured in `tailwind.config.ts`).
 *
 * Use as the outer frame of every section.
 *
 * @example
 *   <Container as="section" className="py-space-9">
 *     <h1>...</h1>
 *   </Container>
 */
interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Element tag. Default `<div>`. Use semantic tag (`<section>`, `<main>`) when appropriate. */
  as?: "div" | "section" | "main" | "article" | "header" | "footer" | "nav";
  /** Children. */
  children: React.ReactNode;
}

export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn("container mx-auto w-full", className)} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;