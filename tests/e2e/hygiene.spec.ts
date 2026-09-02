import { expect, test } from "@playwright/test";

test.describe("Public marketing hygiene", () => {
  test("home does not expose dead socials or a dead mailbox", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator('a[href*="x.com/blueskyz"]')).toHaveCount(0);
    await expect(
      page.locator('a[href*="linkedin.com/company/blueskyz-labs"]'),
    ).toHaveCount(0);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href*="blueskyz.com"]')).toHaveCount(0);
    await expect(
      page.locator('a[href="https://github.com/BlueSkyz-Labs"]'),
    ).toHaveCount(1);
  });

  test("work cards label studio pieces as internal, not external clients", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const cards = page.locator("#work article");
    await expect(cards).toHaveCount(4);
    await expect(cards.getByText("Studio / Internal")).toHaveCount(4);
  });

  test("home links to the Vietnamese Sổ Trọ page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const soTro = page.locator('a[href="/so-tro"]');
    await expect(soTro.first()).toBeVisible();
  });
});
