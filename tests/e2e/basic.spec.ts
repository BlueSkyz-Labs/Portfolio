import { test, expect } from "@playwright/test";

/**
 * Basic smoke test — defends the visitor's first seven seconds (SPEC §1).
 *
 * Asserts:
 *   1. Home page loads without crash (200, title, no unhandled error).
 *   2. No console errors during load.
 *   3. <header> landmark is present and visible (SPEC §3.1).
 *   4. Hero section (#hero) is visible and on-screen.
 *
 * If any assertion fails, the visitor's first impression is broken — block the PR.
 */

test.describe("Smoke — Home", () => {
  test("home page loads without crash", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "navigation response").not.toBeNull();
    expect(response!.status(), "HTTP status").toBeLessThan(400);

    // Title reflects the metadata in src/app/layout.tsx
    await expect(page).toHaveTitle(/Portfolio/i);
  });

  test("no console errors during load", async ({ page }) => {
    const errors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto("/", { waitUntil: "networkidle" });

    // Fail on any console error or unhandled page exception.
    // Network/aborted resource errors are surfaced separately if needed.
    expect(
      errors,
      `Unexpected console errors:\n${errors.join("\n")}`,
    ).toEqual([]);
    expect(
      pageErrors,
      `Unhandled page exceptions:\n${pageErrors.join("\n")}`,
    ).toEqual([]);
  });

  test("header is present and visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // SPEC §3.1: sticky <header> with wordmark + nav + CTA.
    // SPEC §4.6: semantic landmarks required.
    const header = page.locator("header").first();
    await expect(header, "<header> landmark must exist").toHaveCount(1);
    await expect(header).toBeVisible();

    // The header must be reachable by keyboard — defends 2.1.1 Keyboard.
    await header.locator("a, button").first().focus();
  });

  test("hero section is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // SPEC §3.2: hero is a typographic statement, full-viewport, with #hero-statement.
    const hero = page.locator("#hero");
    await expect(hero, "#hero section must exist").toHaveCount(1);
    await expect(hero).toBeVisible();

    // The hero must occupy the viewport — full-viewport (100vh / 100svh).
    const viewport = page.viewportSize();
    const box = await hero.boundingBox();
    expect(box, "hero bounding box").not.toBeNull();
    // Allow a small tolerance for sub-pixel layout.
    expect(box!.height, "hero height should be >= viewport height").toBeGreaterThanOrEqual(
      (viewport?.height ?? 0) - 8,
    );

    // The hero statement heading is present and non-empty.
    const statement = page.locator("#hero-statement");
    await expect(statement, "hero <h1> must exist").toHaveCount(1);
    await expect(statement).toBeVisible();
    await expect(statement).not.toBeEmpty();
  });
});