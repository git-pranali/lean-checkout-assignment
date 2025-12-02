/**
 * Configuration file template for test environment
 * 
 * Copy this file to config.js and update with your actual values
 * The config.js file is gitignored to protect sensitive information
 * 
 * Environment variables can be used to override default values:
 * - BASE_URL: Override the base URL (e.g., for different environments)
 * - USERNAME: Override the default username
 * - PASSWORD: Override the default password
 * 
 * Usage:
 *   Set environment variables before running tests:
 *   export BASE_URL=https://staging.example.com
 *   export USERNAME=test_user
 *   export PASSWORD=test_password
 * 
 * Or use a .env file (requires dotenv package)
 */
export const config = {
  // Base URL for the application
  // Can be overridden via BASE_URL environment variable
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  
  // User credentials for login
  // Can be overridden via USERNAME and PASSWORD environment variables
  credentials: {
    username: process.env.USERNAME || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce'
  }
};

