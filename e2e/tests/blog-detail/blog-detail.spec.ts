import { expect, test } from '@playwright/test';
import { SELECTORS } from './selectors';

test.describe('Blog detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates to blog detail when a blog card is clicked', async ({
    page,
  }) => {
    await page.locator(SELECTORS.firstBlogCard).first().click();

    await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
    await expect(page).toHaveTitle(/Angular & TypeScript Insights by Tu Hoang/);
    await expect(page.locator(SELECTORS.post)).toBeVisible();
    await expect(page.locator(SELECTORS.postTitle)).toBeVisible();
    await expect(page.locator(SELECTORS.postThumbnail)).toBeVisible();
    await expect(page.locator(SELECTORS.blogArticle)).toBeVisible();
  });

  test('renders blog detail page from a deep link', async ({ page }) => {
    await page.goto(SELECTORS.deepLinkUrl);

    await expect(page).toHaveURL(
      /\/blog\/how-angular-change-detection-works-without-zonejs$/,
    );
    await expect(page.locator(SELECTORS.postTitle)).toHaveText(
      SELECTORS.deepLinkTitle,
    );
    await expect(page).toHaveTitle(
      `${SELECTORS.deepLinkTitle} | Angular & TypeScript Insights by Tu Hoang`,
    );
    await expect(page.locator(SELECTORS.blogArticle)).toContainText('Angular');
  });

  test('renders related articles deterministically (newest first)', async ({
    page,
  }) => {
    await page.goto(SELECTORS.deepLinkUrl);

    await expect(page.locator(SELECTORS.relatedSection)).toBeVisible();
    await expect(page.locator(SELECTORS.relatedHeading)).toHaveText(
      'Related Articles',
    );

    await expect(page.locator(SELECTORS.relatedCards)).toHaveCount(2);
    await expect(page.locator(SELECTORS.relatedCardTitles)).toHaveText(
      SELECTORS.deepLinkRelatedTitles,
    );
  });

  test('navigates to a related blog when a related card is clicked', async ({
    page,
  }) => {
    await page.goto(SELECTORS.deepLinkUrl);

    const firstRelatedTitle = SELECTORS.deepLinkRelatedTitles[0];
    await page.locator(SELECTORS.relatedCards).first().click();

    await expect(page).toHaveURL(/\/blog\/[\w-]+$/);
    await expect(page.locator(SELECTORS.postTitle)).toHaveText(
      firstRelatedTitle,
    );
    await expect(page).toHaveTitle(
      `${firstRelatedTitle} | Angular & TypeScript Insights by Tu Hoang`,
    );
    await expect(page.locator(SELECTORS.blogArticle)).toBeVisible();
  });
});
