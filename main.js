//  filename:   main.js
//  path:       N/A

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Main Program    (Main Program Logic)                        
*/

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   1.3.0
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/Matrix
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 1.2.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */

// Matrix class handles all the character streams logic and updates the streams position every frame, and subsequently the updated Matrix to the Display
// Display renders it on every frame 
// Engine crunches all the frames at the specified frame_rate
// if Necessary: An Input Class deals with event handling

/*  the globals */
const FPS = 60;
const TRANSPARENT =   0;
const TRANSLUCENT = 0.8;
/*  the imports */
import { Display } from "/lib/display.mjs";
import { Matrix }  from "/lib/matrix.mjs";
import { gEngine } from "/lib/engine.mjs";

/*  Display */
var display = new Display("green");                                        //  TODO:   add color to matrix (2.0.0)
/*  Matrix  */
var matrix  = new Matrix();
/*  Engine  */
var engine  = new gEngine(1000/FPS, () => {matrix.update();}, () => {display.render(matrix.getStreamersArr());});        //  TODO:   add fixed-time animation (1.3.0)

//-------------------------------------------------------------------------------------------------------------
/*  functions   */
//  event handling functions 
function loadListeners() { 
  window.addEventListener("resize", resizeWindow);                          // get a new display (and Screen)  
  window.addEventListener("keypress", removeMatrix);
  window.addEventListener("touchmove", removeMatrix);
  display.screen.CANVAS.addEventListener("mousemove", removeMatrix);       
}

function removeListeners() {
  window.removeEventListener("keypress", removeMatrix);
  window.removeEventListener("touchmove", removeMatrix);                     //  remove the event listeners
  display.screen.CANVAS.removeEventListener("mousemove", removeMatrix);
}

function resizeWindow() {
  // removeMatrix();
  removeListeners();
  // clearTimeout(darkness);                                                 //  clear the timeouts
  // clearTimeout(theMatrix);
  engine.stop();
  display.screen.clear(); 
  display.screen.setAlpha(TRANSPARENT);                                      //  resets the transparency cycle for getDarker function
  display.screen.resize();             // a new screen(canvas) is drawn with updated dimensions     // = new Display("green"); 
  // display.screen.init();                                    //  a new display with updated screen dimensions
  // matrix.init();
  theMatrix();
  // matrix  = new Matrix();                                             //  a new Matrix with updated number of streamers to fit new window
  // engine  = new gEngine(1000/FPS, () => {matrix.update();}, () => {display.render(matrix.getStreamersArr());});                                          
  // theMatrix();
}

//  Matrix functions
function theMatrix() {
  var darkness = setTimeout( () => {                                         //  dim screen after 8 secs
    display.screen.getDarker(TRANSLUCENT);
    loadListeners();
    var theMatrix = setTimeout(() => {                                        //  go into the matrix after 10 secs
      matrix.streamersArr.init();
      display.screen.setAlpha(TRANSLUCENT);
      display.screen.init();
      engine.start();
    }, 3000);
  }, 3000);
}

function removeMatrix() {
  removeListeners();
  // clearTimeout(darkness);                                                 //  clear the timeouts
  // clearTimeout(theMatrix);
  engine.stop();
  display.screen.clear(); 
  display.screen.setAlpha(TRANSPARENT);                                      //  resets the transparency cycle for getDarker function
  display.screen.init();
  theMatrix();
}

/*
*       Only five(5) functions are necessary to run the Matrix Rain Effect (MRE) in the browser (actually, only two).
*       My intention was to make this code layout as clean as possible, and easy to follow for JavaScript beginners.
*       If the code could be refractored (not sure if that is even a word) even further for 'ease of read' 
*       please feel free to send me your code to the contact information above.
*/

//------------------------------------------------------------------------------------------------------------------------
/*  call the Matrix */
theMatrix();

/* const gamePromise = new Promise((resolve, reject) => {
  resolve();
  reject()
});

gamePromise.then(callback);
gamePromise.catch(ErrorCallback);

//  or 
function example(){
  return new Promise((resolve, reject) => {
    // code;
    resolve();
  });
};

example.then(() => {

});

this.update()
.then(this.render())
.catch(console.error());
 */
