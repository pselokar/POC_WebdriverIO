var loginPage = require("../e2e/pageobjects/login.pageobject.js");
const appUtils = require("../common-utils/appUtils.js");

async function ensureConsumeHome() {
    await appUtils.navigateToBaseUrl();
    await loginPage.loginToMcmp();
}

module.exports = {
    ensureConsumeHome : ensureConsumeHome
}

