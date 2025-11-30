class SummaryPage {

  get itemTotalLabel() { return $('.summary_subtotal_label'); }
  get taxLabel() { return $('.summary_tax_label'); }
  get totalLabel() { return $('.summary_total_label'); }

  async getItemTotal() {
    const text = await this.itemTotalLabel.getText();  // "Item total: $58.97"
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.taxLabel.getText(); // "Tax: $4.72"
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.totalLabel.getText(); // "Total: $63.69"
    return parseFloat(text.replace('Total: $', ''));
  }
}

export default new SummaryPage();