const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://demoqa.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    video: true,
    chromeWebSecurity: false,
  },
});
