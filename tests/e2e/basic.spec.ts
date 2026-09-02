import { test, expect } from "@playwright/test";

/**
 * Basic smoke test — defends the visitor's first seven seconds (SPEC §1).
 *
 * Asserts:
 *   1. Home page loads without crash (200, title, no unhandled error).
 *   2. No console errors during load.
 *   3. Global semantic landmarks are unique and visible (SPEC §3.1, §4.6).
 *   4. Hero section (#hero) is visible and on-screen.
 *   5. Native scroll-progress/parallax behavior survives the JS-budget refactor.
 *   6. Reduced-motion keeps hero parallax disabled.
 *
 * If any assertion fails, the visitor's first impression is broken — block the PR.
 */

test.describe("Smoke — Home", () => {
  test("home page loads without crash", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "navigation response").not.toBeNull();
    expect(response!.status(), "HTTP status").toBeLessThan(400);

    // Title reflects the metadata in src/app/layout.tsx.
    await expect(page).toHaveTitle(/PortfolioMKT/i);
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

    expect(errors, `Unexpected console errors:\n${errors.join("\n")}`).toEqual(
      [],
    );
    expect(
      pageErrors,
      `Unhandled page exceptions:\n${pageErrors.join("\n")}`,
    ).toEqual([]);
  });

  test("global semantic landmarks are unique and visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const headers = page.locator("header");
    const mains = page.locator("main");
    const footers = page.locator("footer");

    await expect(
      headers,
      "exactly one <header> landmark must exist",
    ).toHaveCount(1);
    await expect(mains, "exactly one <main> landmark must exist").toHaveCount(
      1,
    );
    await expect(
      footers,
      "exactly one <footer> landmark must exist",
    ).toHaveCount(1);

    await expect(headers.first()).toBeVisible();
    await expect(mains.first()).toBeVisible();
    await expect(footers.first()).toBeVisible();

    // The header must expose a keyboard-focusable control — defends WCAG 2.1.1.
    await headers.locator("a, button").first().focus();
  });

  test("hero section is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // SPEC §3.2: hero is a typographic statement, full-viewport, with #hero-statement.
    const hero = page.locator("#hero");
    await expect(hero, "#hero section must exist").toHaveCount(1);
    await expect(hero).toBeVisible();

    const viewport = page.viewportSize();
    const box = await hero.boundingBox();
    expect(box, "hero bounding box").not.toBeNull();
    expect(
      box!.height,
      "hero height should be >= viewport height",
    ).toBeGreaterThanOrEqual((viewport?.height ?? 0) - 8);

    const statement = page.locator("#hero-statement");
    await expect(statement, "hero <h1> must exist").toHaveCount(1);
    await expect(statement).toBeVisible();
    await expect(statement).not.toBeEmpty();
  });

  test("native scroll progress and hero parallax remain functional", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const progress = page.locator('header > div[aria-hidden="true"]');
    const heroRule = page.locator('#hero > div[aria-hidden="true"]');
    const readHeroTranslateY = () =>
      heroRule.evaluate((node) => {
        const transform = getComputedStyle(node).transform;
        if (transform === "none") return 0;
        return new DOMMatrixReadOnly(transform).m42;
      });

    await expect(progress).toHaveCount(1);
    await expect(heroRule).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, 500));

    await expect
      .poll(() => progress.evaluate((node) => node.style.transform))
      .not.toBe("scaleX(0)");

    const viewport = page.viewportSize();
    if ((viewport?.width ?? 0) < 768) {
      await expect.poll(readHeroTranslateY).toBe(0);
    } else {
      await expect.poll(readHeroTranslateY).not.toBe(0);
    }
  });

  test("reduced motion disables hero parallax", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    const heroRule = page.locator('#hero > div[aria-hidden="true"]');
    const readHeroTranslateY = () =>
      heroRule.evaluate((node) => {
        const transform = getComputedStyle(node).transform;
        if (transform === "none") return 0;
        return new DOMMatrixReadOnly(transform).m42;
      });

    await expect(heroRule).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, 500));

    await expect.poll(readHeroTranslateY).toBe(0);
  });
});
