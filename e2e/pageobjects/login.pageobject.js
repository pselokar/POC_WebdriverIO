var extend = require("extend");
var loginTestJson = require("../../testData/loginTest.json");

var defaultConfig = {
    usernameCss: "#username",
    passwordCss: "#password",
    continueBtnCss: "#continue-button",
    loginBtnCss: "#signinbutton",
    privacyAcceptBtnCss: "#privacy-accept"
};

function loginPage(selectorConfig) {
    if (!(this instanceof loginPage)) {
        return new home(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

loginPage.prototype.navigateToBaseUrl = async function(){
    await browser.url("/");
    await browser.maximizeWindow();
    console.log("Navigated to baseurl..");
    await browser.pause(5000);
}

loginPage.prototype.loginToMcmp = async function () {
    const username = await $(this.usernameCss);
    await username.waitForEnabled({ timeout: 5000 });
    await username.setValue(loginTestJson.username);
    console.log("Entered username: "+loginTestJson.username);
    const continueBtn = await $(this.continueBtnCss);
    await continueBtn.waitForClickable({ timeout: 5000 });
    await continueBtn.click();
    console.log("Clicked on continue button..");
    const password = await $(this.passwordCss);
    await password.waitForEnabled({ timeout: 5000 });
    await password.setValue(loginTestJson.password);
    console.log("Entered password..");
    const loginBtn = await $(this.loginBtnCss);
    await loginBtn.waitForClickable({ timeout: 5000 });
    await loginBtn.click();
    console.log("Clicked on login button..");
    const privacyAcceptBtn = await $(this.privacyAcceptBtnCss);
    await privacyAcceptBtn.waitForClickable({ timeout: 30000 });
    await privacyAcceptBtn.click();
    console.log('Clicked on "Privacy: I accept" button');
};

module.exports = new loginPage();
