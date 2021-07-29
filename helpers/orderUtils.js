const placeOrderPage =  require("../e2e/pageobjects/placeOrder.pageobject.js");

async function fillOrderDetails(jsonTemplate, modifiedParamMap) {
    var jsonObject = await JSON.parse(JSON.stringify(jsonTemplate));
    var orderParameters = Object.keys(jsonObject["Order Parameters"]);
    var jsonObjectForParameters = await jsonObject["Order Parameters"];
    var sectionNames = Object.keys(orderParameters);
    for(sectionName in sectionNames){
        var webElements = Object.keys(jsonObjectForParameters[orderParameters[sectionName]]);
        var elements = Object.keys(webElements);
        for(webElement in elements){
            var webElementObject = Object.keys(jsonObjectForParameters[orderParameters[sectionName]][webElements[webElement]]);
            var elementType = Object.values(jsonObjectForParameters[orderParameters[sectionName]][webElements[webElement]][webElementObject[0]]).join("");
            var elementID = Object.values(jsonObjectForParameters[orderParameters[sectionName]][webElements[webElement]][webElementObject[1]]).join("");
            var elementValue = Object.values(jsonObjectForParameters[orderParameters[sectionName]][webElements[webElement]][webElementObject[2]]).join("");
            var fieldName = webElements[webElement];
            if (modifiedParamMap != undefined) {
                if (Object.keys(modifiedParamMap).includes(webElements[webElement]))
                    elementValue = modifiedParamMap[webElements[webElement]];
            }
            if (!elementValue == "") {
                if(elementType == "Textbox"){
                    var locator = "#" + elementID;
                    const textbox = await $(locator);
                    await textbox.waitForEnabled({ timeout: 60000 });
                    await textbox.scrollIntoView();
                    await textbox.clearValue().then(async function(){
                        await textbox.setValue(elementValue).then(function(){
                            console.log("Entered " + elementValue + " in " + fieldName + " textbox");
                        });
                    });
                }
                if(elementType == "RadioButton"){
                    var locator = "[for='"+ elementID +"']";
                    const radioButton = await $(locator);
                    await radioButton.waitForEnabled({ timeout: 60000 });
                    await radioButton.scrollIntoView();
                    await radioButton.click().then(function(){
                        console.log("Selected " + elementValue + " radio button for " + fieldName);
                    });
                }
                if(elementType == "DropdownSearch"){
                    var dropdownBtnLoc = "#"+elementID+" button.bx--dropdown-text";
                    const dropdownBtn = await $(dropdownBtnLoc);
                    await dropdownBtn.waitForEnabled({ timeout: 60000 });
                    await dropdownBtn.scrollIntoView();
                    await dropdownBtn.click().then(async function(){
                        console.log("Clicked on "+fieldName+" dropdown button..");
                        var dropdownValueLoc = "//*[@id='"+elementID+"']//li/button[normalize-space()='"+elementValue+"']";
                        const dropdownValue = await $(dropdownValueLoc);
                        await dropdownValue.waitForDisplayed({ timeout: 60000 });
                        await dropdownValue.scrollIntoView();
                        await dropdownValue.click().then(function(){
                            console.log("Selected "+elementValue+" from "+fieldName+" dropdown");
                        });
                    });
                }
                if(elementType == "Dropdown"){
                    var dropdownBtnLoc = "[id='"+elementID+"'] > button";
                    const dropdownBtn = await $(dropdownBtnLoc);
                    await dropdownBtn.waitForEnabled({ timeout: 60000 });
                    await dropdownBtn.scrollIntoView();
                    await dropdownBtn.click().then(async function(){
                        console.log("Clicked on "+fieldName+" dropdown button..");
                        var dropdownValueLoc = "//*[@id='"+elementID+"']//li/button[normalize-space()='"+elementValue+"']";
                        const dropdownValue = await $(dropdownValueLoc);
                        await dropdownValue.waitForDisplayed({ timeout: 60000 });
                        await dropdownValue.scrollIntoView();
                        await dropdownValue.click().then(function(){
                            console.log("Selected "+elementValue+" from "+fieldName+" dropdown");
                        });
                    });
                }
                if(elementType == "TextboxSearch"){
                    var textBoxLoc = "//*[@id='"+elementID+"']//input";
                    const textbox = await $(textBoxLoc);
                    await textbox.waitForEnabled({ timeout: 60000 });
                    await textbox.scrollIntoView();
                    await textbox.clearValue().then(async function(){
                        await textbox.setValue(elementValue).then(async function(){
                            console.log("Searching " + elementValue + " in " + fieldName + " textbox");
                            var searchedOptions = "//*[@id='"+elementID+"']//button[@class='bx--dropdown-link']";
                            // Click first option from the list
                            const searchOption = await $(searchedOptions);
                            await searchOption.waitForDisplayed({ timeout: 60000 });
                            await searchOption.scrollIntoView();
                            searchOption.click().then(function(){
                                console.log("Selected first value from "+fieldName);
                            });
                        });
                    });
                }
            }
        }
        await placeOrderPage.clickNextButton();
    }
}

module.exports = {
    fillOrderDetails: fillOrderDetails
}