import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import SummaryPage from '../pageobjects/summary.page.js';
import allure from '@wdio/allure-reporter';

describe('Checkout validation', () => {
  
/*  it('validates totals', async () => {

    await browser.url('https://www.saucedemo.com');
    await LoginPage.login('standard_user','secret_sauce');

    const count = (await InventoryPage.items).length;
    const selected=[0,1,2];

    let calcTotal=0;
    for(const i of selected) {
      const price = await InventoryPage.getPrice(i);
      calcTotal+=price;
      await InventoryPage.addToCartButton(i).click();
    }

    await (await InventoryPage.cart).click();
    await $('#checkout').click();
    await $('#first-name').setValue('A');
    await $('#last-name').setValue('B');
    await $('#postal-code').setValue('12345');
    await $('#continue').click();

    const uiItemTotal = await SummaryPage.getItemTotal();
    const uiTax = await SummaryPage.getTax();
    const uiGrand = await SummaryPage.getTotal();

    expect(uiItemTotal).toBeCloseTo(calcTotal,2);
    expect(uiGrand).toBeCloseTo(uiItemTotal + uiTax, 2);
  });
});
*/


// import SummaryPage from '../pageobjects/summary.page.js';

it('Lean Checkout', async () => {

    await browser.url('https://www.saucedemo.com');

    // Login
    await LoginPage.login('standard_user', 'secret_sauce');
  

    // RANDOM ITEMS
    //const items = await InventoryPage.inventoryItems;
    //const selectedIndexes = pickRandomItems(items, 3);
/*
    const count = (await InventoryPage.inventoryItems).length;
    const selected = [0, 1, 2];

    let calcTotal=0;
    for(const i of selected) {
      const price = await InventoryPage.getPriceOfItem(i);
      calcTotal+=price;
      await InventoryPage.addToCartButton(i).click();
    }

    //Assertion
    //await expect(InventoryPage.shoppingCartBadge).toHaveText('3')
*/
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
    //await CartPage.proceedToCheckout();
    //await CheckoutPage.fillCheckoutInfo();
    await $('#checkout').click();

    await $('#first-name').setValue('First');
    await $('#last-name').setValue('Last');
    await $('#postal-code').setValue('12345');
    await $('#continue').click();

    // SUMMARY PAGE VALIDATION
    const uiItemTotal = await SummaryPage.getItemTotal();
    const uiTax = await SummaryPage.getTax();
    const uiGrandTotal = await SummaryPage.getTotal();

    // ASSERT item total matches
    console.log('----------------------------------------------------------------');
    console.log('UI: '+ uiItemTotal + 'and Calculated: ' + calculatedItemTotal);
    await expect(uiItemTotal).toBeCloseTo(calculatedItemTotal, 2);

    // ASSERT total = item total + tax
    const expectedGrandTotal = uiItemTotal + uiTax;
    console.log('UI GrandTotal: '+ uiGrandTotal + 'and Calculated GrandTotal: ' + expectedGrandTotal);
    await expect(uiGrandTotal).toBeCloseTo(expectedGrandTotal, 2);
    console.log('----------------------------------------------------------------');

    // Finish order
    //await CheckoutPage.finishCheckout();
/*
    await $('#checkout').click();

    await $('#first-name').setValue('First');
    await $('#last-name').setValue('Last');
    await $('#postal-code').setValue('12345');
    */
    await $('#finish').click();
    

    const successMessage = await $('//h2[@class="complete-header"]');

    console.log(successMessage);
    await expect(successMessage).toHaveText('Thank you for your order!');
});
});