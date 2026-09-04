import { expect, test } from "@playwright/test";

test("404 page recovers without atelier copy", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist/", {
    waitUntil: "domcontentloaded",
  });
  expect(response, "missing route response").not.toBeNull();
  expect(response!.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /not found/i,
  );
  await expect(
    page.getByRole("link", { name: /Go home|Explore products/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByText(/Quiet luxury|digital atelier|Savile Row/i),
  ).toHaveCount(0);
});

test("homepage featured empty state stays honest", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText(/No public products are published yet/i),
  ).toBeVisible();
  await expect(page.locator("[data-product-card]")).toHaveCount(0);
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/docs\/evidence|candidates under review/i);
});
