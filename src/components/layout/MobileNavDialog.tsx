"use client";

import * as Dialog from "@radix-ui/react-dialog";
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
 */
export function MobileNavDialog({
  open,
  onOpenChange,
  onRestoreFocus,
}: MobileNavDialogProps) {
  const closeAndNavigate = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink-void/90 backdrop-blur-sm md:hidden" />
        <Dialog.Content
          id="mobile-navigation"
          className="fixed inset-0 z-[70] flex flex-col bg-ink-void px-6 pb-10 pt-4 outline-none md:hidden"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onRestoreFocus();
          }}
        >
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Navigate to a portfolio section or begin a project.
          </Dialog.Description>

          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-heading-md font-light text-cream-offwhite">
              {SITE.name}
            </span>

            <Dialog.Close asChild>
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
            </Dialog.Close>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex flex-1 flex-col justify-center"
          >
            <ul className="border-t border-cream-offwhite/10">
              {NAV_LINKS.map((link, index) => (
                <li
                  key={link.href}
                  className="border-b border-cream-offwhite/10"
                >
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

          <a
            href="#contact"
            onClick={closeAndNavigate}
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center border border-gold-champagne px-5 py-3",
              "font-sans text-body-sm font-medium uppercase tracking-[0.04em] text-gold-champagne",
              "transition-colors duration-200 ease-out-expo hover:bg-gold-champagne hover:text-ink-void",
              "focus-visible:bg-gold-champagne focus-visible:text-ink-void focus-visible:outline-none",
            )}
          >
            Begin a project
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNavDialog;
