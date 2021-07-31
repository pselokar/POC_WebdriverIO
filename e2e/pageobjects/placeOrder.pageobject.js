var logGenerator = require("../../common-utils/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var extend = require("extend");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title",
    nextButtonXpath: "//div/button[contains(text(),'Next')]",
    submitOrderCss: '#primary-btn-review-order',
    startingAtPriceCss: ".details-price strong",
    serviceDetailsValuesXpath: "//*[@class='mainParams-configs']//span[normalize-space()='{0}']/following-sibling::span",
    totalMonthlyCostCss: ".bx--side-nav__item--total span:nth-child(2) strong",
    orderIdCss: "#order-number",
    gotoSrvcCatalogBtnCss: "#order-submitted-modal_carbon-button"
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
    logger.info("Clicked on next button..");
    await browser.pause(5000);
}

placeOrderPage.prototype.submitOrder = async function(){
    const submitBtn = await $(this.submitOrderCss);
    await submitBtn.waitForClickable({ timeout: 60000 });
    await submitBtn.click();
    logger.info("Clicked on Submit order button..");
}

placeOrderPage.prototype.getDetailsPagePrice = async function(){
    const priceText = await $(this.startingAtPriceCss);
    await priceText.waitForDisplayed({ timeout: 60000 });
    return await priceText.getText().then(function(text){
        logger.info("Starting at price on details page: '"+text.trim()+"'");
        return text.trim();
    });
}

placeOrderPage.prototype.getValueForServiceDetailsLabel = async function(label){
    const serviceDetailsValue = await $(this.serviceDetailsValuesXpath.format(label));
    await serviceDetailsValue.waitForDisplayed({timeout: 60000});
    return await serviceDetailsValue.getText().then(function(text){
        logger.info("Service details value for label '"+label+"' is: "+text);
        return text.trim();
    });
}

placeOrderPage.prototype.getTotalMonthlyCost = async function(){
    const totalMonthlyCost = await $(this.totalMonthlyCostCss);
    await totalMonthlyCost.waitForDisplayed({timeout: 60000});
    return await totalMonthlyCost.getText().then(function(text){
        logger.info("Total monthly cost is: "+text);
        return text.trim();
    });
}

placeOrderPage.prototype.getOrderId = async function(){
    const orderId = await $(this.orderIdCss);
    await orderId.waitForDisplayed({timeout: 60000});
    return await orderId.getText().then(function(text){
        logger.info("Order ID is: "+text);
        return text.trim();
    });
}

placeOrderPage.prototype.clickOnGotoServiceCatalogBtn = async function(){
    const gotoSrvcCatalogBtn = await $(this.gotoSrvcCatalogBtnCss);
    await gotoSrvcCatalogBtn.waitForClickable({ timeout: 60000 });
    await gotoSrvcCatalogBtn.click();
    logger.info("Clicked on Goto Service Catalog button..");
    browser.pause(5000);
}

module.exports = new placeOrderPage();