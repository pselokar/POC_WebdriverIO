var launchpadPage = require("../pageobjects/launchpad.pageobject.js");
var catalogPage = require("../pageobjects/catalog.pageobject.js");
var placeOrderPage = require("../pageobjects/placeOrder.pageobject.js");
var ordersPage =  require("../pageobjects/orders.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var catalogPageJson =  require("../../testData/catalogPage.json");
var ec2Json = require("../../testData/Templates/AWS/ec2.json");
var ordersPageJson =  require("../../testData/ordersPage.json");
var appUtils = require("../../common-utils/appUtils.js");
var orderUtils = require("../../helpers/orderUtils.js");

describe('E2E Tests for MCMP', function(){
    var serviceName = "autoAwsEc2Svc" + appUtils.getRandomString(5);
    var resName = "autoAwsRes" + appUtils.getRandomString(5);
    var secGrpName = "autoAwsSecGrp" + appUtils.getRandomString(5);
    var modifiedParamMap = {};
    var mainParams = ec2Json["Order Parameters"]["Main Parameters"];
    var orderNumber = "";

    beforeAll(async function(){
        modifiedParamMap = { "Service Instance Prefix": serviceName, "Resource Name": resName, "Group Name": secGrpName };
        expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
    });

    it('Go to Catalog page and order a service', async function(){
        await catalogPage.open();
        // Validate title of Catalog page
        expect(await catalogPage.getTitleText()).toBe(catalogPageJson.titleText);
        await catalogPage.selectProvider(ec2Json.provider);
        await catalogPage.selectCategory(ec2Json.category);
        await catalogPage.searchTemplate(ec2Json.bluePrintName);
        await catalogPage.clickOnTemplateCard(ec2Json.bluePrintName);
        // Validate Catalog details page info
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.catalogDetailsBreadcrumbText);
        expect(await catalogPage.getTemplateTitleText()).toBe(ec2Json.bluePrintName);
        expect(await placeOrderPage.getDetailsPagePrice()).toBe(ec2Json.startingPrice);
        await catalogPage.clickOnConfigureButton();
        // Validate breadcrumb text
        expect(await catalogPage.getCurrentBreadcrumbText()).toBe(catalogPageJson.placeOrderBreadcrumbText);
        await orderUtils.fillOrderDetails(ec2Json, modifiedParamMap);
        // Validate Main params from review page
        expect(await placeOrderPage.getValueForServiceDetailsLabel(ec2Json.serviceInstancePrefixLabel)).toBe(serviceName);
        expect(await placeOrderPage.getValueForServiceDetailsLabel(ec2Json.teamLabel)).toBe(mainParams.Team.value);
        expect(await placeOrderPage.getValueForServiceDetailsLabel(ec2Json.providerAccLabel)).toBe(mainParams["Provider Account"].value);
        // Validate total monthly cost from review page
        expect(await placeOrderPage.getTotalMonthlyCost()).toBe(ec2Json.totalMonthlyCost);
        // Submit order
        await placeOrderPage.submitOrder();
        // Get order ID
        orderNumber = await placeOrderPage.getOrderId();
        await placeOrderPage.clickOnGotoServiceCatalogBtn();
    });

    it('Approve the Order', async function(){
        await ordersPage.open();
        // Validate title of Approve Orders page
        expect(await ordersPage.getTitleText()).toBe(ordersPageJson.titleText);
        // Search order ID
        var status = await ordersPage.searchOrder(orderNumber);
        if(status){
            expect(await ordersPage.getOrderIdFromRow()).toContain(orderNumber);
            // Approve the order
            await ordersPage.clickOnApproveOrderBtn();
            await ordersPage.checkTechnicalApproval();
            await ordersPage.checkFinancialApproval();
            await ordersPage.clickOnApproveOrderDialogueBtn();
            // Validate approval success message
            expect(await ordersPage.getApprovalSuccessText()).toBe(ec2Json.approvalProcessedMsg);
            await ordersPage.clickOnOkDialogueBtn();
        }
    });

});