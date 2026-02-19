const { defineConfig } = require("cypress");
const fs = require("fs");

function getConfigurationByFile(file) {
  const pathToConfigFile = `cypress/config/${file}.json`;
  return JSON.parse(fs.readFileSync(pathToConfigFile));
}

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1400,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "staging";

      const envConfig = getConfigurationByFile(file);

      return {
        ...config,
        ...envConfig,
      };
    },
  },
});
