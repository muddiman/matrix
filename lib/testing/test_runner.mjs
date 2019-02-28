//  /lib/testing/test_runner.mjs

/*
                                Title:  ALL FOURS GAME
                                Language: Javascript
                                Programmer: .muddicode 
                                Code: Main Program 

    DESCRIPTION: AUTOMATED TEST RUNNER FOR THE CODE BASE 
    PURPOSE: Ensures new functions does not break the existing code base, protects the code base
*/


/*
        Use Mocha for testing framework
        Use Chai for assertion(testing) functions


log = console.log
expect = require('chai').expect
should = require('chai').should()
*/
// var assert = require('../public/lib/testing/unittest_functions');
/*              Manual Tests            */
// Load allFours.js and unittest_functions.js

// function loadTestFile() {}
// function openTestFile()
// function readTestFile()
/*  imports */
import { assert }           from "/lib/testing/assertion_lib.mjs";
import { describe, it }     from "/lib/testing/testsAPI.mjs";
import { unittest }         from "/lib/testing/unittests.mjs";
import {testFirstJackDeal}  from "/lib/testing/manual_unittests.mjs";
// import {it} from "/lib/testing/unittest_functions.mjs";

/*  globals */
const testFilePath = "/lib/testing/test_runner_config.JSON";

//-------------------------------------------------------------------------------------------------------
                                /*      UTILITIES       */

function loadConfigFile(filePath) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        return JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", filePath, true);
  xhttp.send();
}
/*
function parseJSONTestsFile(JSONfile) {
  let testsObj = JSON.parse(JSONfile);
  return testsObj;
}
*/
function displayFile() {
  let fs = require('fs');
  let rawfile = fs.readFileSync('/lib/testing/test_runner_config.JSON');
  let jsonFile = JSON.parse(rawfile);
  console.log(jsonFile);
}

function saveData() {
  var data = JSON.stringify(dataObj);
  let fs = require('fs');
  fs.writeFile('/lib/newfile.JSON', data, finished);
}

function finished() {
  console.log(`All set.`);
}

//  Test Function
function runTest(testFcn) {
  describe(testFcn, () => {
    it(`should return true`, () => {
      assert.isTrue("value", `The ${testFcn} function passed.`);
    });
  });
}
//-----------------------------------------------------------------------------------------------------
                                /*      AUTOMATED TESTS (entire code base)      */
/*
function testFcnFormat() {
    describe(firstJackDeal);
    it(`should take return a random player`);
    let passFail = assertIsEqual(firstJackDeal, human, `return expected result.`, `did NOT return expected result.`);
    if (passFail === true) {
            console.log(`Success! No Errors in function.`);
    } else {
            console.log(`Errors found in code base! Please check code.`);
    }
}
*/
function runAutomatedTests(testsObj) {
    var testIndex = 0;
    var passedTests = 0;
    var failedTests = 0;
    return (function (testObj) {
          // run through the object of test functions to execute
    for (let test in testsObj) {
      // testIndex++;
      if (testsObj[test] === true) {
        //  runAutomatedTest();
        let ifPassed = false;
        if (ifPassed === true){
          passedTests++;

        } else {

        }
          testString = test;
          testString += "()";
          // turn string into a valid function
          // run funtion
          tests();
          console.log(`${testString} function pass.`);
      } 
  }
    })(testsObj);
}

/*
//      Run Automated Test
function runTestsfile(filePath) {
    let testConfigObj = loadConfigFile(filePath);
    // let testObj  = parseJSONTestsFile(JSONfile);
    runAutomatedTests(testConfigObj);
}
*/

//  const TESTFILE = `/lib/testing/test_runner_config.JSON`;

console.log(`**********************************************************************************`);
console.log(`*                                                                                *`);
console.log(`*                      THE MATRIX                                                *`);
console.log(`*                      JavaScript Automated Test Runner                          *`);
console.log(`*                      Version: 1.0.0                                            *`);
console.log(`*                                                                                *`);
console.log(`**********************************************************************************`);

new Promise(() => {
  //  time-stamp1;
})
.then(() => {
  //  runTestsfile(testFilePath);
  let testConfigObj = loadConfigFile(testFilePath);
  runAutomatedTests(testConfigObj);
})
.then(() => {
  //  time-stamp2;
})
.catch(console.log(err));

//  runtime = time-stamp2 - time-stamp1;  

// results
failedTests = totalNumberOfTests - passedTests;
console.log('-------------------------------------------------------------------------------------------------------');
console.log(`Ran ${totalNumberOfTests} tests in ${runtime/1000} secs.`);
console.log(`Pass: ${passedTests}`);
console.log(`Fail: ${failedTests}`);
if (failedTests === 0) {
    console.log('OK');
} else {
    console.log('Check the code, The following errors were found.');
    console.log(`Error Log:`);
}
