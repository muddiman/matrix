//  file:   unittest.mjs
//  path:   /lib/testing/unittest.mjs

/*
*               JAVASCRIPT TESTING SUITE
*                Function Unit Tests
*                (the Matrix  ver.: 2.0.1)
*               Roger A. Clarke (.Muddicode)
*
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              Asset Management Module Tests (filehandler.mjs)

import { assert } from "/lib/testing/assertion_lib.mjs";
import { AssetManager } from "/lib/filehandler.mjs";
import { describe, it } from "/lib/testing/testsAPI.mjs";

/*  the globals */
const hrAsterisk = `**************************************************************************************************************************************************************` ;
const hrDash     = `--------------------------------------------------------------------------------------------------------------------------------------------------------------` ;
const hrEqual    = `==============================================================================================================================================================` ;
const heading    = `Asset Management Tests:`;
//  solution object
const solnObj = {
    characters : [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "$", "#", "%", "^", "&", "*", "(", ")", "-", "=", "+", "{", "?", ">" ]
};

var testNumber, testFunction, result;
var totalNumberOfTests=0;
//  data object
var data = {
    raw : null,
    JSON : null,
    Arr : null,
    integer : null,
    obj : null
};
//  Test Callback Function
var testCallbackFcn = function (data) {
    console.log(data);
    data.obj = data;
    console.log(data.obj.characters);
    console.log(solnObj.characters);
    if (solnObj.characters == data.obj.characters) {
        result = `pass`;     
    } else {
        result = `fail`;
    }
    console.log(`Test Number: ${testNumber}`); 
    console.log(`Function Name: ${testFunction}`);
    console.log(`Result: ${result}`);
    console.log(`${hrDash}`);
    console.log(`End of Test.`);
};

//=================================================================================================================================================================================
//  unit test for AssetManager.prototype.getJSON
function unittest_getJSON() {
    return new Promise(function (resolve, reject) {
    testNumber = 1;
    testFunction = `assetManager.getJSON(param)`;
    totalNumberOfTests++;
    let assetManager = new AssetManager();
    result = null;
    assetManager.getJSON("/lib/characters.JSON", testCallbackFcn);
    });
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function unittest_requestJSON() {
    testNumber = 2;
    testFunction = `assetManager.requestJSON(param)`;
    result = null;
    totalNumberOfTests++;
    let assetManager = new AssetManager();
    assetManager.requestJSON("/lib/characters.JSON");
}

//-------------------------------------------------------------------------------------------------------------------------------------------------

function unittest_getFile() {
  testNumber = 3;
  testFunction = `assetManager.getFile(param)`;
  describe(`Test Number: ${testNumber}
  Function: ${testFunction}`, () => {
      it(`should return 'true' if JSON file is attained.`, () => {
        totalNumberOfTests++;
        let assetManager = new AssetManager();
               /* new Promise(() => {
                    assetManager.getFile("/lib/characters.JSON");
                })
                .then(assert.isTrue(solnObj === assetManager.retrieveDataFile(), `returned JSON file.`)); */
        assetManager.getFile("/lib/characters.JSON");
        let test = false;
        let pause = setTimeout(() => {
            let data = assetManager.retrieveDataFile();
            if (data.characters == solnObj.characters) {
                test = true;
            }
            assert.isTrue(test, `returned JSON file.`);
            console.log(data.characters);
            clearTimeout(pause);
        }, 5000);
      });
  });
}

function unittest_requestJSON2() {
  testNumber = 4;
  testFunction = `assetManager.requestJSON(param)`;
  describe(`Test Number: ${testNumber}
    Function: ${testFunction}`, () => {
    it(`should return 'true' if JSON file is retrieved.`, async() => {
        totalNumberOfTests++;
        let assetManager = new AssetManager();
        assert.isTrue(await assetManager.requestJSON("/lib/characters.JSON"), `Function executed as expected.`);
    });
  });
};

function unittest_getJSON3() {
    return new Promise(function (resolve, reject) {
      testNumber = 5;
      testFunction = `assetManager.getJSON(param)`;
      totalNumberOfTests++;
      let assetManager = new AssetManager();
      result = null;
      assetManager.getJSON2("/lib/characters.JSON");
    })
    .then(() => {
        console.log(assetManager.retrieveDataFile());
    });
}

//===================================================================================================================================================================================

                                                                    /*    END OF INDIVIDUAL UNIT TESTS    */

/********************************************************************************************************************************************************************************** */
/*  Execute Unit Test Functions */
console.log(`${hrAsterisk}`);
console.log(`${heading}`);
console.log(`${hrEqual}`);
//  the tests   
// timestamp
unittest_getJSON()
//.then(unittest_requestJSON())
.then(unittest_getFile())
.then(unittest_requestJSON2())
.then(unittest_getJSON3());
// end of tests
//timestamp
var timeTaken = 0;
console.log(`Ran ${totalNumberOfTests} tests in ${timeTaken/1000} secs.`);
console.log(`${hrEqual}`);
console.log(`END OF UNIT TESTS`);

