const { expect } = require('@playwright/test');

exports.Scenario3 = class Scenario3 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Attribute selectors rather than absolute XPath: mwtestconsultancy.co.uk is a third-party
    // site that has already been restructured once (the old "Purchase Testing Web APIs now"
    // button is gone; the books now live on a /books/ page).
    this.websiteLink = page.locator('a[alt="MWTestConsultancy Website"]');
    this.booksLink = page.locator('a[href$="/books/"]');
    this.nameBook = page.locator('h3#testing-web-apis');
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickWebsiteLink() {
    await this.websiteLink.click();
  }

  async clickBooksLink() {
    await this.booksLink.first().click();
  }

  async expectNameBook() {
    await expect(this.nameBook).toHaveText('Testing Web APIs');
  }
};
