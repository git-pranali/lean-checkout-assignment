import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import SummaryPage from '../pageobjects/summary.page.js';
import allure from '@wdio/allure-reporter';

describe('Checkout validation', () => {

  it('Lean Checkout', async () => {

    await browser.url('https://www.saucedemo.com');

    // Login
    await LoginPage.login('standard_user', 'secret_sauce');

    // COLLECT PRICES
    const selected = [0, 1, 2];
    let calculatedItemTotal = 0;

    for (const index of selected) {
      const price = await InventoryPage.getPriceOfItem(index);
      calculatedItemTotal += price;
      await InventoryPage.addToCartButton(index).click();
    }

    // Navigate to Cart → Checkout → Continue
    await InventoryPage.goToCart();
    await $('#checkout').click();

    await $('#first-name').setValue('FirstName');
    await $('#last-name').setValue('LastName');
    await $('#postal-code').setValue('400001');
    await $('#continue').click();

    // SUMMARY PAGE VALIDATION
    const uiItemTotal = await SummaryPage.getItemTotal();
    const uiTax = await SummaryPage.getTax();
    const uiGrandTotal = await SummaryPage.getTotal();

    // ASSERT item total matches
    console.log('----------------------------------------------------------------');
    console.log('UI: ' + uiItemTotal + ' and Calculated: ' + calculatedItemTotal);
    await expect(uiItemTotal).toBeCloseTo(calculatedItemTotal, 2);

    // ASSERT total = item total + tax
    const expectedGrandTotal = uiItemTotal + uiTax;
    console.log('UI GrandTotal: ' + uiGrandTotal + ' and Calculated GrandTotal: ' + expectedGrandTotal);
    await expect(uiGrandTotal).toBeCloseTo(expectedGrandTotal, 2);
    console.log('----------------------------------------------------------------');

    await $('#finish').click();
    const successMessage = await $('//h2[@class="complete-header"]');

    console.log(successMessage);
    await expect(successMessage).toHaveText('Thank you for your order!');
  });
});