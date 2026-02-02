import { test, expect } from '@playwright/test';

test('should require password to access the app', async ({ page }) => {
  await page.goto('/');

  // Should see a password input and no folder tree
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.locator('text=Collections')).not.toBeVisible();

  // Enter wrong password
  await page.fill('input[type="password"]', 'wrong-password');
  await page.click('button:has-text("Login"), button:has-text("Enter")');

  // Still on login page or show error
  await expect(page.locator('input[type="password"]')).toBeVisible();

  // Enter correct password (this will be the obfuscated one in code)
  // Password: 8$cbfkFu%N$nx9!zPcg^
  await page.fill('input[type="password"]', '8$cbfkFu%N$nx9!zPcg^');
  await page.click('button:has-text("Login"), button:has-text("Enter")');

  // Should see the app now
  await expect(page.locator('h2:has-text("Collections")')).toBeVisible({ timeout: 10000 });
});
