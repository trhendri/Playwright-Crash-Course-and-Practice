// @ts-check
import { test, expect } from '@playwright/test';
import { toNamespacedPath } from 'node:path';
import { only } from 'node:test';

test.describe('Test Case 1', () => {
    test('should check Home Page with three Sliders only', async ({ page }) => {
        // Open Browser
        // Enter the url " https://practice.automationtesting.in"
        // Click on Shop menu
        // Now click on Home menu button 
        // Test whether the home page has three sliders only 
        // The home page must contain only three sliders

    });
});

test.describe('New Todo', () => {
    test('should allow me to add todo items', async ({ page }) => {
    });
});

test.describe('LMy Account - Login Tests', () => {
    test('Log in with valid username and password', async ({ page }) => {
    });

    test('Log in with incorrect username and incorrect password', async({page})=>{


    });

    test('Log in with correct username and empty password', async({page})=>{


    });

    test('Log in with empty username and valid password', async({page})=>{


    });

    test('Log in with empty username and empty password', async({page})=>{


    });

    test('Login password should be masked', async({page})=>{


    });

    test('Login-Handles cases sensitive', async({page})=>{


    });

    test('Login Authentication', async({page})=>{


    });
});

