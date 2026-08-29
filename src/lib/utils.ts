import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — className concatenation helper.
 *
 * Combines `clsx` (conditional classes) with `tailwind-merge`
 * (resolves conflicting Tailwind utilities so the LAST one wins).
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-gold-champagne", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * formatDate — display a date in the brand voice (uppercase, abbreviated month).
 *
 * @example
 *   formatDate(new Date("2024-11-15")) // "NOV 2024"
 */
export function formatDate(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
    .toUpperCase();
}

/**
 * sleep — promise-based delay. Used for sequenced animations.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
