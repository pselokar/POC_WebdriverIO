var logGenerator = require("../../common-utils/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var extend = require("extend");
var launchpadPage = require("./launchpad.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var appUtils = require("../../common-utils/appUtils.js");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title",
    searchOrderInputCss: "#search__input-orders-search",
    noOrdersFoundTextCss: ".bx--inline-notification__subtitle span",
    ordersRowIdCss: ".order-items a",
    approverOrderBtnCss: "#order_approve_button",
    technicalApprovalCheckboxCss: "label[for='checkbox-technical']",
    financialApprovalCheckboxCss: "label[for='checkbox-financial']",
    approveOrderDialogueBtnCss: "#order_details_approval_approve",
    okDialogueBtnCss: "#order_details_approval_ok",
    approvalProcessesTextCss: "#approve-success-body"
};

function ordersPage(selectorConfig) {
    if (!(this instanceof ordersPage)) {
        return new home(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

// Open Approve orders page
ordersPage.prototype.open = async function(){
    await launchpadPage.clickOnHambergerButton();
    await launchpadPage.checkLeftNavButtonStatus(launchpadPageJson.enterpriseMarketplaceButtonLabel);
    await launchpadPage.clickLeftNavLink(launchpadPageJson.approveOrdersLinkLabel);
}

// Get title text for Approve orders page
ordersPage.prototype.getTitleText = async function(){
    await appUtils.switchToFrameById("mcmp-iframe");
    const titleText = await $(this.titleTextCss);
    await titleText.waitForDisplayed({ timeout: 30000 });
    let text = await titleText.getText();
    logger.info("Title text for Approve Orders page: "+text.trim());
    return text.trim();
}

ordersPage.prototype.searchOrder = async function(orderNumber){
    const searchInput = await $(this.searchOrderInputCss);
    await searchInput.waitForEnabled({ timeout: 60000 });
    if(orderNumber !== ""){
        await searchInput.clearValue();
        return await searchInput.setValue(orderNumber).then(async function(){
            logger.info("Searched order: '"+orderNumber+"'");
            return true;
        });
    }
    else{
        logger.info("Order number is empty..");
        return false;
    }
}

ordersPage.prototype.getOrderIdFromRow = async function(){
    const orderId = await $(this.ordersRowIdCss);
    await orderId.waitForDisplayed({timeout: 60000});
    browser.pause(3000);
    return await orderId.getText().then(function(text){
        logger.info("Order ID from row is: "+text);
        return text.trim();
    });
}

ordersPage.prototype.clickOnApproveOrderBtn = async function(){
    const approveBtn = await $(this.approverOrderBtnCss);
    await approveBtn.waitForClickable({ timeout: 60000 });
    browser.pause(3000);
    await approveBtn.click();
    logger.info("Clicked on approve order button..");
}

ordersPage.prototype.checkTechnicalApproval = async function(){
    const techAppCheckBox = await $(this.technicalApprovalCheckboxCss);
    await techAppCheckBox.waitForClickable({ timeout: 60000 });
    browser.pause(3000);
    await techAppCheckBox.click();
    logger.info("Selected technical approval checkbox..");
}

ordersPage.prototype.checkFinancialApproval = async function(){
    const finAppCheckBox = await $(this.financialApprovalCheckboxCss);
    await finAppCheckBox.waitForClickable({ timeout: 60000 });
    browser.pause(3000);
    await finAppCheckBox.click();
    logger.info("Selected financial approval checkbox..");
}

ordersPage.prototype.clickOnApproveOrderDialogueBtn = async function(){
    const approveBtn = await $(this.approveOrderDialogueBtnCss);
    await approveBtn.waitForClickable({ timeout: 60000 });
    browser.pause(3000);
    await approveBtn.click();
    logger.info("Clicked on approve order dialogue button..");
}

ordersPage.prototype.getApprovalSuccessText = async function(){
    const approveSuccessText = await $(this.approvalProcessesTextCss);
    await approveSuccessText.waitForDisplayed({timeout: 60000});
    browser.pause(3000);
    return await approveSuccessText.getText().then(function(text){
        logger.info("Approve success text is : "+text);
        return text.trim();
    });
}

ordersPage.prototype.clickOnOkDialogueBtn = async function(){
    const okBtn = await $(this.okDialogueBtnCss);
    await okBtn.waitForClickable({ timeout: 60000 });
    browser.pause(3000);
    await okBtn.click();
    logger.info("Clicked on OK dialogue button..");
}

module.exports = new ordersPage();