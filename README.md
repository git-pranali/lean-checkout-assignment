# WebdriverIO Automation Framework (JavaScript)

This repository contains a complete WebdriverIO automation framework built using:
- JavaScript
- Mocha
- Page Object Model (POM)
- Allure Reporting
- Assertions for item total validation

## ✨ Key Features

- **Configuration Management**: Centralized config file with environment variable support
- **Data Generation**: Random data generator utility for dynamic test data
- **Page Object Model**: Well-structured page objects for maintainability
- **Setup/Teardown Hooks**: Proper test lifecycle management for scalability
- **Comprehensive Reporting**: Allure integration with detailed test reports

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Test Environment

The framework uses a configuration file for credentials and base URL. Since `config.js` contains sensitive information, it's gitignored.

**First-time setup:**

```bash
# Copy the example config file
cp test/config/config.example.js test/config/config.js

# Edit config.js with your actual values (optional - defaults are provided)
```

**Using Environment Variables (Recommended):**

You can override default values using environment variables:

```bash
export BASE_URL=https://www.saucedemo.com
export USERNAME=standard_user
export PASSWORD=secret_sauce
```

### 3. Run Tests

```bash
npm run test
```

### 4. Generate and View Reports

```bash
npm run allure:generate
npm run allure:open
```

## 📁 Project Structure

```
WebdriverIO_Framework_Complete/
├── test/
│   ├── config/
│   │   ├── config.js              # Configuration file (gitignored - contains sensitive data)
│   │   └── config.example.js      # Template for config.js
│   ├── pageobjects/
│   │   ├── checkout.page.js       # Checkout page object
│   │   ├── inventory.page.js      # Inventory page object
│   │   ├── login.page.js          # Login page object
│   │   └── summary.page.js        # Summary page object
│   ├── specs/
│   │   └── checkout.test.js       # Checkout test suite
│   └── utils/
│       └── dataGenerator.js       # Random data generation utility
├── wdio.conf.js                   # WebdriverIO configuration
├── package.json
└── README.md
```


