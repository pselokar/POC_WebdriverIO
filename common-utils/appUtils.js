
// Navigate to Base URL
async function navigateToBaseUrl(){
    await browser.url("/");
    await browser.maximizeWindow();
    console.log("Navigated to baseurl..");
    // await browser.pause(5000);
}

// Navigate to Specific URL
async function navigateToUrl(url){
    await browser.url("/" + url);
    console.log("Navigated to url: /" + url);
    await browser.pause(5000);
}

// Format string for dynamic locators
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
}

// Switch to iframe/frame using id
async function switchToFrameById(frameId){
    const frameLoc = await $("#"+frameId);
    await browser.switchToFrame(frameLoc);
    console.log("Switched to iframe/frame: "+frameId);
}

// Switch to default content
async function switchToDefaultContent(){
    browser.switchToFrame(null);
    console.log("Switched to Default content");
}

module.exports = {
    navigateToBaseUrl : navigateToBaseUrl,
    navigateToUrl : navigateToUrl,
    switchToFrameById: switchToFrameById,
    switchToDefaultContent: switchToDefaultContent
}