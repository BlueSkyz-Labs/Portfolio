import { expect, test } from "@playwright/test";

const TRUST_ROUTES = [
  "/about/",
  "/contact/",
  "/support/",
  "/privacy/",
  "/security/",
] as const;

const BANNED = [
  /global offices/i,
  /bank-grade/i,
  /military-grade/i,
  /\bISO\b/,
  /\bSOC\b/,
  /Have something worth making\?/i,
];

for (const route of TRUST_ROUTES) {
  test(`${route} is reachable without trust anti-patterns`, async ({
    page,
  }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response, `${route} response`).not.toBeNull();
    expect(response!.status(), `${route} status`).toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const body = await page.locator("body").innerText();
    for (const pattern of BANNED) {
      expect(body, `${route} must not match ${pattern}`).not.toMatch(pattern);
    }
  });
}
