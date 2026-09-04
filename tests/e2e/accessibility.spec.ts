import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/products/",
  "/about/",
  "/contact/",
  "/support/",
  "/privacy/",
  "/security/",
] as const;

for (const route of ROUTES) {
  test(`axe has no critical/serious violations on ${route}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response, `${route} response`).not.toBeNull();
    expect(response!.status(), `${route} status`).toBeLessThan(500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(
      serious,
      serious
        .map(
          (violation) =>
            `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`,
        )
        .join("\n"),
    ).toEqual([]);
  });
}
