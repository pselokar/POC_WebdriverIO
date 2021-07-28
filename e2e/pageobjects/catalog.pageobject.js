var extend = require("extend");
var launchpadPage = require("./launchpad.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var appUtils = require("../../common-utils/appUtils.js");

var defaultConfig = {
    titleTextCss: "h1.ibm--page-header__title",
    providerCheckboxesXpath: "//*[@class='bx--checkbox-label-text']/parent::label",
    categoriesListCss: ".category-internal-container a",
    searchInputCss: "#search__input-store-catalog-search-id",
    templateCardTitleCss: ".card-service-title",
    templateCardXpath: "//h4[normalize-space()='{0}']//ancestor::*[@class='bx--tile']",
    templateHeaderTitleTextCss: ".ibm--page-header__title",
    currentBreadcrumbTextCss: ".bx--breadcrumb-item--current",
    configureButtonCss: "#configure-service"
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
    return await titleText.getText().then(function(text){
        console.log("Title text for Catalog page: '"+text.trim()+"'");
        return text.trim();
    });
}

// Select provider from Catalog landing page
catalogPage.prototype.selectProvider = async function(providerName){
    const providerCheckbox = await $(this.providerCheckboxesXpath);
    await providerCheckbox.waitForClickable({ timeout: 60000 });

    const providerCheckboxes = await $$(this.providerCheckboxesXpath);
    return await providerCheckboxes.map(async function(element){
        var text = await element.getText();
        if(text.includes(providerName)){
            await element.waitForClickable({ timeout: 60000 });
            return await element.click().then(function(){
                console.log("Selected provider: '"+providerName+"'");
            });
        }
    });
}

// Select category from Catalog landing page
catalogPage.prototype.selectCategory = async function(categoryName){
    const category = await $(this.categoriesListCss);
    await category.waitForClickable({ timeout: 60000 });

    const categories = await $$(this.categoriesListCss);
    return await categories.map(async function(element){
        var text = await element.getText();
        if(text.includes(categoryName)){
            await element.waitForClickable({ timeout: 60000 });
            return await element.click().then(function(){
                console.log("Selected category: '"+categoryName+"'");
            });
        }
    });
}

// Search the template
catalogPage.prototype.searchTemplate = async function(templateName){
    const searchInput = await $(this.searchInputCss);
    await searchInput.waitForClickable({ timeout: 60000 });

    await searchInput.clearValue();
    await searchInput.setValue(templateName).then(function(){
        console.log("Searched template: '"+templateName+"'");
    });
}

// Click on template card
catalogPage.prototype.clickOnTemplateCard = async function(templateName){
    var self = this;
    const templateCardTitle = await $(this.templateCardTitleCss);
    await templateCardTitle.waitForDisplayed({ timeout: 60000 });
    
    const templateCardTitles = await $$(this.templateCardTitleCss);
    return await templateCardTitles.map(async function(element){
        await element.scrollIntoView();
        var text = await element.getText();
        if(text === templateName){
            const templateCard = await $(self.templateCardXpath.format(text));
            await templateCard.waitForClickable({ timeout: 60000 });
            return await templateCard.click().then(function(){
                console.log("Clicked on template : '"+templateName+"'");
            });
        }
    });
}

// Get Template Title text from Catalog details page
catalogPage.prototype.getTemplateTitleText = async function(){
    const titleText = await $(this.templateHeaderTitleTextCss);
    await titleText.waitForDisplayed({ timeout: 60000 });

    return await titleText.getText().then(function(text){
        console.log("Title text on Catalog Details page: '"+text.trim()+"'");
        return text.trim();
    });
}

// Get Breadcrumb text from Catalog details page
catalogPage.prototype.getCurrentBreadcrumbText = async function(){
    const breadcrumbText = await $(this.currentBreadcrumbTextCss);
    await breadcrumbText.waitForDisplayed({ timeout: 60000 });

    return await breadcrumbText.getText().then(function(text){
        console.log("Current Breadcrumb text on Catalog Details page: '"+text.trim()+"'");
        return text.trim();
    });
}

// Clicked on configure template button
catalogPage.prototype.clickOnConfigureButton = async function(){
    const configureBtn = await $(this.configureButtonCss);
    await configureBtn.waitForClickable({ timeout: 60000 });

    return await configureBtn.click().then(function(){
        console.log("Clicked on configure button..");
    });
}

module.exports = new catalogPage();