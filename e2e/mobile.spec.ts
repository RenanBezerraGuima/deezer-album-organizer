import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 5'] });

test('mobile menu should open and allow selecting collections', async ({ page }) => {
  await page.goto('./');

  // Handle First Time Setup
  await page.getByRole('button', { name: 'Deezer' }).click();

  // Verify mobile search placeholder
  const searchInput = page.getByPlaceholder('Search...');
  await expect(searchInput).toBeVisible();

  // On mobile, AlbumGrid should be visible
  await expect(page.getByText('No collection selected')).toBeVisible();

  // Click the menu button to show FolderTree
  await page.click('button[aria-label="Open menu"]');

  // FolderTree should now be visible
  await expect(page.getByText('Collections', { exact: true }).first()).toBeVisible();

  // Create a collection
  await page.click('button[aria-label="Create collection"]');
  await page.fill('input[placeholder="Collection name"]', 'Mobile Collection');
  await page.keyboard.press('Enter');

  // The collection should be visible in the menu
  await expect(page.getByText('Mobile Collection')).toBeVisible();

  // Clicking the collection should select it and close the menu
  await page.click('text=Mobile Collection');

  // Verify breadcrumb in AlbumGrid header
  const header = page.locator('div:has(> p:text-matches("Catalog data"))').first();
  await expect(header).toContainText('Mobile Collection');

  // Verify it says Collection empty instead of No collection selected
  await expect(page.getByText('Collection empty')).toBeVisible();
});
