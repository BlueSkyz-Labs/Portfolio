import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button — SPEC.md §5.1 / §4.4
 *
 * primary · secondary · ghost · link
 * Primary is gold-fill with hover invert; secondary is hairline.
 * Minimum 44px hit target on actionable variants.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-sans text-body-sm font-medium",
    "transition-colors duration-200 ease-out-expo",
    "focus-visible:outline-none focus-visible:shadow-focus-gold",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "min-h-11 border border-gold-champagne bg-gold-champagne px-space-5 py-space-3 text-ink-void hover:bg-transparent hover:text-gold-champagne",
        secondary:
          "min-h-11 border border-gold-champagne bg-transparent px-space-5 py-space-3 uppercase tracking-[0.04em] text-gold-champagne hover:bg-gold-champagne hover:text-ink-void",
        ghost:
          "min-h-11 px-space-4 py-space-2 text-cream-offwhite hover:text-gold-champagne",
        link: "min-h-11 px-0 py-0 text-cream-offwhite underline decoration-gold-champagne/60 underline-offset-4 hover:text-gold-champagne",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
}

export function Button({
  className,
  variant,
  type = "submit",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
export default Button;
