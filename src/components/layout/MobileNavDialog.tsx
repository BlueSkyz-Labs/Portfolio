"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onRestoreFocus: () => void;
}

/**
 * MobileNavDialog — modal navigation for viewports below the desktop nav.
 *
 * Kept in its own lazily imported module so Radix Dialog does not become part
 * of the initial route interaction bundle until the visitor opens the menu.
 * Overlay uses the shared Dialog primitive (no tint — SPEC §5.1).
 */
export function MobileNavDialog({
  open,
  onOpenChange,
  onRestoreFocus,
}: MobileNavDialogProps) {
  const closeAndNavigate = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="mobile-navigation"
        className="px-6 pb-10 pt-4"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
      >
        <DialogTitle className="sr-only">Navigation</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate to a portfolio section or begin a project.
        </DialogDescription>

        <div className="flex h-12 items-center justify-between">
          <span className="font-display text-heading-md font-light text-cream-offwhite">
            {SITE.name}
          </span>

          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close navigation"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center text-cream-offwhite",
                "transition-colors duration-200 ease-out-expo hover:text-gold-champagne",
                "focus-visible:outline-none focus-visible:shadow-focus-gold",
              )}
            >
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </DialogClose>
        </div>

        <nav
          aria-label="Mobile primary"
          className="flex flex-1 flex-col justify-center"
        >
          <ul className="border-t border-cream-offwhite/10">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="border-b border-cream-offwhite/10">
                <a
                  href={link.href}
                  onClick={closeAndNavigate}
                  className={cn(
                    "group flex min-h-16 items-center justify-between py-4",
                    "font-display text-display-sm font-light text-cream-offwhite",
                    "transition-colors duration-200 ease-out-expo hover:text-gold-champagne",
                    "focus-visible:outline-none focus-visible:text-gold-champagne",
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-caption text-cream-muted transition-colors duration-200 group-hover:text-gold-champagne"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild variant="secondary" className="w-full">
          <a href="#contact" onClick={closeAndNavigate}>
            Begin a project
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default MobileNavDialog;
