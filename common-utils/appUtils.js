
async function navigateToBaseUrl(){
    await browser.url("/");
    await browser.maximizeWindow();
    console.log("Navigated to baseurl..");
    await browser.pause(5000);
}

async function navigateToUrl(url){
    await browser.url("/" + url);
    console.log("Navigated to url: /" + url);
    await browser.pause(5000);
}

module.exports = {
    navigateToBaseUrl : navigateToBaseUrl,
    navigateToUrl : navigateToUrl
}