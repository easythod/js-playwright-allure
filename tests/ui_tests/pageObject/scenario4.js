const { expect } = require('@playwright/test');

exports.Scenario4 = class Scenario4 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.codeLink = page.locator('//html/body/div[1]/div/div[2]/div/p/a[3]');
    this.gotoGitPageLink = page.locator('//*[@id="repo-content-pjax-container"]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/span/a');
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickCodeLink() {
    await this.codeLink.click();
  }

  async clickGotoGitPageLink() {
    await this.gotoGitPageLink.click();
  }

  async expectURL() {
    await expect(this.page).not.toHaveURL('https://www.mwtestconsultancy.co.uk/training/apitesting/');
  }
};