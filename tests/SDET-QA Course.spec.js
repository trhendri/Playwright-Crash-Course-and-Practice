import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { deserialize } from 'v8';
//Learning Material From:https://www.youtube.com/watch?v=vib8f9PC6JI&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=4


// property 
// css 
// xpath 

//await page.locator('locator).click();
//await page.click('locator);
//await page.locator('locator).fill('value');
//await page.fill('locator','value');
test.describe('Locators', async () => {
    test('Locators', async ({ page }) => {
        await page.goto('https://demoblaze.com/index.html');
        await page.click('id=login2');
        await page.locator('#loginusername').fill('pavanol');
        await page.fill('input[id="loginpassword"]', 'test@123');
        await page.click('//button[normalize-space()="Log in"]');
        //Verify logout link present
        const logoutLink = await page.locator('//a[normalize-space()="Log out"]');
        await expect(logoutLink).toBeVisible();
    });

    //Multiple web elements
    //const elements = await page.$$('locator');
    test('Locate Multiple Elements', async ({ page }) => {
        await page.goto('https://demoblaze.com/index.html');
        const allLinks = await page.$$('a');
        for (const link of allLinks) {

            const linkText = await link.textContent();
            console.log(linkText);
        }


    });

    test('Capture multiple product titles', async ({ page }) => {
        await page.goto('https://demoblaze.com/index.html');
        await page.waitForSelector('//div[@id="tbodyid"]//h4//a'); //?  Once again waitFor to get around load issue
        const products = await page.$$('//div[@id="tbodyid"]//h4//a');
        for (const product of products) {
            const prodName = await product.textContent();
            console.log(prodName);
        }
    });

});
test.describe('Built In Locators', async () => {
    test('Get by Alt Text', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        const logo = await page.getByAltText('company-branding');
        await expect(logo).toBeVisible();


    });

    test('Get By Placeholder, Get By Role, Get By Text', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { type: 'submit' }).click(); //? button, select, link etc
        const name = await page.locator('//p[@class="oxd-userdropdown-name"]').textContent();
        // const username = await page.getByText('manda jdXeoIeKUb');
        await expect(await page.getByText(name)).toBeVisible();

    });

    test('Get By Label, Get By Title, Get By TestId', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { type: 'submit' }).click();

    });
});

test.describe('Assertions', async () => {
    test('To have URL, Title, toVeVisible, toBEnabled, toBeChecked, toHaveAttribute, toHaveText, toContainText, toHaveValue, toHaveCount', async ({ page }) => {
        await page.goto('https://demo.nopcommerce.com/register');
        await expect(page).toHaveURL('https://demo.nopcommerce.com/register');
        await expect(page).toHaveTitle(/Register/);
        await expect(await page.getByAltText('nopCommerce demo store')).toBeVisible();
        await expect(await page.locator('#small-searchterms')).toBeEnabled();
        const femaleRadioButton = await page.locator('#gender-female');
        await femaleRadioButton.click();
        await expect(femaleRadioButton).toBeChecked();
        const newsletterCheckbox = await page.locator('#Newsletter');
        await newsletterCheckbox.click();
        await expect(newsletterCheckbox).not.toBeChecked();
        const registerButton = await page.locator('#register-button');
        await expect(registerButton).toHaveAttribute('type', 'submit');
        const pageTitle = await page.locator('.page-title h1');
        await expect(pageTitle).toHaveText('Register');
        await expect(pageTitle).toContainText('Reg');
        const emailField = await page.locator('#Email');
        await emailField.fill('Admin@email.com');
        await expect(emailField).toHaveValue('Admin@email.com');
        const customerCurrency = await page.locator("#customerCurrency option");
        await expect(customerCurrency).toHaveCount(2);


    });
});

test.describe('Hard Vs Soft Assertions', async () => {
    // Hard - test execution will terminate when assert fails
    //Soft - test execution will not terminate but mark test as failed
    //? await expect.soft(page.locator---).toHaveText();
    test('Soft Assertions', async ({ page }) => {

        //Hard Assertions
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveTitle('STORE123');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
        await expect(await page.locator('.navbar-brand')).toBeVisible();
        //Soft Assertions


    });
});

test.describe('Input box and Radio Buttons', async () => {
    test('Handle Input Box', async ({ page }) => {
        //await page.goto('https://itera-qa.azurewebsites.net/home/automation');
        await page.goto('https://testautomationpractice.blogspot.com/');
        const nameField = await page.getByPlaceholder('Enter Name');
        await expect(nameField).toBeVisible();
        await expect(nameField).toBeEmpty();
        await expect(nameField).toBeEditable();
        await expect(nameField).toBeEnabled();

        await nameField.fill('John');
        await page.waitForTimeout(2000); //? Pause execution




    });

    test('Handle Radio buttons', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        const maleRadio = await page.locator('#male');
        await maleRadio.check();
        //await page.check(maleRadio);
        await expect(maleRadio).toBeChecked();
        await expect(await maleRadio.isChecked()).toBeTruthy();
        const femaleRadio = await page.locator('#female');
        await expect(femaleRadio).not.toBeChecked();
        await expect(await femaleRadio.isChecked()).toBeFalsy();

    });

    test('Handle Checkboxes', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        const mondayCheckbox = await page.locator('#monday');
        await mondayCheckbox.check();
        await expect(mondayCheckbox).toBeChecked();
        await expect(await mondayCheckbox.isChecked()).toBeTruthy();
        const sundayCheckbox = await page.locator('#sunday');
        await expect(await sundayCheckbox.isChecked()).toBeFalsy();





    });

    test('Handle Multiple Checkboxes', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        //Select monday, saturday, sunday
        //create array
        const mondayCheckbox = await page.locator('#monday');
        const saturdayCheckbox = await page.locator('#saturday');
        const sundayCheckbox = await page.locator('#sunday');

        const checkboxLocators = [
            mondayCheckbox,
            saturdayCheckbox,
            sundayCheckbox

        ]

        //looping statement

        for (const days of checkboxLocators) {  //Select multi checkboxes
            await days.check();
        }
        await page.waitForTimeout(5000);

        for (const days of checkboxLocators) {  //uncheck multiple checkboxes which are already selected
            if (await days.isChecked()) {
                await days.uncheck();
            }
        }

    });
});

test.describe('Handling Dropdowns', async () => {
    test('Single Dropdown', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        //Multiple ways to select option from the  dropdown
        await page.locator('#country').selectOption({ label: 'Japan' }); //<select id=country>  // label visible test
        await page.waitForTimeout(1000);
        await page.locator('#country').selectOption('Canada'); //Visible Text
        await page.waitForTimeout(1000);
        await page.locator('#country').selectOption({ value: 'usa' }); // Using value
        await page.waitForTimeout(1000);
        await page.locator('#country').selectOption({ index: 3 }); //Using index
        await page.selectOption('#country', 'United Kingdom');  // from method

    });

    test('Assertions', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');
        //Assertions

        const allCountriesOptions = await page.locator('#country option');
        await expect(allCountriesOptions).toHaveCount(10);

        //Approach 2. Check total number of options in dropdown
        const allCountriesOptions2 = await page.$$('#country option'); //array
        console.log('Number of options: ', allCountriesOptions2.length);
        await expect(allCountriesOptions2.length).toBe(10);

        //Approach 3.1 Check presence of value in the dropdown
        const allCountriesOptions3 = await page.locator('#country').textContent(); //Shows text of all options in droptdown
        console.log(allCountriesOptions3);
        await expect(allCountriesOptions3.includes('India')).toBeTruthy();

        //Approach 3.2 Check presence of value in the dropdown using looping
        const allCountriesOptions4 = await page.$$('#country option');
        let status = false;

        for (const options of allCountriesOptions4) {
            const value = await options.textContent();
            if (value.includes('France')) {
                status = true;
                console.log('In loop');
                break;
            }
        }
        console.log('outta loop');
        expect(status).toBeTruthy();

        // Approach 4.  Select option from dropdown using loop

        const allCountriesOptions5 = await page.$$('#country option');


        for (const options of allCountriesOptions4) {
            const value = await options.textContent();
            if (value.includes('France')) {

                await page.selectOption('#country', 'Germany');
                break;
            }
        }
        console.log('outta loop2');


    });

    test('MultiSelect Dropdowns', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        const colorsDropdown = await page.getByLabel('Colors');
        await colorsDropdown.selectOption(['Blue', 'Yellow']);
        //or
        await page.selectOption('#colors', ['Blue', 'Red']);

        //Assertions
        //1. Check number of options in dropdown
        const colorsDropDown2 = await page.locator('#colors option');
        await expect(colorsDropDown2).toHaveCount(7);

        //2. Check number of options in dropdown using JS array
        const colorsDropDown3 = await page.$$('#colors option'); //array

        await expect(colorsDropDown3.length).toBe(7);

        //3. Check presence of value in dropdown
        const colorsDropdownText = await page.locator('#colors').textContent();
        await expect(colorsDropdownText.includes('Red')).toBeTruthy();


    });

});
test.describe('Handling Bootstrap Drowpdown', async () => {
    test('Bootstrap Dropdown', async ({ page }) => {
        //1
        await page.goto('https://www.jquery-az.com/boots/demo.php?ex=63.0_2');
        await page.locator('.multiselect').click();
        const bsDropdownOptions = await page.locator('li .checkbox');
        await expect(bsDropdownOptions).toHaveCount(11);
        //2
        //? Must use $$ for .length for array
        const bsDropDownOptionsArray = await page.$$('li .checkbox');
        await expect(bsDropDownOptionsArray.length).toBe(11);

        //3 select multiple options from dropdown

        const bsDropDown2 = await page.$$('ul>li label'); //array
        //loop
        for (let option of bsDropDown2) {
            const value = await option.textContent(); //.innerText()
            console.log('value is:', value);
            if (value.includes('Angular') || value.includes('Java')) {
                await option.click();


            }

        }







    });

    test('Deselect options', async ({ page }) => {
        await page.goto('https://www.jquery-az.com/boots/demo.php?ex=63.0_2');
        const bsDropDown2 = await page.$$('ul>li label'); //array
        //loop
        for (let option of bsDropDown2) {
            const value = await option.textContent(); //.innerText()
            console.log('value is:', value);
            if (value.includes('HTML') || value.includes('CSS')) { //these were already selected by default
                await option.click();


            }

        }

    });
});

test.describe.skip('Auto Suggest/ Auto Complete', async () => {
    test('AutoSuggestions', async ({ page }) => {

        await page.goto('https://www.redbus.in/');
        const fromField = await page.getByLabel('From');
        await fromField.fill('Del');
        await fromField.press('ArrowDown');

        console.log(await fromField.textContent());


    });
});

test.describe('Hidden Items in dropdown', async () => {
    test('Hidden Options Dropdown', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { type: 'submit' }).click(); //? button, select, link etc

        await page.getByText('PIM').click();

        const arrow = await page.locator('//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[6]/div[1]/div[2]/div[1]/div[1]/div[2]/i[1]').click();

        //Using selectorshub to grab hidden option
        //Turn on debugger and select target option

        //wait for options
        await page.waitForTimeout(1000);
        const options = await page.$$('//div[@role="listbox"]//span');
        for (const option of options) {
            const jobTitle = await option.textContent();
            if (jobTitle.includes('QA Engineer')) {
                await option.click();
                break;

            }


        }


    });
});

test.describe('Dialogs, Alerts, Confirm', async () => {
    test('Alert with OK', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        //enable dialog handling  / Dialog window Handler

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('I am an alert box!');
            await dialog.accept();

        });

        await page.locator('#alertBtn').click();






    });

    test('Confirmation Dialog with Ok and Cancel', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        //enable dialog handling  / Dialog window Handler

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm');
            expect(dialog.message()).toContain('Press a button!');
            //await dialog.accept(); //close by using OK
            await dialog.dismiss(); //close by using cancel

        });

        await page.locator('#confirmBtn').click();
        //await expect(await page.locator('#demo').textContent()).toContain('You pressed OK!');

        await expect(await page.locator('#demo')).toHaveText('You pressed Cancel!');



    });

    test('Prompt Dialog', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        //enable dialog handling  / Dialog window Handler

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt');
            expect(dialog.message()).toContain('Please enter your name:');
            expect(dialog.defaultValue()).toContain('Harry Potter'); // Verify default value


            await dialog.accept('John'); //close by using OK,pass value in input
            // await dialog.dismiss(); //close by using cancel

        });

        await page.locator('#promptBtn').click();
        await expect(await page.locator('#demo')).toHaveText('Hello John! How are you today?');


    });
});