import { test, expect } from "@playwright/test";

test.describe("Astro foundation smoke", () => {
  test("home page loads the BlueSkyz Labs heading", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "navigation response").not.toBeNull();
    expect(response!.status(), "HTTP status").toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "BlueSkyz Labs",
    );
    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test("no console errors during load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/", { waitUntil: "networkidle" });
    expect(errors, `Unexpected console errors:\n${errors.join("\n")}`).toEqual(
      [],
    );
  });
});
