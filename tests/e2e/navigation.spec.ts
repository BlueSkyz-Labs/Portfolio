import { test, expect } from "@playwright/test";

/**
 * Responsive navigation contract.
 *
 * Mobile must keep the header usable at a 320px viewport without squeezing
 * wordmark + CTA + desktop links into the same row. The menu remains a
 * progressively loaded interaction surface, but keyboard and dialog semantics
 * must behave like a first-class navigation path.
 */
test.describe("Responsive navigation", () => {
  test.describe("mobile", () => {
    test.use({ viewport: { width: 320, height: 800 } });

    test("exposes an accessible menu trigger instead of the desktop CTA", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const trigger = page.getByRole("button", { name: "Open navigation" });
      await expect(trigger).toHaveCount(1, { timeout: 1_500 });
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(
        page.getByRole("navigation", { name: "Primary" }),
      ).toBeHidden();
      await expect(
        page.getByRole("link", { name: "Begin a project" }),
      ).toBeHidden();
    });

    test("opens a semantic menu with every primary destination", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const trigger = page.getByRole("button", { name: "Open navigation" });
      await expect(trigger).toHaveCount(1, { timeout: 1_500 });
      await trigger.click();

      const dialog = page.getByRole("dialog", { name: "Navigation" });
      await expect(dialog).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close navigation" }),
      ).toHaveAttribute("aria-expanded", "true");

      for (const label of ["Work", "Process", "About", "Contact"]) {
        await expect(
          dialog.getByRole("link", { name: label, exact: true }),
        ).toBeVisible();
      }
      await expect(
        dialog.getByRole("link", { name: "Begin a project" }),
      ).toBeVisible();
    });

    test("Escape closes the menu and restores focus to the trigger", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const trigger = page.getByRole("button", { name: "Open navigation" });
      await expect(trigger).toHaveCount(1, { timeout: 1_500 });
      await trigger.click();
      await expect(
        page.getByRole("dialog", { name: "Navigation" }),
      ).toBeVisible();

      await page.keyboard.press("Escape");

      await expect(
        page.getByRole("dialog", { name: "Navigation" }),
      ).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("choosing a section closes the menu and navigates to its anchor", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const trigger = page.getByRole("button", { name: "Open navigation" });
      await expect(trigger).toHaveCount(1, { timeout: 1_500 });
      await trigger.click();

      const dialog = page.getByRole("dialog", { name: "Navigation" });
      await dialog.getByRole("link", { name: "Process", exact: true }).click();

      await expect(page).toHaveURL(/#process$/);
      await expect(
        page.getByRole("dialog", { name: "Navigation" }),
      ).toHaveCount(0);
    });
  });

  test("desktop keeps the existing primary navigation and CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Begin a project" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeHidden();
  });
});
