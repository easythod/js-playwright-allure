const { expect } = require('@playwright/test');

exports.Scenario3 = class Scenario3 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.websiteLink = page.locator('//html/body/div[1]/div/div[2]/div/p/a[2]');
    this.buttonPurchaseTestingWebAPIs = page.locator('//html/body/div[2]/div[2]/div/div[3]/p/a');
    this.nameBook = page.locator('//*[@id="page-main-content-row"]/div[1]/div/div/div/div/div[2]/h1');
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickWebsiteLink() {
    await this.websiteLink.click();
  }

  async clickbuttonPurchaseTestingWebAPIs() {
    await this.buttonPurchaseTestingWebAPIs.click();
  }

  async expectNameBook() {
    await expect(this.nameBook).toContainText(await this.nameBook.innerText());
  }
};