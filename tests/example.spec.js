// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// import { test, expect } from '@playwright/test';
// import { table } from 'console';
// import { setDefaultResultOrder } from 'dns';
// import { transferableAbortSignal } from 'util';

//Test Automation University -- Intro to Playwright

//Chapter 2.3: The Test Runner and Your First Test
//Test Case 1
//  1. Open the page - playwright.dev
//  2. Click at Get started 
//  3. Mouse hover the language dropdown 
//  4. Click at Java 
//  5. Check the Url 
//  6. Check the text "Installing Playwright" is not being displayed 
//  7. Check the text below is displayed 
//    "Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If your're not familiar w ith Maven please refer to its documentation "

// test.only('Check Java page', async ({ page }) => {
//     await page.goto('https://playwright.dev');
//     await page.getByRole('link', { name: 'Get Started' }).click();
//     await page.getByRole('button', {name:'Node.js'}).hover();
//     await page.getByText('Java', {exact:true}).click();
//     await expect(page).toHaveURL(/java/);
//     await expect(page.getByText("Installing Playwright", {exact: true})).not.toBeVisible();
//     const javaDescription = 'Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project\'s pom.xml as described below. If you\'re not familiar with Maven please refer to its documentation';
//     await expect(page.getByText(javaDescription)).toBeVisible();




// });
// // Reformat of Test Case 1