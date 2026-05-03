import { expect, test } from '@playwright/test';
import { SELECTORS } from './selectors';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the home page and show main sections', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(SELECTORS.pageTitleText)).toBeVisible();
    await expect(page.locator(SELECTORS.aboutMenuLink)).toBeVisible();
    await expect(page.locator(SELECTORS.blogMenuLink)).toBeVisible();
    await expect(page.locator(SELECTORS.contactMenuLink)).toBeVisible();
    await expect(page.locator(SELECTORS.blogSection)).toBeVisible();
  });

  test('should scroll to the blog section when clicking the Blog menu item', async ({
    page,
  }) => {
    await page.locator(SELECTORS.blogMenuLink).click();
    await expect(page).toHaveURL(/#blog$/);
    await expect(page.locator(SELECTORS.blogSection)).toBeVisible();
  });

  test('should display blog list items on home page', async ({ page }) => {
    const blogItems = page.locator(SELECTORS.blogItems);
    await expect(blogItems.first()).toBeVisible();
    expect(await blogItems.count()).toBeGreaterThan(0);
  });

  test('should open a new tab when the Resume button is clicked', async ({ page }) => {
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator(SELECTORS.resumeButton).click(),
  ]);

  await popup.waitForLoadState('domcontentloaded');

  expect(popup.url()).toContain('assets/cv/cv.pdf');

  await popup.close();
});

  test('should open social icon links in a new tab', async ({ page }) => {
    const socialLinks = [
      {
        selector: SELECTORS.githubSocialLink,
        expectedPattern: /https:\/\/github\.com\/AndyT2503/,
      },
      {
        selector: SELECTORS.instagramSocialLink,
        expectedPattern: /https:\/\/www\.instagram\.com\/htu\.18\/?/,
      },
      {
        selector: SELECTORS.facebookSocialLink,
        expectedPattern: /https:\/\/www\.facebook\.com\/AndyTu\.Hoang\/?/,
      },
      {
        selector: SELECTORS.linkedinSocialLink,
        expectedPattern: /https:\/\/www\.linkedin\.com\/(authwall|in\/tu-hoang-787951195)/,
      },
    ];

    for (const link of socialLinks) {
      const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(link.selector).click(),
      ]);
      await expect(popup).toHaveURL(link.expectedPattern);
      await popup.close();
    }
  });
});
