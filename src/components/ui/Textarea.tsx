import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly id: string;
  readonly label: string;
}

export function Textarea({
  id,
  label,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-caption uppercase tracking-[0.14em] text-cream-muted"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-space-2 min-h-36 w-full resize-y border-0 border-b border-cream-offwhite/20 bg-transparent px-0 py-space-2 font-sans text-body text-cream-offwhite outline-none transition-colors duration-200 placeholder:text-cream-muted/50 focus:border-gold-champagne focus:ring-0 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Textarea;
