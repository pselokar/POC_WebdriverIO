var loginPage = require("../e2e/pageobjects/login.pageobject.js");
var launchpadPage = require("../e2e/pageobjects/launchpad.pageobject.js");
var launchpadPageJson = require("../testData/launchpadPage.json");
const appUtils = require("../common-utils/appUtils.js");

async function ensureConsumeHome() {
    await appUtils.navigateToBaseUrl();
    await loginPage.loginToMcmp();
}

module.exports = {
    ensureConsumeHome : ensureConsumeHome
}

