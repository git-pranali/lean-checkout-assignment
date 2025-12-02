/**
 * Checkout Page Object
 * Contains all elements and methods related to checkout process
 */
class CheckoutPage {
  get checkoutButton() {
    return $('#checkout');
  }

  get firstNameInput() {
    return $('#first-name');
  }

  get lastNameInput() {
    return $('#last-name');
  }

  get postalCodeInput() {
    return $('#postal-code');
  }

  get continueButton() {
    return $('#continue');
  }

  get finishButton() {
    return $('#finish');
  }

  get successMessage() {
    return $('//h2[@class="complete-header"]');
  }

  /**
   * Click on checkout button
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Fill checkout information form
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
  }

  /**
   * Complete checkout information and continue
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  async completeCheckoutInformation(firstName, lastName, postalCode) {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.continueButton.click();
  }

  /**
   * Complete the checkout process
   */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /**
   * Get success message text
   * @returns {Promise<string>} Success message text
   */
  async getSuccessMessage() {
    return await this.successMessage.getText();
  }
}

export default new CheckoutPage();

