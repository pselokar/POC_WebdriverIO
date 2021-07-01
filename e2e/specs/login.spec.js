var loginPage = require("../pageobjects/login.pageobject.js");
var launchpadPage = require("../pageobjects/launchpad.pageobject.js");
var catalogPage = require("../pageobjects/catalog.pageobject.js");
var ordersPage =  require("../pageobjects/orders.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var catalogPageJson =  require("../../testData/catalogPage.json");
var ordersPageJson =  require("../../testData/ordersPage.json");
var appUtils = require("../../common-utils/appUtils.js");

describe('Sanity Tests for MCMP', function(){
    
    beforeAll(function(){
        expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
    });

    it('Go to Catalog page', async function(){
        await catalogPage.open();
        expect(await catalogPage.getTitleText()).toBe(catalogPageJson.titleText);
    });

    it('Go to Approve orders page', async function(){
        await ordersPage.open();
        expect(await ordersPage.getTitleText()).toBe(ordersPageJson.titleText);
    });

})