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
    <div className="group">
      <label
        htmlFor={id}
        className="block font-sans text-caption uppercase tracking-[0.14em] text-cream-muted transition-colors duration-200 group-focus-within:text-gold-champagne"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-space-2 min-h-36 w-full resize-y border-0 border-b border-cream-offwhite/20 bg-transparent px-0 py-space-2 font-sans text-body text-cream-offwhite outline-none transition-[border-width,border-color] duration-200 ease-standard placeholder:text-cream-muted/50 focus:border-b-2 focus:border-gold-champagne focus:ring-0 disabled:cursor-not-allowed disabled:opacity-40 aria-[invalid=true]:border-gold-champagne ${className}`}
        {...props}
      />
    </div>
  );
}

export default Textarea;
