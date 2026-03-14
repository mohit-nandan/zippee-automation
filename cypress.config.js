const { defineConfig } = require("cypress");
const { getDbConfig } = require("./cypress/support/db/dbconfig");
const { queryDb } = require("./cypress/support/db/db");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });


function validateFileStability(filePath, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    let lastSize = -1;

    const check = () => {
      if (!fs.existsSync(filePath)) {
        if (Date.now() - start > timeout)
          return reject(new Error('File not found'));
        return setTimeout(check, 500);
      }

      const { size } = fs.statSync(filePath);

      if (size === lastSize && size > 0) {
        return setTimeout(() => resolve(true), 800);
      }

      lastSize = size;
      setTimeout(check, 500);
    };

    check();
  });
}

module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1400,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Zippee Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      const envName = (config.env.environment || "staging").toUpperCase();
      
      const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

      const getRawEnvValue = (key) => {
        const regex = new RegExp(`^${key}=(.*)$`, 'm');
        const match = envContent.match(regex);
        if (match) {
          return match[1].trim().replace(/^["']|["']$/g, '');
        }
        return process.env[key];
      };

      const baseUrl = getRawEnvValue(`${envName}_BASE_URL`);
      if (baseUrl) {
        config.baseUrl = baseUrl;
      }

      config.env.adminUser = getRawEnvValue(`${envName}_ADMIN_USER`);
      config.env.adminPass = getRawEnvValue(`${envName}_ADMIN_PASS`);
      
      const dbConfig = getDbConfig(envName);

      config.env.shipmentApi = {
        username: getRawEnvValue(`${envName}_CLICKPOST_SHIPMENT_API_USERNAME`),
        password: getRawEnvValue(`${envName}_CLICKPOST_SHIPMENT_API_PASSWORD`),
        apiKey: getRawEnvValue(`${envName}_CLICKPOST_API_KEY`)
      };

      on('task', {
        waitForFileStable: (fileName) => {
          const filePath = path.join(__dirname, 'cypress/downloads', fileName);
          return validateFileStability(filePath);
        },

        waitForDownload: (fileName) => {
          const filePath = path.join(__dirname, 'cypress/downloads', fileName);
          return validateFileStability(filePath);
        },

        readExcel: (filePath) => {
          const workbook = xlsx.readFile(filePath);
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          return xlsx.utils.sheet_to_json(sheet);
        },

        deleteFile: (fileName) => {
          const filePath = path.join(__dirname, 'cypress/downloads', fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          return null;
        },

        queryDb: async (query) => {
          return queryDb(dbConfig, query);
        },
      });
      
      config.env.grepFilterSpecs = true;
      config.env.grepOmitFiltered = true;

      require('@cypress/grep/plugin').plugin(config);

      return config;
    },
  },
});
