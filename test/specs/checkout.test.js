/**
 * Checkout Test Suite
 * 
 * This test suite validates the complete checkout flow including:
 * - Adding items to cart
 * - Calculating item totals
 * - Filling checkout information
 * - Validating summary page calculations
 * - Completing the checkout process
 * 
 */
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import SummaryPage from '../pageobjects/summary.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import { config as testConfig } from '../config/config.js';
import DataGenerator from '../utils/dataGenerator.js';
import allure from '@wdio/allure-reporter';

describe('Checkout validation', () => {

  // Test data variables - initialized in beforeEach hook
  let checkoutData;      // Random checkout data (firstName, lastName, postalCode)
  let selectedItems;     // Random array of item indexes to select

  /**
   * Setup hook - Runs once before all tests in this suite
   * Performs initial setup: navigates to app and logs in
   */
  before(async () => {
    // Maximize browser window for consistent viewport
    await browser.maximizeWindow();
    
    // Navigate to base URL (configured in wdio.conf.js)
    await browser.url('/');
    
    // Login with credentials from config file 
    await LoginPage.login(
      testConfig.credentials.username,
      testConfig.credentials.password
    );
  });

  /**
   * Setup hook - Runs before each test case
   * Generates fresh random test data for each test execution
   * This ensures test independence and varied test scenarios
   */
  beforeEach(async () => {
    // Generate random checkout data (firstName, lastName, postalCode)
    // This eliminates hardcoded test data
    checkoutData = DataGenerator.generateCheckoutData();
    
    // Wait for inventory items to load before selecting random items
    await InventoryPage.inventoryItems[0].waitForDisplayed();
    
    // Get total number of items available
    const totalItems = (await InventoryPage.inventoryItems).length;
    
    // Generate random array of 3 unique item indexes
    // This ensures different items are selected in each test run
    selectedItems = DataGenerator.generateRandomItemIndexes(totalItems, 3);
  });

  /**
   * Teardown hook - Runs after each test case
   * Placeholder for cleanup operations if needed
   * Examples: clear cookies, logout, reset state, etc.
   */
  afterEach(async () => {
    // Teardown: Clean up after each test if needed
    // For example, you could clear cookies, logout, etc.
    // Currently, the test navigates through the flow, so minimal cleanup needed
    // This hook is here for future scalability and maintainability
  });

  /**
   * Teardown hook - Runs once after all tests in this suite
   * Placeholder for final cleanup operations
   */
  after(async () => {
    // Final teardown: Close browser or perform final cleanup
    // WebdriverIO handles browser closing automatically, but you can add custom cleanup here
    // Examples: generate final reports, cleanup test data, etc.
  });

  it('Lean Checkout', async () => {
    allure.addStep('Adding items to cart and calculating total');
    
    // Add selected items to cart and calculate total
    const calculatedItemTotal = await InventoryPage.addItemsToCartAndCalculateTotal(selectedItems);

    allure.addStep('Navigating to checkout');
    // Navigate to shopping cart page
    await InventoryPage.goToCart();
    // Click checkout button to proceed to checkout information page
    await CheckoutPage.clickCheckout();

    allure.addStep('Filling checkout information with generated data');
    // Fill checkout information with generated data
    await CheckoutPage.completeCheckoutInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );

    allure.addStep('Validating summary page totals');
    // Extract pricing information from summary page
    const uiItemTotal = await SummaryPage.getItemTotal();
    const uiTax = await SummaryPage.getTax();
    const uiGrandTotal = await SummaryPage.getTotal();

    // Validation 1: Verify UI item total matches our calculated total
    // Using toBeCloseTo for floating point comparison (2 decimal places)
    console.log('----------------------------------------------------------------');
    console.log('UI Item Total: ' + uiItemTotal + ' and Calculated: ' + calculatedItemTotal);
    await expect(uiItemTotal).toBeCloseTo(calculatedItemTotal, 2);

    // Validation 2: Verify grand total = item total + tax
    // This ensures the tax calculation is correct
    const expectedGrandTotal = uiItemTotal + uiTax;
    console.log('UI GrandTotal: ' + uiGrandTotal + ' and Calculated GrandTotal: ' + expectedGrandTotal);
    await expect(uiGrandTotal).toBeCloseTo(expectedGrandTotal, 2);
    console.log('----------------------------------------------------------------');

    allure.addStep('Completing checkout');
    // Complete the checkout process by clicking finish button
    await CheckoutPage.finishCheckout();
    
    allure.addStep('Verifying success message');
    // Verify that the success message is displayed correctly
    const successMessage = await CheckoutPage.successMessage;
    await expect(successMessage).toHaveText('Thank you for your order!');
  });
});
