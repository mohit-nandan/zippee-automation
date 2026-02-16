const { defineConfig } = require("cypress");
const fs = require("fs");

function getConfigurationByFile(file) {
  const pathToConfigFile = `config/${file}.json`;
  return JSON.parse(fs.readFileSync(pathToConfigFile));
}

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",

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
