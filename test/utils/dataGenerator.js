/**
 * Data Generator Utility
 * Provides random data generation for test data
 */
class DataGenerator {
  /**
   * Generate random first name
   * @returns {string} Random first name
   */
  generateFirstName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma', 'Robert', 'Olivia'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  /**
   * Generate random last name
   * @returns {string} Random last name
   */
  generateLastName() {
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  /**
   * Generate random postal code
   * @returns {string} Random postal code
   */
  generatePostalCode() {
    // Generate a random 5-6 digit postal code
    return Math.floor(10000 + Math.random() * 900000).toString();
  }

  /**
   * Generate complete user data for checkout
   * @returns {Object} Object containing firstName, lastName, and postalCode
   */
  generateCheckoutData() {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      postalCode: this.generatePostalCode()
    };
  }

  /**
   * Generate random array of item indexes
   * @param {number} maxItems - Maximum number of items available
   * @param {number} count - Number of items to select (default: 3)
   * @returns {number[]} Array of random item indexes
   */
  generateRandomItemIndexes(maxItems, count = 3) {
    const indexes = [];
    const availableIndexes = Array.from({ length: maxItems }, (_, i) => i);
    
    for (let i = 0; i < count && availableIndexes.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      indexes.push(availableIndexes.splice(randomIndex, 1)[0]);
    }
    
    return indexes.sort((a, b) => a - b);
  }
}

export default new DataGenerator();

