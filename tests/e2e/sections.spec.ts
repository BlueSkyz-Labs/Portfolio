import { test, expect } from "@playwright/test";

const sections = ["manifesto", "work", "process", "about", "contact"] as const;

test.describe("V1 narrative sections", () => {
  test("all required sections render real content instead of placeholders", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    for (const id of sections) {
      const section = page.locator(`#${id}`);
      await expect(section, `#${id} must exist exactly once`).toHaveCount(1);
      await expect(section).toBeVisible();
      await expect(section.getByRole("heading").first()).toBeVisible();
    }

    await expect(page.getByText(/forthcoming/i)).toHaveCount(0);
  });

  test("work and process expose structured content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("#work article")).toHaveCount(3);
    await expect(page.locator("#process li")).toHaveCount(4);
  });

  test("contact exposes labeled native controls and direct email fallback", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
  });

  test("reduced motion keeps narrative content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    for (const id of sections) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("heading").first()).toBeVisible();
    }
  });
});
