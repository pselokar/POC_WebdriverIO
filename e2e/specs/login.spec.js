var loginPage = require("../pageobjects/login.pageobject.js");
var launchpadPage = require("../pageobjects/launchpad.pageobject.js");
var catalogPage = require("../pageobjects/catalog.pageobject.js");
var launchpadPageJson = require("../../testData/launchpadPage.json");
var appUtils = require("../../common-utils/appUtils.js");

describe('Sanity Tests for MCMP', function(){
    
    // beforeAll(function(){
    //     appUtils.navigateToBaseUrl();
    // });

    // it('Login to MCMP', async function(){
    //     await loginPage.loginToMcmp();
    //     expect(await launchpadPage.getMCMPHeaderTitle()).toBe(launchpadPageJson.mcmpHeaderText);
    // });

    it('Go to Catalog page', async function(){
        await catalogPage.open();
    });

})