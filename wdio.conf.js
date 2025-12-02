/**
 * WebdriverIO Configuration File
 * 
 * This file configures the WebdriverIO test runner with:
 * - Test execution settings (runner, specs, framework)
 * - Browser capabilities
 * - Base URL (imported from config file)
 * - Reporters (spec reporter for console, allure for detailed reports)
 * - Hooks for test lifecycle management
 */
import { config as testConfig } from './test/config/config.js';

export const config = {
  // Test runner: 'local' runs tests on local machine
  runner: 'local',
  
  // Test specification files location
  // All .js files in test/specs directory will be executed
  specs: ['./test/specs/*.js'],
  
  // Base URL for the application under test
  // Imported from config file - can be overridden via environment variables
  // Using relative paths in tests (e.g., browser.url('/')) will use this baseUrl
  baseUrl: testConfig.baseUrl,
  
  // Browser capabilities configuration
  capabilities: [{
    // Browser to use for testing
    // Options: 'chrome', 'firefox', 'microsoftedge', 'safari'
    browserName: 'chrome'
  }],
  
  // Test framework: Mocha for BDD-style test structure
  framework: 'mocha',
  
  // Reporters configuration
  reporters: [
    // Spec reporter: outputs test results to console in readable format
    'spec',
    // Allure reporter: generates detailed HTML reports with screenshots
    ['allure', {
      outputDir: 'allure-results',              // Directory for allure results
      disableWebdriverStepsReporting: false,     // Include WebdriverIO steps in report
      disableWebdriverScreenshotsReporting: false // Include screenshots in report
    }]
  ],
  
  // Hook: Executed after each test
  // Takes screenshot automatically if test fails for debugging
  afterTest: async function (test, context, { error }) {
    if (error) { 
      await browser.takeScreenshot(); 
    }
  }
}