const { test, expect } = require('@playwright/test');
const { Scenario1 } = require('./pageObject/scenario1');
const { Scenario2 } = require('./pageObject/scenario2');
const { Scenario3 } = require('./pageObject/scenario3');
const { Scenario4 } = require('./pageObject/scenario4');


/**
 * Attach the current page to the Allure report.
 *
 * `screenshot: "on"` only captures at test end, and these journeys navigate away from the pages
 * they pass through — Code #4 finishes back on Restful-Booker, so the end-of-test image never
 * shows GitHub at all. Playwright's auto-waiting also clicks as soon as a link is actionable, so
 * an intermediate page can come and go in the video before its CSS has even applied. Waiting for
 * `load` first means the attachment shows the page rendered, not mid-paint.
 */
async function attachPage(page, name) {
  await page.waitForLoadState('load');
  await test.info().attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}

test('API Docs', async ({ page, baseURL }) => {
  const scenario1 = new Scenario1(page);
  await test.step("Visit site", async () => {
    await scenario1.goto(`${baseURL}`);
  });
  await test.step("Click API Docs Link", async () => {
    await scenario1.clickApiDocsLink();
  });
  await test.step("Click Scrolling Delete Booking Link", async () => {
    await scenario1.clickScrollingDeleteBookingLink();
  });
  await test.step("Click Tab Example2", async () => {
    await scenario1.clickTabExample2();
  });
  await test.step("Expect Example 2", async () => {
    await scenario1.expectExample();
  });
});

test('Buy Me a Tea And a Cake - failed', async ({ page, baseURL }) => {
  const scenario2 = new Scenario2(page);
  await test.step("Visit site", async () => {
    await scenario2.goto(`${baseURL}`);
  });
  await test.step("Click Button Buy Me a Tea And a Cake", async () => {
    await scenario2.clickButtonBuyMeTeaAndCake();
  });
  await test.step("Check for Text", async () => {
    await scenario2.expectText();
  });
});

test('Web site', async ({ page, baseURL }) => {
  const scenario3 = new Scenario3(page);
  await test.step("Visit site", async () => {
    await scenario3.goto(`${baseURL}`);
  });
  await test.step("Click Website Link", async () => {
    await scenario3.clickWebsiteLink();
  });
  await test.step("Capture MWTestConsultancy site", async () => {
    await attachPage(page, "MWTestConsultancy website");
  });
  await test.step("Click Books Link", async () => {
    await scenario3.clickBooksLink();
  });
  await test.step("Expect name Book", async () => {
    await scenario3.expectNameBook();
  });
});

test('Code #4', async ({ page, baseURL }) => {
  const scenario4 = new Scenario4(page);
  await test.step("Visit site", async () => {
    await scenario4.goto(`${baseURL}`);
  });
  await test.step("Click Code Link", async () => {
    await scenario4.clickCodeLink();
  });
  await test.step("Capture GitHub repository page", async () => {
    await attachPage(page, "GitHub repository");
  });
  await test.step("Go to GitPage Link", async () => {
    await scenario4.clickGotoGitPageLink();
  });
  await test.step("Expect URL", async () => {
    await scenario4.expectURL();
  });
});