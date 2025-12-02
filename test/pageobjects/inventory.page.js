/**
 * Inventory Page Object
 * Contains all elements and methods related to the product inventory page
 * Handles product selection, cart operations, and price calculations
 */
class InventoryPage {

  /**
   * Getter for all inventory items on the page
   */
  get inventoryItems() {
    return $$('.inventory_item');
  }

  /**
   * Get price element for a specific item by index
   * @param {number} index - Index of the item 
   */
  getItemPrice(index) {
    return this.inventoryItems[index].$('.inventory_item_price');
  }

  /**
   * Getter for shopping cart badge (shows item count)
   */
  get shoppingCartBadge() {
    return $('.shopping_cart_badge');
  }

  /**
   * Get add to cart button for a specific item by index
   * @param {number} index - Index of the item 
   */
  addToCartButton(index) {
    return this.inventoryItems[index].$('button');
  }

  /**
   * Getter for cart icon/link
   */
  get cartIcon() {
    return $('.shopping_cart_link');
  }

  /**
   * Extract and parse price value from item price text
   * @param {number} index - Index of the item (0-based)
   * @returns {Promise<number>} Parsed price as a float (e.g., 29.99 from "$29.99")
   */
  async getPriceOfItem(index) {
    const priceText = await this.getItemPrice(index).getText(); // Example: "$29.99"
    return parseFloat(priceText.replace('$', ''));
  }

  /**
   * Add multiple items to cart by their indexes
   * @param {number[]} selectedIndexes - Array of item indexes to add to cart
   * @returns {Promise<void>}
   */
  async addSelectedItemsToCart(selectedIndexes) {
    for (const index of selectedIndexes) {
      await this.addToCartButton(index).click();
    }
  }

  /**
   * Navigate to shopping cart page
   * @returns {Promise<void>}
   */
  async goToCart() {
    await this.cartIcon.click();
  }

  /**
   * Calculate total price for selected items
   * @param {number[]} selectedIndexes - Array of item indexes
   * @returns {Promise<number>} Total price of selected items
   */
  async calculateTotalForSelectedItems(selectedIndexes) {
    let total = 0;
    for (const index of selectedIndexes) {
      const price = await this.getPriceOfItem(index);
      total += price;
    }
    return total;
  }

  /**
   * Add selected items to cart and return calculated total
   * @param {number[]} selectedIndexes - Array of item indexes
   * @returns {Promise<number>} Total price of selected items
   */
  async addItemsToCartAndCalculateTotal(selectedIndexes) {
    let calculatedTotal = 0;
    for (const index of selectedIndexes) {
      const price = await this.getPriceOfItem(index);
      calculatedTotal += price;
      await this.addToCartButton(index).click();
    }
    return calculatedTotal;
  }
}

export default new InventoryPage();
