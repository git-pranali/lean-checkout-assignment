class SummaryPage {

  get itemTotal() { 
    return $('.summary_subtotal_label'); 
  }
  get tax() { 
    return $('.summary_tax_label'); 
  }
  get total() { 
    return $('.summary_total_label'); 
  }

  async getItemTotal() { 
    return parseFloat((await this.itemTotal.getText()).replace('Item total: $','')); 
  }

  async getTax() { 
    return parseFloat((await this.tax.getText()).replace('Tax: $','')); 
  }

  async getTotal() { 
    return parseFloat((await this.total.getText()).replace('Total: $','')); 
  }
}

export default new SummaryPage();