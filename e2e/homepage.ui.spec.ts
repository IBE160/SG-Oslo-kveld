import { test, expect } from "@playwright/test";

test.describe("To Like homepage UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("primary buttons stay centered", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const startButton = page.getByRole("button", { name: "Start spill" });
    await expect(startButton).toBeVisible();

    const box = await startButton.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();

    const centerX = box!.x + box!.width / 2;
    const centerY = box!.y + box!.height / 2;

    expect(Math.abs(centerX - viewport!.width / 2)).toBeLessThan(60);
    expect(Math.abs(centerY - viewport!.height / 2)).toBeLessThan(180);

    const modeButtons = await page.getByRole("button", { name: /Tall|Bokstaver/ }).all();
    expect(modeButtons.length).toBeGreaterThan(0);
    for (const button of modeButtons) {
      const buttonBox = await button.boundingBox();
      expect(buttonBox).not.toBeNull();
      const buttonCenter = buttonBox!.x + buttonBox!.width / 2;
      expect(Math.abs(buttonCenter - viewport!.width / 2)).toBeLessThan(viewport!.width * 0.25);
    }
  });

  test("form controls react to input", async ({ page }) => {
    const lettersButton = page.getByRole("button", { name: "Bokstaver" });
    await lettersButton.click();

    const slider = page.locator('input[type="range"]');
    await expect(slider).toHaveAttribute("max", "58");

    const playerButton = page.getByRole("button", { name: "5 spillere" });
    await playerButton.click();
    await expect(page.locator('input[aria-label^="Navn for spiller"]').nth(4)).toBeVisible();

    const numberInput = page.locator('input[type="number"]');
    await numberInput.fill("40");
    await expect(numberInput).toHaveValue("40");
    await expect(slider).toHaveValue("40");
  });

  test("homepage visual snapshot", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
  });
});
