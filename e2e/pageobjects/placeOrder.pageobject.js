var extend = require("extend");
const appUtils = require("../../common-utils/appUtils");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title",
    nextButtonXpath: "//div/button[contains(text(),'Next')]",
    submitOrderCss: '#primary-btn-review-order'
};

function placeOrderPage(selectorConfig) {
    if (!(this instanceof placeOrderPage)) {
        return new home(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

placeOrderPage.prototype.clickNextButton = async function(){
    const nextBtn = await $(this.nextButtonXpath);
    await nextBtn.waitForClickable({ timeout: 60000 });
    await nextBtn.click();
    console.log("Clicked on next button..");
    await appUtils.waitForLoaderToDisappear();
}

placeOrderPage.prototype.submitOrder = async function(){
    const submitBtn = await $(this.submitOrderCss);
    await submitBtn.waitForClickable({ timeout: 60000 });
    await submitBtn.click();
    console.log("Clicked on Submit order button..");
}

module.exports = new placeOrderPage();