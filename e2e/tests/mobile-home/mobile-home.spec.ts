import { expect, test } from '@playwright/test';
import { SELECTORS } from './selectors';

test.describe('Mobile home page', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test.beforeEach(async ({ page }) => {
    await page.route(
      'https://api.github.com/repos/AndyT2503/AndyT2503.github.io',
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            stargazers_count: 42,
            forks_count: 7,
          }),
        });
      },
    );

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders mobile header, resume link and bottom navigation', async ({ page }) => {
    await expect(page.locator(SELECTORS.mobileHeader)).toBeVisible();
    await expect(page.locator(SELECTORS.mobileLogo)).toContainText('TU HOANG');
    await expect(page.locator(SELECTORS.mobileResumeLink)).toHaveAttribute(
      'href',
      'assets/cv/cv.pdf',
    );
    await expect(page.locator(SELECTORS.mobileResumeLink)).toHaveAttribute(
      'target',
      '_blank',
    );
    await expect(page.locator(SELECTORS.introSection)).toBeVisible();
    await expect(page.locator(SELECTORS.bottomNav)).toBeVisible();
  });

  test('navigates between sections with bottom navigation', async ({ page }) => {
    await page.locator(SELECTORS.bottomBlogButton).tap();
    await expect(page).toHaveURL(/#blog$/);
    await expect(page.locator(SELECTORS.blogSection)).toBeInViewport();

    await page.locator(SELECTORS.bottomContactButton).tap();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator(SELECTORS.contactSection)).toBeInViewport();
  });

  test('opens blog detail from a mobile blog card', async ({ page }) => {
    await page.locator(SELECTORS.bottomBlogButton).tap();

    const firstBlogCard = page.locator(SELECTORS.blogCards).first();
    await expect(firstBlogCard).toBeVisible();
    await firstBlogCard.tap();

    await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
    await expect(page.locator('.post__title')).toBeVisible();
  });

  test('opens and closes repository stats on mobile', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });

    await expect(page.locator(SELECTORS.repoStatsMobile)).toBeVisible();
    await page.locator(SELECTORS.repoStatsFab).tap();

    const repoCard = page.locator(SELECTORS.repoStatsCard);
    await expect(repoCard).toBeVisible();
    await expect(repoCard).toContainText('42');
    await expect(repoCard).toContainText('7');
    await expect(page.locator(SELECTORS.repoStatsCta)).toHaveAttribute(
      'href',
      'https://github.com/AndyT2503/AndyT2503.github.io',
    );

    await page.locator(SELECTORS.repoStatsCloseButton).tap();
    await expect(repoCard).toBeHidden();
  });
});
