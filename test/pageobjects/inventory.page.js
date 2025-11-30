/*class InventoryPage {

  get items() { 
    return $$('.inventory_item'); 
  }
  
  getItemPrice(i) { 
    return this.items[i].$('.inventory_item_price'); 
  }

  addToCartButton(i){ 
    return this.items[i].$('button'); 
  }

  get cart(){ return $('.shopping_cart_link'); }

  async getPrice(i) {
    return parseFloat((await this.getItemPrice(i).getText()).replace('$',''));
  }
}

export default new InventoryPage();
*/

class InventoryPage {

    get inventoryItems() { return $$('.inventory_item'); }
    getItemPrice(index) { return this.inventoryItems[index].$('.inventory_item_price'); }

    get shoppingCartBadge() { return $('.shopping_cart_badge'); }

    addToCartButton(index) { return this.inventoryItems[index].$('button'); }
    get cartIcon() { return $('.shopping_cart_link'); }

    async getPriceOfItem(index) {
        const priceText = await this.getItemPrice(index).getText(); // "$29.99"
        return parseFloat(priceText.replace('$', ''));
    }

    async addSelectedItemsToCart(selectedIndexes) {
        for (const index of selectedIndexes) {
            await this.addToCartButton(index).click();
        }
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

export default new InventoryPage();
