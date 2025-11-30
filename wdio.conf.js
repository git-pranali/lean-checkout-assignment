export const config = {
  runner: 'local',
  specs: ['./test/tests/*.js'],
  capabilities: [{
    // capabilities for local browser web tests
    browserName: 'chrome' // or "firefox", "microsoftedge", "safari"

  }],

  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  afterTest: async function (test, context, { error }) {
    if (error) { await browser.takeScreenshot(); }
  }
}
