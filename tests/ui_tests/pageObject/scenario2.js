const { expect } = require('@playwright/test');

exports.Scenario2 = class Scenario2 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Restful-Booker dropped its "buy me a tea and a cake" donation link; the support slot on the
    // page is now the Ministry of Testing banner. It carries target="_blank", so clicking it
    // opens a second tab rather than navigating this one.
    this.supportBanner = page.locator('a[href*="ministryoftesting.com"]:has(img)');
    this.notFoundSelector = 'text=404.';
    this.popup = null;
  }

  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  async clickButtonBuyMeTeaAndCake() {
    // Capture the new tab; asserting against `this.page` would inspect the wrong document.
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.supportBanner.click(),
    ]);
    this.popup = popup;
  }

  async expectText() {
    // INTENTIONAL FAILURE, by the same design as [bk-7] in the API suite: the code is correct and
    // the interaction is real, but the expectation is deliberately wrong so that every Allure run
    // ships a red UI example alongside the green ones. The support link works, so there is no 404
    // marker to find. Do not "fix" this assertion — see .local/TODO.md.
    await expect(this.popup.locator(this.notFoundSelector)).toBeVisible();
  }
};
