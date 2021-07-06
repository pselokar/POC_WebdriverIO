var loginPage = require("../pageobjects/login.pageobject.js");
var launchpadPage = require("../pageobjects/launchpad.pageobject.js");
var catalogPage = require("../pageobjects/catalog.pageobject.js");
var ordersPage =  require("../pageobjects/orders.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var catalogPageJson =  require("../../testData/catalogPage.json");
var publicIpAddressJson = require("../../testData/Templates/Azure/publicIPAddress.json");
var ordersPageJson =  require("../../testData/ordersPage.json");
var appUtils = require("../../common-utils/appUtils.js");

describe('E2E Tests for MCMP', function(){
    
    beforeAll(async function(){
        expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
    });

    it('Go to Catalog page and order a service', async function(){
        await catalogPage.open();
        expect(await catalogPage.getTitleText()).toBe(catalogPageJson.titleText);
        await catalogPage.selectProvider(publicIpAddressJson.provider);
        await catalogPage.selectCategory(publicIpAddressJson.category);
        await catalogPage.clickOnTemplateCard(publicIpAddressJson.blueprintName);
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.catalogDetailsBreadcrumbText);
        expect(await catalogPage.getTemplateTitleText()).toBe(publicIpAddressJson.blueprintName);
        await catalogPage.clickOnConfigureButton();
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.placeOrderBreadcrumbText);
        await browser.pause(5000);
    });

});