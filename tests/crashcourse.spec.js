// @ts-check
import { test, expect } from '@playwright/test';
//const {test, expect} = require('@playwright/test');
import { only } from 'node:test';
const jsonTestData = JSON.parse(JSON.stringify(require('../testdata.json'))); //? Convert JS value to JSON String, 

//Playwright with JavaScript

test('My First Test', async ({ page }) => {
    expect(12).toBe(12);

});

test('My Second Test', async ({ page }) => {
    expect(100).toBe(101);

});

test('My Third Test', async ({ page }) => {
    expect(2.0).toBe(2.0);

});
test('My Fourth Test', async ({ page }) => {
    expect('Jimi Hendrix').toContain('Jimi');
    expect(true).toBeTruthy();

});
//test.only, test.skip, test.describe

test('My Fifth Test', async ({ page }) => {

    expect(false).toBeFalsy();

});
test('My Sixth Test', async ({ page }) => {

    expect('Jimi Hendrix'.includes('Jimi')).toBeTruthy();

});

//Google.spec.js

test('Verify Application Title', async ({ page }) => {
    await page.goto('https://google.com');
    const url = await page.url();
    console.log('Page URL is ' + url);
    console.log('Page Title is ' + await page.title());
    await expect(page).toHaveTitle('Google');

});

//? npx playwright test - test all 
//? npx playright test ./tests/crashcourse.spec.js
//? npx playwright show-report - show report
//?  --headed - enable headed mode

//Interacting with Web elements
//? page.getByText(text[,options]) - to locate by text content
//? page.getByRole(role[,options]) - to locate by Aria removeListener, Aria attributes, and accessible name
//? page.getByLabel(text[,options]) - to located a form control by associated label's text
//? page.getByTestId(testId) - to locate an element based on its data-testid attribute (other attribute can be configured)
//? page.getByPlaceholder(text[,options]) - to located an input by placeholder
//? page.getByAltText(text[,options]) - to locate an element, usually Image, by its text alternative
//? page.getByTitle(text[,options]) - to locate an element by its title

test('Valid Login', async ({ page }) => {
    await page.goto('https:/opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const usernameField = await page.getByPlaceholder('Username');
    const passwordField = await page.getByPlaceholder('Password');

    await usernameField.fill('Admin'); //? delay each char for 200ms
    await passwordField.fill('admin123');
    await page.locator('// button[@type="submit"]').click(); // // button[@type="submit"]
    //await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/dashboard/);
    const profileMenu = await page.getByAltText('profile picture').first();
    const logoutButton = await page.getByText('Logout')
    await profileMenu.click();
    await logoutButton.click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/login/);

});

//Verify Text
test('Verify Error Message', async ({ page }) => {
    await page.goto('https:/opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const usernameField = await page.getByPlaceholder('Username');
    const passwordField = await page.getByPlaceholder('Password');

    await usernameField.fill('Admin'); //? delay each char for 200ms
    await passwordField.fill('admin1234');
    await page.locator('// button[@type="submit"]').click();
    const errorAlert = await page.getByText('Invalid credentials');
    await expect(errorAlert).toBeVisible();
    const alertText = await page.locator('//p[contains(@class, "alert-content-text")]').textContent();
    console.log(alertText);
    //expect(alertText.includes('Invalid')).toBeTruthy();
    expect(alertText === "Invalid credentials").toBeTruthy();
});

//Maximize Browser Window In Playwright | Viewport in Playwright

//?To change viewport in general/all tests
//? go to config file
//? under projects -> under 'use', add     viewport: {width:--, height:--}

//? To change viewport for a specific test
//? Run test.use outside/before test block - test.use({viewport: {width:1500, height: 1000}});
//? await page.screenshot("path:'screenshot.png", fullPage: true});  -- to capture optional full page screenshot
//? await page.locator('.header').screenshot({"path:'screenshot.png"}); == to capture element screenshot

test.use({ viewport: { width: 1500, height: 1000 } });
test('ViewPorts', async ({ page }) => {

    await page.goto('https:/opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    console.log(await page.viewportSize()); // - returns viewport width and height
    console.log(page.viewportSize().width)
    console.log(page.viewportSize().height)

});

//Taking Screenshots | Videos in Playwright

//? To capture screenshots/video/trace for all tests
//? Go to Config file
//? under projects -> under'use', add   screenshot:"on", video:"on", trace:"on"

//Generating code automatically in Playwright | Record and play scripts in Playwright | Codegen 
//? npx playwright codegen -launches codegen and recorder
//? npx playwright codegen --help - launches helpful commands
//? example:  npx playwright codegen https://website.com -o ./tests/codegen.spec.js - saves the code to a file a new file named codegen.spec.js


//Retry Tests in Playwright

//? Playwright can automatically retry failed test cases
//? In config file:
//? under "retries" add    retries:2,   - if retries aren't consistent then its a sign of flaky test
//? or in cli, add --retries=3


//?Handling Dropdowns in Playwright and Verify Dropdown Values

test('Select Values from Dropdown', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/signup');
    await page.locator('#state').selectOption('Goa');
    await page.locator('#state').selectOption({ label: 'Goa' });
    await page.locator('#state').selectOption({ value: 'Himachal Pradesh' });
    await page.locator('#state').selectOption({ index: 4 });

    //    const value = await page.locator('#state').textContent();  //returns all state  values
    //    console.log("All dropdown values " + value);
    //    await expect(value.includes('Kerala')).toBeTruthy();

    //? Create loop to traverse through all states

    let state = await page.$('#state');
    let allElements = await state.$$("option"); //? Gets all states
    let dropdownStatus = false;

    for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
        let value = await element.textContent();
        console.log("Value from dropdown using for loop " + value);

        if (value.includes('Rajasthan')) {
            dropdownStatus = true;
            break;
        }

    }
    await expect(dropdownStatus).toBeTruthy();

    // //?Alt for loop
    // for (const elements of allElements) {
    //     let value = await elements.textContent();
    //     console.log("New elements " + value);
    // }
});

test('Select Multiple Values from Dropdown', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/signup');
    await page.locator('#hobbies').selectOption(['Playing', 'Reading', 'Swimming']);
});

// Mouse Hover in Playwright
test('Mouse Hover', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.getByPlaceholder('Enter Email').fill('admin@email.com');
    await page.getByPlaceholder('Enter Password').fill('admin@123');
    //await page.locator('.submit-btn').click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    // await page.locator(".nav-menu-item-manage").hover();
    await page.locator('//span[text()="Manage"]').hover({ force: true });
    await page.getByAltText('manage course').click();

});

//Uploading Files in Playwright
test('Verify File Upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('./files/6512473.png');
    await page.locator('#file-submit').click();
    await expect(await page.locator('//h3')).toHaveText('File Uploaded!');



});

//Handling Keyboard Actions in Playwright
test('Keyboard Events in Playwright', async ({ page }) => {
    await page.goto('https://google.com');

    await page.locator('//textarea[@name="q"]').fill('jimi hendrix y');
    //  await page.keyboard.press('Control + A'); //? Press two keys at once
    await page.waitForSelector('//li[@role="presentation"]');

    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');

    const element = await page.$$('//li[@role="presentation"]'); //? return all elements

    //Loop until find 'jimi hendrix youtube live'

    for (const elements of element) {
        let value = await elements.textContent();

        if (value.includes('youtube live')) {
            await elements.click();
            break;

        }
    }


});

//Handling Alert in Playwright
test.describe('Handling Alerts', () => {


    test('Capturing Alert', async ({ page }) => {

        //alert, confirm, prompt
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        //?Capturing alert
        page.on('dialog', async (d) => {
            expect(d.type()).toContain("alert");
            expect(d.message()).toContain("I am a JS Alert")
            await d.accept();

        });

        // await page.on('dialog', dialog => dialog.accept());
        await page.getByText('Click for JS Alert').click();

        await expect(await page.locator('#result')).toHaveText('You successfully clicked an alert');

    });

    test('Capturing Confirm', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async (dialogWindow) => {
            expect(dialogWindow.type()).toContain("confirm");
            expect(dialogWindow.message()).toContain("I am a JS Confirm")
            await dialogWindow.accept();
            //await dialogWindow.dismiss();

        });
        await page.getByText('Click for JS Confirm').click();
        await expect(await page.locator('#result')).toHaveText('You clicked: Ok')
    });

    test('Capturing Prompt', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async (dialogWindow) => {
            expect(dialogWindow.type()).toContain("prompt");
            expect(dialogWindow.message()).toContain("I am a JS prompt")
            await dialogWindow.accept('Jimi Hendrix');
            //await dialogWindow.dismiss();

        });
        await page.getByText('Click for JS Prompt').click();
        await expect(await page.locator('#result')).toHaveText('You entered: Jimi Hendrix')
    });
});

//Handling Frames and iFrames in Playwright

test('Handle Frames', async ({ page }) => {
    await page.goto('https://docs.oracle.com/javase/8/docs/api/');
    const iFrame = await page.frameLocator('frame[name="packageListFrame"]'); //? frameLocator does not accept xpath
    await iFrame.locator('//a[text()="java.applet"]').click();

});

//! ReReview this concept.
test('Working with Multiple Tabs', async ({ browser }) => { //?Note browser here
    const context = await browser.newContext();
    const page = await context.newPage(); //?New tab/window
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.locator('//a[contains(@href, "facebook")]').first().click()
    ]);
    //? Work on new page

    await newPage.locator('//input[@name="email"]').nth(1).fill("Jimi@hendrx.com");

    //?Go back to main tab
    await newPage.close();

    await page.locator('#email1').fill('admin@email.com');
});

//Handling Dynamic Network Call in Playwright
test('Working With Load State', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.getByText('New user? Signup').click(); // page.getByText('New user Signup");
    //Verify number of checkboxes
    await page.waitForLoadState('networkidle'); //?Helps when the network take a little while for load issue
    const checkboxCount = await page.locator('//input[@type="checkbox"]').count();
    console.log(checkboxCount);
    await expect(checkboxCount).toBe(3);


});

//Read Data from JSON  file in Playwright
//? Refer to json
test('Login To Application', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    const usernameField = await page.getByPlaceholder('Enter Email').fill(jsonTestData.username);
    const passwordField = await page.getByPlaceholder('Enter Password').fill(jsonTestData.password);


});
//! Revist data driven test section https://youtu.be/pq20Gd4LXeI?list=PLzI7JjnoSwrbsmxwN1I93lsKVbh-Y-gAL&t=23323


//Generate Allure Reports in PLaywright Automatically with Screenshot
//? install allure playwright package
//? npm i -D @playwright/test allure-playwright
//? npx playwright test --reporter=allure-playwright -- run reporter
//? allure generate allure-results -o allure-report --clean  - Generate allure report


//Practice Scenarios
test.describe('Test Scenarios', async () => {

    //https://www.youtube.com/watch?v=K5b0LwYNnlw
    test('Scenario 1', async ({ page }) => {
        await page.goto('https://freelance-learn-automation.vercel.app');
        //Verify title contains 'Courses'
        await expect(page).toHaveTitle("Learn Automation Courses");
        // Verify courses are greater than 0
        await page.waitForSelector('.course-card'); //? May need to use this more often than not
        const coursesCount = await page.locator('.course-card').count();
        console.log(coursesCount);
        expect(coursesCount).toBeGreaterThan(0);

        //Verify footer icons are greater than 0
        const socialButtonsCount = await page.locator('.social-btns a').count();
        console.log(socialButtonsCount);
        await expect(socialButtonsCount).toBeGreaterThan(0);

    });
    test('Scenario 2', async ({ page }) => {
        await page.goto('https://freelance-learn-automation.vercel.app');
        //Click navigation
        const nav = await page.getByAltText('menu');
        await nav.click();



        // go to login
        await page.getByText('Log in').click();

        //verify user is landed on correct page
        await expect(page).toHaveURL(/login/);
        //enter credentials
        await page.getByPlaceholder('Enter Email').fill('admin@email.com');
        await page.getByPlaceholder('Enter Password').fill('admin@123');

        //click login 
        await page.locator('.submit-btn').click();
        //verify welcome message at top - welcome + keyword
        await page.waitForTimeout(3000);
        const pageText = await page.locator('body').textContent();
        // expect(pageText).toContain(/Welcome/);

        //click nav then sign out
        await nav.click();
        await page.getByText('Sign out').click();
        //verify sign in title or sign in button
        const form = await page.locator('.login-form').textContent();
        console.log(form);
        await expect (page.locator('.login-form')).toHaveText(/Sign In/);

    });

        test('Scenario 3', async({page}) => {
            await page.goto('https://freelance-learn-automation.vercel.app/login');
            //verify "New user?" link is clickable/enabled
            
            await expect(page.locator('.subLink')).toBeEnabled();
            //click new user? link
            await page.getByText('New user? Signup').click();
            // create new user fill form, select multiple hobbies
            await page.waitForLoadState('networkidle');
            await page.getByPlaceholder('Name').fill('Jimi');
            await page.getByPlaceholder('Email').fill('jimi@email.com');
            await page.getByPlaceholder('Password').fill('JimiPass');
            await page.getByText('PWS').check(); //? Checkbox
            await page.locator('#gender1').check(); //? RadioButton
            await page.locator('#state').selectOption('Assam');
            await page.locator('#hobbies').selectOption(['Playing', 'Swimming']);
            await page.locator('.submit-btn').click();




            //Click sign up
            //verify "Signup successfully" message at top right
            await expect(page.locator(body)).toHaveText(/Successfully/);

        });

    //     test('Scenario 4 - End 2 End', async({page}) => {
    //         await page.goto('https://freelance-learn-automation.vercel.app');
    //         //Login to application
    //         //hover over "Manage" --> click "Manage courses"
    //         //Click "Add new course"
    //         //Create a new course, upload file etc, calendar controls - select next date and course ends 2 months later, drop downs etc
    //         //Verify checkbox is unchecked
    //         //Verify is any file more than 1mb is uploaded, an alert displays
    //         //Accept alert
    //         //Choose different file
    //         //Save
    //         //Verify the course created is displayed - course name
    //         //Click delete
    //         //Verify course has been deleted from table
    //         //Select navigation and sign out

    //     });

    //     test('Scenario 5', async({page}) => {
    //         //Sign in
    //         //Click manage categories
    //         //Switch to the new tab
    //         //Click add new category
    //         //Enter name in prompt
    //         //Verify new category is added to table
    //         //Click update, wait for 5 seconds, update prompt input
    //         //Verify update
    //         //Click delete, click delete in alert
    //         //Confirm deletion
    //         //Sign out


    //     });



});