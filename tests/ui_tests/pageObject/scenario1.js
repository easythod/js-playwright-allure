const { expect } = require('@playwright/test');

exports.Scenario1 = class Scenario1 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.apiDocsLink = page.locator('//html/body/div[1]/div/div[2]/div/p/a[4]');
    this.scrollingDeleteBookingLink = page.locator('//*[@id="scrollingNav"]/ul/li[9]/a');
    this.tabExample2 = page.locator('//*[@id="api-Booking-DeleteBooking-1.0.0"]/ul[1]/li[2]/a');
    this.example = page.locator('//*[@id="examples-Booking-DeleteBooking-1_0_0-1"]/pre/code');
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickApiDocsLink() {
    await this.apiDocsLink.click();
  }

  async clickScrollingDeleteBookingLink() {
    await this.scrollingDeleteBookingLink.click();
  }

  async clickTabExample2() {
    await this.tabExample2.click();
  }

  async expectExample() {
    await expect(this.example).toBeVisible();
  }
};