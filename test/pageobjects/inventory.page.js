class InventoryPage {
  get items() { return $$('.inventory_item'); }
  getItemPrice(i) { return this.items[i].$('.inventory_item_price'); }
  addToCartButton(i){ return this.items[i].$('button'); }
  get cart(){ return $('.shopping_cart_link'); }

  async getPrice(i){
    return parseFloat((await this.getItemPrice(i).getText()).replace('$',''));
  }
}
export default new InventoryPage();
