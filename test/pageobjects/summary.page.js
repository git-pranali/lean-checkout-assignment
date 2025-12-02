/**
 * Summary Page Object
 * Contains all elements and methods related to the checkout summary page
 * Handles extraction of pricing information for validation
 */
class SummaryPage {

  /**
   * Getter for item total label element
   */
  get itemTotalLabel() { 
    return $('.summary_subtotal_label'); 
  }

  /**
   * Getter for tax label element
   */
  get taxLabel() { 
    return $('.summary_tax_label'); 
  }

  /**
   * Getter for total label element
   */
  get totalLabel() { 
    return $('.summary_total_label'); 
  }

  /**
   * Extract and parse item total value from summary page
   * @returns {Promise<number>} Item total as a float (e.g., 58.97 from "Item total: $58.97")
   */
  async getItemTotal() {
    const text = await this.itemTotalLabel.getText();  // Example: "Item total: $58.97"
    return parseFloat(text.replace('Item total: $', ''));
  }

  /**
   * Extract and parse tax value from summary page
   * @returns {Promise<number>} Tax amount as a float (e.g., 4.72 from "Tax: $4.72")
   */
  async getTax() {
    const text = await this.taxLabel.getText(); // Example: "Tax: $4.72"
    return parseFloat(text.replace('Tax: $', ''));
  }

  /**
   * Extract and parse grand total value from summary page
   * @returns {Promise<number>} Grand total as a float (e.g., 63.69 from "Total: $63.69")
   */
  async getTotal() {
    const text = await this.totalLabel.getText(); // Example: "Total: $63.69"
    return parseFloat(text.replace('Total: $', ''));
  }
}

export default new SummaryPage();
