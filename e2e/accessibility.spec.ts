import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation")).toHaveCount(4);
});

test("the demo has no detectable WCAG 2.2 AA violations before or after navigation", async ({ page }) => {
  const scan = () => new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect((await scan()).violations).toEqual([]);

  const compact = page.getByRole("navigation", { name: "Compact pagination" });
  await compact.getByRole("button", { name: "Next page" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Page 6 of 24" })).toBeVisible();
  expect((await scan()).violations).toEqual([]);
});

test("the demo switches pagination behavior without resetting the page", async ({ page }) => {
  const selector = page.getByRole("combobox", { name: "Pagination behavior" });
  const normal = page.getByRole("navigation", { name: "Default pagination" });
  const compact = page.getByRole("navigation", { name: "Compact pagination" });
  await expect(selector).toHaveValue("between", { timeout: 1500 });

  await normal.getByRole("button", { name: "Page 4", exact: true }).click();
  await expect(normal.locator("[data-pagination-gap]")).toHaveCount(2);

  await selector.selectOption("default");
  await expect(normal.getByRole("button", { name: "Page 2", exact: true })).toBeVisible();

  await selector.selectOption("between");
  await expect(normal.locator('[aria-current="page"]')).toHaveText("4");
  await expect(normal.locator("[data-pagination-gap]")).toHaveCount(2);
  await expect(compact.locator("[data-pagination-gap]")).toHaveCount(2);

  await selector.selectOption("separate");
  await expect(normal.locator('[data-pagination-item="ellipsis"]')).toHaveCount(2);

  await selector.selectOption("default");
  await expect(normal.getByRole("button", { name: "Page 2", exact: true })).toBeVisible();
  await expect(normal.locator('[aria-current="page"]')).toHaveText("4");
});

test("catalogue pagination follows the selected behavior across page links", async ({ page }) => {
  const selector = page.getByRole("combobox", { name: "Pagination behavior" });
  const catalogue = page.getByRole("region", { name: "Component catalogue" });
  const pagination = catalogue.getByRole("navigation", { name: "Catalogue pagination" });

  await selector.selectOption("between");
  await expect(pagination.locator("[data-pagination-gap]")).toHaveCount(1, { timeout: 1500 });

  await selector.selectOption("separate");
  await expect(pagination.locator('[data-pagination-item="ellipsis"]')).toHaveCount(1);
  await pagination.getByRole("link", { name: "Next page" }).click();
  await expect(catalogue.getByRole("heading", { name: "Data table" })).toBeVisible();
  await expect(pagination.locator('[aria-current="page"]')).toHaveText("2");
  await expect(selector).toHaveValue("separate");
  await expect(pagination.locator('[data-pagination-item="ellipsis"]')).toHaveCount(1);

  await selector.selectOption("default");
  await expect(pagination).not.toHaveAttribute("data-pagination-behavior");
  await expect(pagination.locator('[aria-current="page"]')).toHaveText("2");
});

test("keyboard activation changes pages and preserves focus at the boundary", async ({ page }) => {
  const normal = page.getByRole("navigation", { name: "Default pagination" });
  await page.getByRole("link", { name: "GitHub" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox", { name: "Pagination behavior" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(normal.getByRole("button", { name: "Page 1", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(normal.getByRole("button", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");
  const normalPrevious = normal.getByRole("button", { name: "Previous page" });
  await normalPrevious.focus();
  await page.keyboard.press("Enter");
  await expect(normalPrevious).toBeDisabled();
  await expect(normalPrevious).toBeFocused();
  await expect(normalPrevious).toHaveCSS("opacity", "1");

  const custom = page.getByRole("navigation", { name: "Custom CSS pagination" });
  const previous = custom.getByRole("button", { name: "Previous page" });
  const next = custom.getByRole("button", { name: "Next page" });
  await previous.focus();
  await page.keyboard.press("Enter");
  await expect(custom.getByRole("button", { name: "Page 23", exact: true })).toHaveAttribute("aria-current", "page");
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(next).toBeDisabled();
  await expect(next).toBeFocused();
  await expect(next).toHaveCSS("outline-style", "solid");
  await expect(next).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(custom.getByRole("button", { name: "Page 24", exact: true })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Shift+Tab");
  await expect(custom.getByRole("button", { name: "Page 24", exact: true })).toBeFocused();
});

for (const width of [1080, 375, 320]) {
  test(`between keeps Next in place when an ellipsis appears at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("link", { name: "Compare pagination behaviors" }).click();
    const pagination = page.getByRole("navigation", { name: "Ellipses between buttons", exact: true });
    await expect(pagination).toHaveAttribute("data-pagination-behavior", "between");
    const next = pagination.getByRole("button", { name: "Next page" });
    await next.scrollIntoViewIfNeeded();
    const position = await next.boundingBox();
    if (!position) throw new Error("The Next button must be visible");
    const x = position.x + position.width / 2;
    const y = position.y + position.height / 2;

    await page.mouse.click(x, y);
    await expect(pagination.locator('[aria-current="page"]')).toHaveText("4");
    await expect(pagination.locator("[data-pagination-gap]")).toHaveCount(2);
    const after = await next.boundingBox();
    expect(after?.x).toBeCloseTo(position.x, 0);
    expect(after?.y).toBeCloseTo(position.y, 0);
    await page.mouse.click(x, y);
    await expect(pagination.locator('[aria-current="page"]')).toHaveText("5");
  });
}

test("the current page and focus remain distinguishable in forced colors", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  for (const navigation of await page.getByRole("navigation").all()) {
    const current = navigation.locator('[data-pagination-control][aria-current="page"]');
    await expect(current).toHaveCSS("text-decoration-line", "underline");
    await current.focus();
    await expect(current).toHaveCSS("outline-style", "solid");
  }
});

test("controls reflow at a narrow width with enlarged text and keep usable targets", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const control of await page.locator("[data-pagination-control]").all()) {
    const box = await control.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  }

  await page.addStyleTag({ content: "html { font-size: 200% }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);

  for (const navigation of await page.getByRole("navigation").all()) {
    await navigation.locator('[data-pagination-item="page"] [data-pagination-control]').last().evaluate((control) => {
      control.textContent = String(Number.MAX_SAFE_INTEGER);
    });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test("RTL layouts follow reading direction while Next advances the page", async ({ page }) => {
  await page.locator("html").evaluate((root) => root.setAttribute("dir", "rtl"));
  const compact = page.getByRole("navigation", { name: "Compact pagination" });
  const previous = compact.getByRole("button", { name: "Previous page" });
  const next = compact.getByRole("button", { name: "Next page" });

  await expect(compact).toHaveCSS("direction", "rtl");
  const previousBox = await previous.boundingBox();
  const nextBox = await next.boundingBox();
  expect(previousBox?.x).toBeGreaterThan(nextBox?.x ?? Infinity);
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(compact.getByRole("button", { name: "Page 6", exact: true })).toHaveAttribute("aria-current", "page");
});

test("catalogue links load their page and preserve it across reload and browser history", async ({ page }) => {
  const catalogue = page.getByRole("region", { name: "Component catalogue" });
  const pagination = catalogue.getByRole("navigation", { name: "Catalogue pagination" });
  await expect(catalogue.getByRole("heading", { name: "Breadcrumbs" })).toBeVisible();

  const next = pagination.getByRole("link", { name: "Next page" });
  await expect(next).toHaveAttribute("href", /\?page=2#catalogue$/);
  await next.press("Enter");
  await expect(page).toHaveURL(/\?page=2#catalogue$/);
  await expect(pagination.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(catalogue.getByRole("heading", { name: "Data table" })).toBeVisible();
  await expect(catalogue).toBeFocused();

  await page.reload();
  await expect(catalogue.getByRole("heading", { name: "Data table" })).toBeVisible();
  await page.goBack();
  await expect(catalogue.getByRole("heading", { name: "Breadcrumbs" })).toBeVisible();
});

test("a failed catalogue request is announced without rendering broken navigation", async ({ page }) => {
  await page.route("**/catalogue.json", (route) => route.fulfill({ status: 503 }));
  await page.reload();

  const catalogue = page.getByRole("region", { name: "Component catalogue" });
  await expect(catalogue.getByRole("status")).toContainText("Could not load the catalogue");
  await expect(catalogue.getByRole("navigation")).toHaveCount(0);
});

test("an invalid catalogue payload is announced as a loading error", async ({ page }) => {
  await page.route("**/catalogue.json", (route) => route.fulfill({ json: null }));
  await page.reload();

  const catalogue = page.getByRole("region", { name: "Component catalogue" });
  await expect(catalogue.getByRole("status")).toContainText("Could not load the catalogue");
  await expect(catalogue.getByRole("navigation")).toHaveCount(0);
});
