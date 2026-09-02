import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  type = "submit",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center border border-gold-champagne bg-gold-champagne px-space-5 py-space-3 font-sans text-body-sm font-medium text-ink-void transition-colors duration-200 ease-out-expo hover:bg-transparent hover:text-gold-champagne focus-visible:outline-none focus-visible:shadow-focus-gold ${className}`}
      {...props}
    />
  );
}

export default Button;
