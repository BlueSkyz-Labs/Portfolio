import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center bg-ink-void px-6">
      <div
        aria-hidden="true"
        className="absolute left-0 top-[20%] h-px w-full bg-gold-champagne/40"
      />

      <p className="font-sans text-caption text-cream-muted">Error 404</p>

      <h1 className="mt-6 max-w-2xl text-center font-display text-display-md font-light italic text-cream-offwhite md:text-display-lg">
        This page is not on the map.
      </h1>

      <p className="mt-6 max-w-md text-center font-sans text-body text-cream-muted">
        The path you followed has no destination here. Perhaps the work moved
        on, or the address was always quiet.
      </p>

      <Link
        href="/"
        className="mt-12 inline-block border-b border-gold-champagne pb-1 font-sans text-body-sm text-cream-offwhite transition-colors duration-300 ease-out-expo hover:text-gold-champagne"
      >
        Return home
      </Link>
    </div>
  );
}
