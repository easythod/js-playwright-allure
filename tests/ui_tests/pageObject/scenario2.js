const { expect } = require('@playwright/test');

exports.Scenario2 = class Scenario2 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.buttonBuyMeTeaAndCake = page.locator('//html/body/div[2]/div[3]/div[3]/a/img');
    this.expectText = page.locator("text=404.");
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickButtonBuyMeTeaAndCake() {
    await this.buttonBuyMeTeaAndCake.click();
  }

  async expectText() {
    await expect(this.expectText).toBeVisible();
  }
};