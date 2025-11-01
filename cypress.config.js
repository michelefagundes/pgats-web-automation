const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("./webpack.config.js"),
      };
      on("file:preprocessor", webpack(options));
    },
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
  },
});
