class InventoryPage {

  get inventoryItems() {
    return $$('.inventory_item');
  }

  getItemPrice(index) {
    return this.inventoryItems[index].$('.inventory_item_price');
  }

  get shoppingCartBadge() {
    return $('.shopping_cart_badge');
  }

  addToCartButton(index) {
    return this.inventoryItems[index].$('button');
  }

  get cartIcon() {
    return $('.shopping_cart_link');
  }

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