import { expect, test } from '@playwright/test';
import { SELECTORS } from './selectors';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://api.github.com/repos/AndyT2503/AndyT2503.github.io', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          stargazers_count: 42,
          forks_count: 7,
        }),
      });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render landing sections and desktop sidebar', async ({ page }) => {
    await expect(page).toHaveURL(/\/#intro$/);
    await expect(page.locator(SELECTORS.introSection)).toBeVisible();
    await expect(page.locator(SELECTORS.introTitle)).toContainText('Tu Hoang');
    await expect(page.locator(SELECTORS.introSubtitleAccent)).toHaveText(
      'Angular',
    );
    await expect(page.locator(SELECTORS.blogSection)).toBeVisible();
    await expect(page.locator(SELECTORS.contactSection)).toBeVisible();
    await expect(page.locator(SELECTORS.projectsSection)).toBeVisible();
    await expect(page.locator(SELECTORS.experienceSection)).toBeVisible();
    await expect(page.locator(SELECTORS.sideBar)).toBeVisible();
  });

  test('scrolls to sections from primary actions and navigation', async ({
    page,
  }) => {
    await page.locator(SELECTORS.viewWorkButton).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator(SELECTORS.projectsSection)).toBeInViewport();

    await page.locator(SELECTORS.sidebarBlogButton).click();
    await expect(page).toHaveURL(/#blog$/);
    await expect(page.locator(SELECTORS.blogSection)).toBeInViewport();

    await page.locator(SELECTORS.sidebarContactButton).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator(SELECTORS.contactSection)).toBeInViewport();
  });

  test('shows blog cards that link to blog detail pages', async ({ page }) => {
    const blogItems = page.locator(SELECTORS.blogItems);

    await page.locator(SELECTORS.sidebarBlogButton).click();
    await expect(blogItems.first()).toBeVisible();
    await expect(blogItems.first()).toHaveAttribute(
      'href',
      /\/blog\/[\w-]+$/,
    );
    expect(await blogItems.count()).toBeGreaterThan(0);
  });

  test('exposes resume and social links', async ({ page }) => {
    await expect(page.locator(SELECTORS.resumeLink)).toHaveAttribute(
      'href',
      'assets/cv/cv.pdf',
    );
    await expect(page.locator(SELECTORS.resumeLink)).toHaveAttribute(
      'target',
      '_blank',
    );

    await expect(page.locator(SELECTORS.githubSocialLink)).toHaveAttribute(
      'href',
      'https://github.com/AndyT2503',
    );
    await expect(page.locator(SELECTORS.instagramSocialLink)).toHaveAttribute(
      'href',
      'https://www.instagram.com/htu.18/',
    );
    await expect(page.locator(SELECTORS.facebookSocialLink)).toHaveAttribute(
      'href',
      'https://www.facebook.com/AndyTu.Hoang/',
    );
    await expect(page.locator(SELECTORS.linkedinSocialLink)).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/tu-hoang-787951195/',
    );
  });

  test('shows repository stats after scrolling and expands on hover', async ({
    page,
  }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 500);
      window.dispatchEvent(new Event('scroll'));
    });

    const repoStats = page.locator(SELECTORS.repoStatsDesktop);
    await expect(repoStats).toBeVisible();
    await expect(repoStats).toHaveAttribute(
      'href',
      'https://github.com/AndyT2503/AndyT2503.github.io',
    );
    await expect(page.locator(SELECTORS.repoStatsStarValue)).toHaveText('42');
    await expect(page.locator(SELECTORS.repoStatsForkValue)).toHaveText('7');

    await repoStats.hover();
    await expect(page.locator(SELECTORS.repoStatsDesktopExpand)).toContainText(
      'View Code',
    );
  });
});
