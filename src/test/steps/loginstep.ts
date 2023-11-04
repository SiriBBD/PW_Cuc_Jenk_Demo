import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000 * 2);
import { expect} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


Given('User navigates to the application', async function () {    
    await pageFixture.page.goto(process.env.BASEURL);
    pageFixture.logger.info("Navigated to the application");
    });

Given('User click on the login link', async function () {
    await pageFixture.page.waitForTimeout(1000);
    await pageFixture.page.locator("//span[normalize-space()='Login']").click();
    await pageFixture.page.waitForTimeout(2000);
    
    });

Given('User enter the username as {string}', async function (username) {
    await pageFixture.page.locator("//input[@id='mat-input-0']").fill(username);
    console.log("Username is "+username);
          
    });

Given('User enter the password as {string}', async function (password) {
    await pageFixture.page.locator("//*[@id='mat-input-1']").fill(password);
    console.log("Password is "+password);
          
    });

When('User click on the login button', async function () {
    await pageFixture.page.locator("button[color='primary']").click();      
    });

Then('Login should be success', async function () {
    const text = await pageFixture.page.locator("//mat-icon[normalize-space()='account_circle']").textContent();
    console.log("username is "+text);
    });

When('Login should Fail', async function () {    
    const failureMsg = pageFixture.page.locator("//*[@id='mat-error-0']");
    await expect(failureMsg).toBeVisible();
    });