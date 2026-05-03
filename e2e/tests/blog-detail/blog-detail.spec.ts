import { expect, test } from '@playwright/test';
import { SELECTORS } from './selectors';

test.describe('Blog detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to blog detail when the first blog item is clicked', async ({ page }) => {
    const firstBlogItem = page.locator(SELECTORS.blogItem).first();
    await firstBlogItem.click();
    await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
    await expect(page).toHaveTitle(/Tu Hoang -/);
    await expect(page.locator(SELECTORS.blogContent)).toBeVisible();
  });

  test('should render blog detail page from a deep link', async ({ page }) => {
    await page.goto(SELECTORS.deepLinkUrl);
    await expect(page).toHaveURL(/\/blog\/how-angular-change-detection-works-without-zonejs$/);
    await expect(page).toHaveTitle(/Tu Hoang -/);
    await expect(page.locator(SELECTORS.blogContent)).toBeVisible();
  });
});
