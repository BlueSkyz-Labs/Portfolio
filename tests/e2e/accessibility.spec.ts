import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accessibility — Home", () => {
  test("has no serious or critical WCAG 2.1 A/AA violations", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blockers = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });

  test("skip link is the first keyboard target and points to main", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await page.keyboard.press("Tab");

    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator("main#main")).toHaveCount(1);
  });
});
