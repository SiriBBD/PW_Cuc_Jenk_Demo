import { Given, Then, When, setDefaultTimeout} from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000 * 2);
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


Given('user search for a {string}', async function (book) {
    
    await pageFixture.page.waitForTimeout(4000);
    await pageFixture.page.locator("//input[@placeholder='Search books or authors']").type(book);
    await pageFixture.page.waitForTimeout(4000);
    await pageFixture.page.locator("//span[@class='mat-option-text']").click();
    await pageFixture.page.waitForTimeout(2000);    
});

When('user add the book to the cart', async function () {
    await pageFixture.page.waitForTimeout(2000);    
    await pageFixture.page.locator("//button[@color='primary']").click();
    await pageFixture.page.waitForTimeout(3000);    

});

Then('the cart badge should get updated', async function(){
    const badgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
    await pageFixture.page.locator("#mat-badge-content-0").click();
});
