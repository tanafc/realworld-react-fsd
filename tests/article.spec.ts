import { test, expect } from '@playwright/test';
import { clean } from './utils/clean';

test.beforeAll(async () => {
  await clean();
});

test('writes an article', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: /sign up/i }).click();

  await page.getByPlaceholder('Your Name').fill('Alice');
  await page.getByPlaceholder('Email').fill('email@email.es');
  await page.getByPlaceholder('Password').fill('testest9');

  await page.getByRole('button', { name: /sign up/i }).click();

  await page.getByRole('link', { name: /new article/i }).click();

  await page.getByPlaceholder('Article Title').fill('Test Title');
  await page
    .getByPlaceholder(`What's this article about?`)
    .fill('This is about Test');
  await page
    .getByPlaceholder(`Write your article (in markdown)`)
    .fill('This is the body of the article');
  await page.getByPlaceholder(`Enter tags`).fill('cats');
  await page.getByRole('button', { name: `Publish Article` }).click();

  await expect(page.getByText('Test Title')).toBeVisible();
});
