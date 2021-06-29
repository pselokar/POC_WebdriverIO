var extend = require("extend");
var launchpadPage = require("./launchpad.pageobject.js");

var defaultConfig = {
    mcmpHeaderTitleCss: ".bx--header__name__title",
    hamburgerMenuBtnCss: "ibm-hamburger button",
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

catalogPage.prototype.open = async function(){
    await launchpadPage.clickOnHambergerButton();
    await launchpadPage.clickLeftNavButton("Enterprise Marketplace");
    await launchpadPage.clickLeftNavLink("Catalog");
}

module.exports = new catalogPage();