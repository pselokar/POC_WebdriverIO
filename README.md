# WebdriverIO UI Automation Framework
Repository for WebdriverIO UI test automation POC. <br>

## Install Dependencies:
1. Install **NodeJS** at least **```v12.16.1```** or higher, as this is the oldest active LTS version <br>
2. **npm** will get installed with NodeJS installation only <br>
3. Install the following package <br>
    **webdriverio** - Webdriver package to run tests. **```npm i --save-dev webdriverio```** <br>
    **@wdio-cli** - Webdriverio Client package to run configure other wdio packages. **```npm i --save-dev @wdio/cli```** <br>
    **@wdio/local-runner** - To run tests on local machine. **```npm i @wdio/local-runner```** <br>
    **@wdio/selenium-standalone-service** - To run tests on selenium wedriver service. **```npm i @wdio/selenium-standalone-service```** <br>
    **@wdio/spec-reporter** - To generate spec report. **```npm i @wdio/spec-reporter```** <br>
    **@wdio/jasmine-framework** - To write tests in jasmine test framework. **```npm i @wdio/jasmine-framework```** <br>
    **@wdio/allure-reporter** - To generate allure report. **```npm i @wdio/allure-reporter```** <br>
    **@wdio/junit-reporter** - To generate HTML/XML junit report. **```npm i @wdio/junit-reporter```** <br>
    **local-runner** - Dependent package to run tests on local machine. **```npm i local-runner```** <br>
    **request** - To make api calls. **```npm i request```** <br>
    **request-promise** - To make api calls. **```npm i request-promise```** <br>
    **wdio-slack-service** - To integrate with slack. **```npm i wdio-slack-service```** <br>
    **allure-commandline** - To generate and open allure report. **```npm i allure-commandline```** <br>
    **extend** - To use singleton design pattern. **```npm i extend```** <br>
    **fs** - To handle file manipulations. **```npm i fs```** <br>
    **log4js** - To generate log file for each run. **```npm i log4js```** <br>
    **wdio-video-reporter** - To generate video recording for failed tests. **```npm i wdio-video-reporter```** <br>
    **xml2js** - To convert xml object to json object. **```npm i xml2js```** <br>
4. Run ```npm list``` to make sure you can find all the above mention listed as a package. <br>
5. **NOTE: Instead of installing each of the above packages one by one, simply run ```npm i``` from root folder of repository.** <br>

## Understanding of Framework Folder structure:
1. **e2e/specs** - To add all spec/test files to run. <br>
2. **e2e/pageobjects** - To add all pageobject files respective to each application page. <br>
3. **testData** - To add test data JSON files which will be used in spec files as input and output. <br>
4. **helpers** - To add helper functionality like fillOrderDetails(), onPrepare(), etc. <br>
5. **common-utils** - To add common utilities across the framework like logGenerator, common application utilities. <br>
6. **node-modules** - Contains all installed npm packages bin files. <br>
7. **wdio-logs** - After complete test execution, server & console logs and step screenshots and video recording for failed tests will be generated here. <br>
8. **reports** - After complete test execution, junit xml file be generated here. <br>
9. **allure-report** - After complete test execution, files to render allure report will be generated here. <br>
11. **wdio.conf.js** - This is a TestRunner file; Starting point for each execution. <br>
12. **log4js.json** - To add the configurations for generating application log files after tests execution. <br>
13. **package.json** - To add and maintain the dependencies to run all the tests <br>

## Adding new tests
1. Add new js file in **```e2e/specs```** folder with the name end with **.spec.js**. <br>
2. Write tests for desired feature in above spec file. <br>
3. To add new pageobject for new page in the application, add new js file in **```e2e/pageobjects```** folder with the name end with **.pageobject.js**. <br>
4. To add new json file, to use in your tests, add new json file in **```testData/```** folder. <br>
5. To add new helper utilities, add new js file in **```helpers/```** folder. <br>
6. To add new common utilities, add new js file in **```common-utils/```** folder. <br>
7. To make any changes in configuration of services, check the different options provided in **```wdio.conf.js```**. <br>

## Running the tests
1. Open terminal and go to root folder of this repository. <br>
2. Open this repo in any editor of your choice. <br>
3. Go to **wdio.conf.js** and edit following things: <br>
    1. **specs** --> Specify the path of the spec file you want to run. <br>
    2. **baseUrl** --> Specify the baseurl for your application. <br>
    3. **capabilities** --> Specify the browser and its other options [optional]. <br>
4. Go to terminal and run command **```npx wdio```** or **```npx wdio run ./wdio.conf.js```**. <br>
