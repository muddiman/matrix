
/*
*                      UNIT TESTS API
*/


//  Test Class
/*
export const Test = function () {
    //  Properties
    //  Methods
};      
*/
//  Prototypes
// Test.prototype.
export const describe = function(testcase, callback) {
    console.log(testcase);
    callback();
};
  
// Test.prototype.
export const it = function(description, callback) {
    try {
        callback();
        console.log(`\t  ${description}: Pass`);
    } catch (error) {
        console.log(`\t  ${description}: Fail`);   
    }
};
  
// Test.prototype
/*
const expect = function(actualVal) {
};
*/
  
