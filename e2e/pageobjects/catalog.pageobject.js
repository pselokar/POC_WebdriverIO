var extend = require("extend");
var launchpadPage = require("./launchpad.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var appUtils = require("../../common-utils/appUtils.js");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title",
    providerCheckboxesXpath: "//*[@class='bx--checkbox-label-text']/parent::label"
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

// Select provider from Catalog landing page
catalogPage.prototype.selectProvider = async function(provider){
    const providerCheckbox = await $(this.providerCheckboxesXpath);
    await providerCheckbox.waitForClickable({ timeout: 60000 });

    const providerCheckboxes = await $$(this.providerCheckboxesXpath);
    var array = [];
    await providerCheckboxes.map(async function(element){
        var text = await element.getText();
        console.log("Comparing '"+text+"' with '"+provider+"'")
        if(text.includes(provider)){
            await element.click();
            console.log("Selected provider: '"+provider+"'");
            await browser.pause(5000);
        }
    });
}

module.exports = new catalogPage();