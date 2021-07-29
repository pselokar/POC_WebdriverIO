var logGenerator = require("../../common-utils/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var extend = require("extend");
var appUtils = require("../../common-utils/appUtils");

var defaultConfig = {
    mcmpHeaderTitleTextCss: ".bx--header__name__title",
    hamburgerMenuBtnCss: "ibm-hamburger button",
    leafNavBtnsSectionCss: ".bx--side-nav__items",
    leftNavButtonsCss: ".bx--side-nav__submenu",
    leftNavBtnTextXpath: "//*[@class='bx--side-nav__submenu']//*[text()='{0}']",
    leftNavBtnXpath: "//*[@class='bx--side-nav__submenu-title' and text()='{0}']/parent::button",
    leftNavLinksCss: ".bx--side-nav__link",
    leftNavLinkTextXpath: "//*[@class='bx--side-nav__link']//*[contains(text(),'{0}')]"
};

function launchpadPage(selectorConfig) {
    if (!(this instanceof launchpadPage)) {
        return new home(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

// Get MCMP Launchpad page Title text
launchpadPage.prototype.getMCMPHeaderTitle = async function(){
    const mcmpHeaderTitle = await $(this.mcmpHeaderTitleTextCss);
    await mcmpHeaderTitle.waitForEnabled({ timeout: 10000 });
    var headerText = await mcmpHeaderTitle.getText();
    logger.info("MCMP Header text is: " + headerText);
    return headerText;
}

// Click on hamberger menu button
launchpadPage.prototype.clickOnHambergerButton = async function(){
    await appUtils.switchToDefaultContent();
    const hambergerBtn = await $(this.hamburgerMenuBtnCss);
    await hambergerBtn.waitForClickable({ timeout: 30000 });
    await hambergerBtn.click();
    logger.info("Clicked on hamberger menu button..");
}

// Check if Left navigation button is expanded or not
launchpadPage.prototype.checkLeftNavButtonStatus = async function(leftNavBtnText){
    await this.clickLeftNavButton(leftNavBtnText);
    const leftNavBtn = await $(this.leftNavBtnXpath.format(leftNavBtnText));
    await leftNavBtn.waitForEnabled({ timeout: 10000 });
    let status = await leftNavBtn.getAttribute('aria-expanded');
    if(status == "true"){
        logger.info("'"+leftNavBtnText+"' button already expanded");
    }
    else{
        await this.clickLeftNavButton(leftNavBtnText);
    }
}

// Click on Left navigation button
launchpadPage.prototype.clickLeftNavButton = async function(leftNavBtnText){
    const leftNavBtns = await $(this.leftNavButtonsCss);
    await leftNavBtns.waitForClickable({ timeout: 10000 });
    const leftNavBtn = await this.leftNavBtnTextXpath.format(leftNavBtnText);
    const leftNavBtnXpath = await $(leftNavBtn);
    await leftNavBtnXpath.waitForClickable({ timeout: 10000 });
    await leftNavBtnXpath.click();
    logger.info("Clicked on '"+leftNavBtnText+"' left navigation button..");
}

// Click on Left navigation link
launchpadPage.prototype.clickLeftNavLink = async function(leftNavLinkText){
    const leftNavLinks = await $(this.leftNavLinksCss);
    await leftNavLinks.waitForClickable({ timeout: 10000 });
    const leftNavLink = await this.leftNavLinkTextXpath.format(leftNavLinkText);
    const leftNavLinkXpath = await $(leftNavLink);
    await leftNavLinkXpath.waitForClickable({ timeout: 10000 });
    await leftNavLinkXpath.click();
    logger.info("Clicked on '"+leftNavLinkText+"' left navigation link..");
}

module.exports = new launchpadPage();