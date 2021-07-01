var loginPage = require("../e2e/pageobjects/login.pageobject.js");
var launchpadPage = require("../e2e/pageobjects/launchpad.pageobject.js");
var launchpadPageJson = require("../testData/launchpadPage.json");

async function ensureConsumeHome() {
    await loginPage.navigateToBaseUrl();
    await loginPage.loginToMcmp();
    expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
}

module.exports = {
    ensureConsumeHome : ensureConsumeHome
}

