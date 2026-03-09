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

function getConfigurationByFile(file) {
  const pathToConfigFile = `cypress/config/${file}.json`;
  return JSON.parse(fs.readFileSync(pathToConfigFile));
}

module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1400,
    viewportHeight: 900,

    setupNodeEvents(on, config) {

      const file = config.env.configFile || "staging";
      const envConfig = getConfigurationByFile(file);
      const envName = (config.env.environment || "staging").toUpperCase();
      const dbConfig = getDbConfig(envName.toLowerCase());

      // Map .env variables to config.env for easy access
      // We read the file manually because standard process.env can truncate at # or % on some systems
      const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

      const getRawEnvValue = (key) => {
        const regex = new RegExp(`^${key}=(.*)$`, 'm');
        const match = envContent.match(regex);
        if (match) {
          return match[1].trim().replace(/^["']|["']$/g, '');
        }
        return process.env[key]; // Fallback to process.env
      };

      const shipmentApiConfig = {
        username: getRawEnvValue(`${envName}_CLICKPOST_SHIPMENT_API_USERNAME`),
        password: getRawEnvValue(`${envName}_CLICKPOST_SHIPMENT_API_PASSWORD`),
        apiKey: getRawEnvValue(`${envName}_CLICKPOST_API_KEY`)
      };

      config.env.shipmentApi = shipmentApiConfig;

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

      return {
        ...config,
        ...envConfig,
        env: {
          ...config.env,
          ...envConfig.env,
        },
      };
    },
  },
});
