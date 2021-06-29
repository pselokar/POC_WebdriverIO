var extend = require("extend");
var launchpadPage = require("./launchpad.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var appUtils = require("../../common-utils/appUtils.js");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title"
};

function catalogPage(selectorConfig) {
    if (!(this instanceof catalogPage)) {
        return new home(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

// Open catalog page
catalogPage.prototype.open = async function(){
    await launchpadPage.clickOnHambergerButton();
    await launchpadPage.checkLeftNavButtonStatus(launchpadPageJson.enterpriseMarketplaceButtonLabel);
    await launchpadPage.clickLeftNavLink(launchpadPageJson.catalogLinkLabel);
}

// Get title text for Catalog page
catalogPage.prototype.getTitleText = async function(){
    await appUtils.switchToFrameById("mcmp-iframe");
    const titleText = await $(this.titleTextCss);
    await titleText.waitForDisplayed({ timeout: 30000 });
    let text = await titleText.getText();
    console.log("Title text for Catalog page: "+text.trim());
    return text.trim();
}

module.exports = new catalogPage();