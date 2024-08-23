const { test, expect } = require('@playwright/test');
const { Scenario1 } = require('./pageObject/scenario1');
const { Scenario2 } = require('./pageObject/scenario2');
const { Scenario3 } = require('./pageObject/scenario3');
const { Scenario4 } = require('./pageObject/scenario4');


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

test('Buy Me a Tea And a Cake', async ({ page, baseURL }) => {
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
  await test.step("Click Button Purchase Testing Web APIs now", async () => {
    await scenario3.clickbuttonPurchaseTestingWebAPIs();
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
  await test.step("Go to GitPage Link", async () => {
    await scenario4.clickGotoGitPageLink();
  });
  await test.step("Expect URL", async () => {
    await scenario4.expectURL();
  });
});