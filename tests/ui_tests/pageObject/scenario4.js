const { expect } = require('@playwright/test');

exports.Scenario4 = class Scenario4 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Attribute selectors rather than absolute XPath: GitHub rewrites its repo-page DOM often,
    // which is what broke the previous "#repo-content-pjax-container/div/div/..." path.
    this.codeLink = page.locator('a[alt="API Code"]');
    // The repo's About sidebar links back to the live API; same tab, no target="_blank".
    this.gotoGitPageLink = page.locator('a[href="https://restful-booker.herokuapp.com/"]');
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickCodeLink() {
    await this.codeLink.click();
  }

  async clickGotoGitPageLink() {
    await this.gotoGitPageLink.first().click();
  }

  async expectURL() {
    await expect(this.page).toHaveURL(/^https:\/\/restful-booker\.herokuapp\.com\/?$/);
  }
};
