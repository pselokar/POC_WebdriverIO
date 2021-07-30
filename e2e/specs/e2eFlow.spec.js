var logGenerator = require("../../common-utils/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var launchpadPage = require("../pageobjects/launchpad.pageobject.js");
var catalogPage = require("../pageobjects/catalog.pageobject.js");
var placeOrderPage = require("../pageobjects/placeOrder.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var catalogPageJson =  require("../../testData/catalogPage.json");
var ec2Json = require("../../testData/Templates/AWS/ec2.json");
var appUtils = require("../../common-utils/appUtils.js");
var orderUtils = require("../../helpers/orderUtils.js");

describe('E2E Tests for MCMP', function(){
    var serviceName = "autoAwsEc2Svc" + appUtils.getRandomString(5);
    var resName = "autoAwsRes" + appUtils.getRandomString(5);
    var secGrpName = "autoAwsSecGrp" + appUtils.getRandomString(5);
    var modifiedParamMap = {};

    beforeAll(async function(){
        modifiedParamMap = { "Service Instance Prefix": serviceName, "Resource Name": resName, "Group Name": secGrpName };
        expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
    });

    it('Go to Catalog page and order a service', async function(){
        await catalogPage.open();
        expect(await catalogPage.getTitleText()).toBe(catalogPageJson.titleText);
        await catalogPage.selectProvider(ec2Json.provider);
        await catalogPage.selectCategory(ec2Json.category);
        await catalogPage.searchTemplate(ec2Json.bluePrintName);
        await catalogPage.clickOnTemplateCard(ec2Json.bluePrintName);
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.catalogDetailsBreadcrumbText);
        expect(await catalogPage.getTemplateTitleText()).toBe(ec2Json.bluePrintName);
        await catalogPage.clickOnConfigureButton();
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.placeOrderBreadcrumbText);
        logger.info("Modified param map: "+ JSON.stringify(modifiedParamMap));
        await orderUtils.fillOrderDetails(ec2Json, modifiedParamMap);
        await placeOrderPage.submitOrder();
    });

});