import { test, expect } from "@playwright/test";

test.describe("Portfolio Accordion & UI (Desktop)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("expands project details on hover/selection", async ({ page }) => {
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();
    await expect(workSection).toBeVisible();

    const panels = workSection.locator("article.panel");
    await expect(panels).toHaveCount(3);

    // Initial state: first project (Jaraye) is open by default
    await expect(panels.nth(0)).toHaveAttribute("data-open", "true");
    await expect(panels.nth(1)).toHaveAttribute("data-open", "false");
    await expect(panels.nth(2)).toHaveAttribute("data-open", "false");

    // Hover on second project (Bagisto / conversational commerce)
    await panels.nth(1).hover();
    await expect(panels.nth(1)).toHaveAttribute("data-open", "true");
    await expect(panels.nth(0)).toHaveAttribute("data-open", "false");
    await expect(panels.nth(2)).toHaveAttribute("data-open", "false");

    // Verify expanded details in second panel
    const p2Detail = panels.nth(1).locator(".detail");
    await expect(p2Detail).toContainText("v1.0-complete");
    await expect(p2Detail).toContainText("Engineered an AI-powered conversational commerce backend");
    await expect(p2Detail.locator("pre")).toBeVisible();
    await expect(p2Detail.locator("pre")).toContainText("POST /v1/webhooks/viber");

    // Hover on third project (CareNest)
    await panels.nth(2).hover();
    await expect(panels.nth(2)).toHaveAttribute("data-open", "true");
    await expect(panels.nth(1)).toHaveAttribute("data-open", "false");

    // Verify expanded details in third panel
    const p3Detail = panels.nth(2).locator(".detail");
    await expect(p3Detail).toContainText("CareNest");
    await expect(p3Detail).toContainText("Clinic appointment platform");
    await expect(p3Detail.locator("dl")).toBeVisible();
    await expect(p3Detail.locator("dl")).toContainText("uptime · 90d");
  });

  test("download CV links point to /resume.pdf with download attribute", async ({ page }) => {
    const signalCvLink = page.locator("#signal a[href='/resume.pdf']");
    await signalCvLink.scrollIntoViewIfNeeded();
    await expect(signalCvLink).toBeVisible();
    await expect(signalCvLink).toHaveAttribute("download", "Kyaw_Zin_Win_CV.pdf");
    await expect(signalCvLink).toHaveAttribute("target", "_blank");
    await expect(signalCvLink).toHaveAttribute("rel", /noopener/);

    // Open connect drawer and verify CV download link
    const connectButton = page.getByRole("button", { name: "Connect" });
    await connectButton.click();
    const drawerCvLink = page.locator("#drawer a[href='/resume.pdf']");
    await expect(drawerCvLink).toBeVisible();
    await expect(drawerCvLink).toHaveAttribute("download", "Kyaw_Zin_Win_CV.pdf");
  });
});

test.describe("Portfolio Accordion (Mobile)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clicking a card expands it and clicking again collapses it without extra space", async ({ page }) => {
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    const panels = workSection.locator("article.panel");
    await expect(panels).toHaveCount(3);

    // Click first card to collapse it (since openIndex starts at 0)
    const firstButton = panels.nth(0).locator(".panel-btn");
    await firstButton.click();

    // Verify first card collapses
    await expect(panels.nth(0)).toHaveAttribute("data-open", "false");
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");

    // When collapsed, the detail-wrap should have 0 computed height or negligible height
    const firstDetailWrap = panels.nth(0).locator(".detail-wrap");
    await expect(async () => {
      const box = await firstDetailWrap.boundingBox();
      expect(box?.height).toBeLessThanOrEqual(1);
    }).toPass({ timeout: 2000 });

    // Click second card to expand it
    const secondButton = panels.nth(1).locator(".panel-btn");
    await secondButton.click();

    await expect(panels.nth(1)).toHaveAttribute("data-open", "true");
    await expect(secondButton).toHaveAttribute("aria-expanded", "true");

    const secondDetailWrap = panels.nth(1).locator(".detail-wrap");
    await expect(async () => {
      const box = await secondDetailWrap.boundingBox();
      expect(box?.height).toBeGreaterThan(100);
    }).toPass({ timeout: 2000 });

    // Click second card again to collapse it
    await secondButton.click();
    await expect(panels.nth(1)).toHaveAttribute("data-open", "false");
    await expect(secondButton).toHaveAttribute("aria-expanded", "false");

    await expect(async () => {
      const box = await secondDetailWrap.boundingBox();
      expect(box?.height).toBeLessThanOrEqual(1);
    }).toPass({ timeout: 2000 });
  });
});
