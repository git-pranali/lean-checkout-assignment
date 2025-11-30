import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import SummaryPage from '../pageobjects/summary.page.js';
import allure from '@wdio/allure-reporter';

describe('Checkout validation', () => {
  
  it('validates totals', async () => {

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
