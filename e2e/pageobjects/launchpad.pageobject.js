var extend = require("extend");

var defaultConfig = {
    mcmpHeaderTitleTextCss: ".bx--header__name__title",
    hamburgerMenuBtnCss: "ibm-hamburger button",
    leftNavButtonsTextCss: ".bx--side-nav__submenu-title",
    leftNavLinksCss: ".bx--side-nav__link"
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

launchpadPage.prototype.getMCMPHeaderTitle = async function(){
    const mcmpHeaderTitle = await $(this.mcmpHeaderTitleTextCss);
    await mcmpHeaderTitle.waitForEnabled({ timeout: 10000 });
    var headerText = await mcmpHeaderTitle.getText();
    console.log("MCMP Header text is: " + headerText);
    return headerText;
}

launchpadPage.prototype.clickOnHambergerButton = async function(){
    const hambergerBtn = await $(this.hamburgerMenuBtnCss);
    await hambergerBtn.waitForClickable({ timeout: 10000 });
    await hambergerBtn.click();
    console.log("Clicked on hamberger menu button..");
}

launchpadPage.prototype.getListOfLeftNavButtonsText = async function(){
    var textArray = [];
    const leftNavBtns = await $$(this.leftNavButtonsTextCss);
    await leftNavBtns[0].waitForClickable({ timeout: 10000 });
    await leftNavBtns.filter(async element => {
        var buttonText = await element.getText();
        console.log("Button Text: "+buttonText);
        textArray.push(buttonText);
    });
    return textArray;
}

launchpadPage.prototype.clickLeftNavButton = async function(leftNavBtnText){
    const leftNavBtns = await $$(this.leftNavButtonsTextCss);
    await leftNavBtns[0].waitForClickable({ timeout: 10000 });

    await this.getListOfLeftNavButtonsText().then(function(buttonTextArray){
        console.log("Buttons text array: "+buttonTextArray);
    });
    for(var i=0; i<buttonTextArray.length; i++){
        console.log("Comparing '" + buttonTextArray[i] + "' with "+leftNavBtnText);
        if(buttonTextArray[i] == leftNavBtnText){
            await leftNavBtns[i].click();
            console.log("Clicked on "+leftNavBtnText+" left navigation button..");
            return;
        }
    }
}

launchpadPage.prototype.clickLeftNavLink = async function(leftNavLinkText){
    const leftNavLinks = await $$(this.leftNavLinksCss);
    await leftNavLinks[0].waitForClickable({ timeout: 10000 });
    await leftNavLinks.every(async element => {
        linkText = await element.getText();
        console.log("Comparing '" + linkText + "' with "+leftNavLinkText);
        if(linkText.includes(leftNavLinkText)){
            await element.click();
            console.log("Clicked on "+leftNavLinkText+" left navigation button..");
            return false;
        }
        return true;
    });
}

module.exports = new launchpadPage();