var httpRequest = require('request-promise');
const fs = require('fs');
var xml2js = require('xml2js');

global.setSuiteName = function(suiteName){
    return new Promise((resolve)=>{
        var parser = new xml2js.Parser();
        // Read XML file
        fs.readFile('./reports/results.xml', function(err, data) {
            if (err) {
                throw err;
            }
            // Convert XML data to JSON object
            parser.parseString(data, function (err, result) {
                if (err) {
                    throw err;
                }

                var lenSuite = result.testsuites.testsuite.length;
                // Replace all testsuite 'name' attribute
                for(var j=0; j<lenSuite; j++){
                    result.testsuites.testsuite[j].$.name = suiteName
                }

                // Convert JSON object to XML
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);

                // Overide updated XML string to a file
                fs.writeFile('./reports/results.xml', xml, function(err){
                    if (err) {
                        throw err;
                    }
                    console.log('Updated XML..');
                    resolve(true);
                });
            });
        });
    });
}


global.postToSlack = function (){
    return new Promise((resolve,reject)=>{
            var parser = new xml2js.Parser();

            console.log("Initiating consolidation of test results....");
            fs.readFile('./reports/results.xml', function(err, data) {
                parser.parseString(data, function (err, result) {
                    var testExecutiontitle = "WebdriverIO Automation Test results:\n Environment URL: "
                    console.log("WebdriverIO Automation Test results:\n URL: ");
                    var lenSuite = result.testsuites.testsuite.length;
                    console.log("Total Test Suite Count: "+ lenSuite);
                    var finalTestSuiteSummaryToPost = "Feature-wise Summary:\n";
                    var totalPassed = 0;
                    var totalFailed = 0;
                    var totalSkipped = 0;
                    for(var j=0; j<lenSuite; j++){
                        var testSuiteName = result.testsuites.testsuite[j].testcase[0].$.classname
                        var testSuiteSummary = testSuiteName;
                        var totalTestCase = result.testsuites.testsuite[j].testcase.length;
                        var failed = 0;
                        var passed = 0;
                        var skipped = 0;
                        for (var i=0; i<totalTestCase; i++){
                            if((result.testsuites.testsuite[j].testcase[i].failure)){
                                failed = Number(failed) + 1;

                            }
                            else if((result.testsuites.testsuite[j].testcase[i].skipped)){
                                skipped = Number(skipped) + 1;
                                
                            }
                            else {
                                passed = Number(passed) + 1;
                            }
                        }
                        totalFailed = totalFailed+failed;
                        totalPassed = totalPassed+passed;
                        totalSkipped = totalSkipped+skipped;
                        
                         testSuiteSummary = testSuiteSummary +"   -  "+"_Passed: "+passed.toString()+"_"+"`Failed: "+failed.toString()+"` "+"_Skipped: "+skipped.toString()+"_"+
                        "\n";
                        
                         finalTestSuiteSummaryToPost = finalTestSuiteSummaryToPost + testSuiteSummary;
                    }
                    var totalCount=totalFailed+totalPassed+totalSkipped;
                    var body = "testExecutiontitle \ntotalCount \ntotalPassed \ntotalFailed \ntotalSkipped \nfinalTestSuiteSummaryToPost";
                    

                    body = body.replace("testExecutiontitle", testExecutiontitle.toString()+"\n");
                    body = body.replace("totalCount", "Total TestCases Executed : " +totalCount.toString());
                    body = body.replace("totalPassed", "Passed : " +totalPassed.toString());
                    body = body.replace("totalFailed", "Failed : " +totalFailed.toString());
                    body = body.replace("totalSkipped", "Skipped : " +totalSkipped.toString()+"\n");
                    body = body.replace("finalTestSuiteSummaryToPost", finalTestSuiteSummaryToPost.toString()+"\n");
                    
                    


                    console.log("Test Summary: \n"+body)

                    console.log('Posting test summary to slack....');

                    var reqOptions={
                        method: 'POST',
                        //url:"https://hooks.slack.com/services/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",
                        body:{"text": body
                        },
                        json:true
                    };

                    httpRequest(reqOptions).then( function(httpResponse) {
                        console.log('Response after posting to slack: \n' + httpResponse.toString());
                        resolve(httpResponse.toString());
                    })
                    .catch(function (err) {
                        console.error('Error during posting to slack: \n'+err.toString());
                        reject(err);
                        return;
                    });
                });

            });
    });
};


module.exports = {
    postToSlack : postToSlack,
    setSuiteName:setSuiteName
};



