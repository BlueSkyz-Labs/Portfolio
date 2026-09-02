import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Sổ Trọ Vietnamese hypothesis page", () => {
  test("ships frozen category, patched hero, sub, ICP, and remaining contact CTA", async ({
    page,
  }) => {
    const response = await page.goto("/so-tro", {
      waitUntil: "domcontentloaded",
    });
    expect(response, "navigation response").not.toBeNull();
    expect(response!.status(), "HTTP status").toBeLessThan(400);

    const main = page.locator("#so-tro");
    await expect(main).toBeVisible();
    await expect(main).toHaveAttribute("lang", "vi");

    await expect(
      page.getByText("Nhà trọ tự vận hành", { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Một sổ cho dãy nhà trọ",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Phòng và khách, hóa đơn và nợ",
    );
    await expect(page.getByText("Cho hộ đang tự vận hành dãy.")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Trong sổ", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Phòng", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Điện nước", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Thu và nợ", exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Excel và Zalo vẫn đang dùng")).toBeVisible();
    await expect(page.getByText(/8–50 phòng/)).toBeVisible();
    await expect(page.getByText(/Hồ Chí Minh/)).toBeVisible();
    await expect(page.getByText(/Hà Nội/)).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Liên hệ", exact: true }).first(),
    ).toHaveAttribute("href", "#lien-he");
    await expect(page.locator("#lien-he")).toBeVisible();
    await expect(page.locator("#lien-he form")).toBeVisible();
  });

  test("does not lock Excel/gõ-cửa framing or invent proof and channels", async ({
    page,
  }) => {
    await page.goto("/so-tro", { waitUntil: "domcontentloaded" });
    const body = await page.locator("body").innerText();

    expect(body).not.toMatch(/Phần mềm quản lý nhà trọ/);
    expect(body).not.toMatch(/Chốt tiền điện từng phòng/);
    expect(body).not.toMatch(/Tách phí cho rõ/);
    expect(body).not.toMatch(/Không làm căng mất khách/);
    expect(body).not.toMatch(/Hết tối mùng 1 cầm file Excel đi từng phòng/);
    expect(body).not.toMatch(/Nhắn Zalo xem sổ mẫu/);
    expect(body).not.toMatch(/\bOwner\b/);
    expect(body).not.toMatch(/VietQR/i);
    expect(body).not.toMatch(/NĐ\s*141|Nghị định\s*141/i);
    expect(body).not.toMatch(/10\.000|10000\+/);
    expect(body).not.toMatch(/★★★|⭐/);
    expect(body).not.toMatch(/CXO/i);
    expect(body).not.toMatch(/SGPS/);
    expect(body).not.toMatch(/FluentArc|ApexAgent|Sổ Tâm/i);

    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href*="zalo.me"]')).toHaveCount(0);
    await expect(page.locator('a[href*="x.com/blueskyz"]')).toHaveCount(0);
    await expect(page.locator("img")).toHaveCount(0);
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      0,
    );
    await expect(page.getByText(/Chưa có ảnh giao diện thật/)).toBeVisible();
  });

  test("stays indexable and has no serious WCAG blockers", async ({ page }) => {
    await page.goto("/so-tro", { waitUntil: "networkidle" });

    const robots = page.locator('meta[name="robots"]');
    const robotsContent = (await robots.getAttribute("content")) ?? "";
    expect(robotsContent.toLowerCase()).not.toMatch(/noindex/);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blockers = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );
    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });
});
