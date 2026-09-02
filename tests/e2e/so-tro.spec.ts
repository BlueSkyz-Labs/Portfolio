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
    await expect(main).toHaveAttribute("lang", "vi-VN");

    await expect(
      page.locator("#so-tro header p").filter({ hasText: /^Sổ Trọ$/ }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Một sổ cho Ba, cho Mẹ.",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Giữ dãy nhà trọ cho rõ.",
    );
    await expect(
      page.getByText(
        "Không cần rành công nghệ. Ghi phòng, khách thuê, hóa đơn và nợ cho dễ đọc.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Ba Mẹ đang tự giữ khoảng 8–50 phòng, tại TP. Hồ Chí Minh và Hà Nội.",
      ),
    ).toBeVisible();
    await expect(page.getByText(/Giả thuyết định vị/)).toBeVisible();
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
    await expect(
      page.getByText(
        "Phòng trống, ai đang ở, phòng mới lấp. Nhìn dãy một cái là biết.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Tiền điện, tiền nước từng phòng. Đọc được, không dồn một cục.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Thu tiền, ghi nợ, cho phép nợ. Việc tiền rõ thì nói với khách cũng dễ.",
      ),
    ).toBeVisible();
    await expect(page.getByText("Gửi lời ở đây.")).toBeVisible();
    await expect(page.getByText("Cho Ba, cho Mẹ", { exact: true })).toHaveCount(
      0,
    );
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
    expect(body).not.toMatch(/Nhà trọ tự vận hành/);
    expect(body).not.toMatch(/Quản lý trọ/);
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

  test("applies live Experience type and teal primary, not atelier gold", async ({
    page,
  }) => {
    await page.goto("/so-tro", { waitUntil: "domcontentloaded" });
    const surface = page.locator("#so-tro");

    const bg = await surface.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe("rgb(246, 246, 243)");

    const title = page.locator("#so-tro-title");
    const type = await title.evaluate((el) => {
      const styles = getComputedStyle(el);
      return {
        family: styles.fontFamily,
        size: styles.fontSize,
        weight: styles.fontWeight,
        color: styles.color,
      };
    });
    expect(type.family).toMatch(/Be Vietnam Pro/i);
    expect(type.family).not.toMatch(/Cormorant|DM Sans|Inter/i);
    expect(type.size).toBe("40px");
    expect(type.weight).toBe("700");
    expect(type.color).toBe("rgb(15, 23, 42)");

    const body = await page
      .locator("#so-tro .so-tro-muted")
      .first()
      .evaluate((el) => {
        const styles = getComputedStyle(el);
        return { size: styles.fontSize, weight: styles.fontWeight };
      });
    expect(body.size).toBe("20px");
    expect(body.weight).toBe("500");

    const cta = page.locator("#so-tro a.so-tro-cta");
    const ctaStyles = await cta.evaluate((el) => {
      const styles = getComputedStyle(el);
      return {
        background: styles.backgroundColor,
        weight: styles.fontWeight,
        radius: styles.borderRadius,
      };
    });
    expect(ctaStyles.background).toBe("rgb(15, 76, 92)");
    expect(ctaStyles.weight).toBe("600");
    expect(ctaStyles.radius).toBe("18px");

    const painted = await surface.evaluate((root) => {
      const forbidden = new Set(["rgb(201, 169, 98)", "rgb(176, 141, 60)"]);
      const hits = [];
      const visit = (node) => {
        if (!(node instanceof Element)) return;
        const styles = getComputedStyle(node);
        for (const value of [
          styles.color,
          styles.backgroundColor,
          styles.borderTopColor,
        ]) {
          if (forbidden.has(value)) hits.push(value);
        }
        for (const child of node.children) visit(child);
      };
      visit(root);
      return hits;
    });
    expect(painted).toEqual([]);
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
