//  filename:   matrix.js
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
 *  @version   1.1.0
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/Matrix
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */

// Matrix class hands the Matrix to the Display
// Display renders it on every frame 
// Engine crunches all the frames at the specified frame_rate
// controller input: stops when an event from keyboard, mouse or touch is received


/*    THE GLOBALS      */
//  imports
import { ListOfStreamersClass, maxSTREAMERS } from "/lib/stream.mjs";
import { HEIGHT } from "../lib/display.mjs";                                  // canvas height in px
import { Screen } from "/lib/display.mjs";
import { gEngine } from "/lib/engine.mjs";
//  constants
const maxROWS = Math.floor(HEIGHT/15) + 50 ;                        // 50 acts as a buffer
const OPAQUE = 1.0;
const TRANSLUCENT = 0.8;
const REFRESH_RATE = 45;                                            // in Hz or fps
const INTERVAL = 1000/REFRESH_RATE;                                 // in milliseconds                                           // 20% translucent
const FONT_SIZE = `12`;
const FONT_SIZE13 = `13`;
const FONT_SIZE14 = `14`;
const FONT = `monaco`;
// const TRANSPARENT = 0;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*   OBJECTS        */

/*  create a new screen instance    */
var screenOBJ = new Screen();
/*  create a new game engine instance   */
var gameEngine = new gEngine(INTERVAL, frameUpdate);
/*  create a new matrix instance    */
var listOfStreamers = new ListOfStreamersClass();                          //  load the matrix

// var matrix = new Matrix();   // which includes streams
/*  create a new    */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*      FUNCTIONS       */
/*
var render = function() {
    displayStream.render();
};

var update = function() {
    matrix.update();
};
*/

/*      event listeners     */
/*
window.addEventListener("resize",     resizeHandler);
window.addEventListener("keydown",    keystrokeHandler);
window.addEventListener("keyup",      keystrokeHandler);
window.addEventListener("mousemove",  mouseEventHandler);
window.addEventListener("mouseclick", mouseEventHandler);
display.resize();
gEngine.start();
*/

function frameUpdate() {                                   // update function
    screenOBJ.clear();
    renderStreams(listOfStreamers.list);                   // render function
}
 
function renderStreams(streamList) {
    let i;
    for (i=0;i<maxSTREAMERS;i++) {
        displayStream(streamList[i], i);
    }
}

function displayStream(streamObject, line) {
    for (streamObject.row = 0; streamObject.row <= streamObject.headPosition; streamObject.row++) {
        screenOBJ.CONTEXT.font = `${FONT_SIZE}px ${FONT}`;
        screenOBJ.CONTEXT.fillStyle = `rgba(0, 255, 0,  ${OPAQUE})`;                // green, opaque
        if (streamObject.speedSetting <= 35) {                                      // Slow moving streams get a darker color to give the effect that its further away
            screenOBJ.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;              // BLACK, opaque
            screenOBJ.CONTEXT.font = `0px ${FONT}`;

        } else {
            if (streamObject.speedSetting > 35 && streamObject.speedSetting < 50) { // Slow moving streams get a darker color to give the effect that its further away
                screenOBJ.CONTEXT.fillStyle = `rgba(0, 125, 0,  ${OPAQUE})`;        // DARK green, opaque
            }
            if (streamObject.headPosition > streamObject.streamLength) {
                if (streamObject.row < streamObject.headPosition - streamObject.streamLength) {
                    screenOBJ.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;      // BLACK, opaque
                    screenOBJ.CONTEXT.font = `0px ${FONT}`;
                }
            }
            if (streamObject.row > streamObject.headPosition-4) {
                screenOBJ.CONTEXT.fillStyle = `rgba(127, 255, 127,  ${OPAQUE})`;    // light green, opaque
                screenOBJ.CONTEXT.font = `${FONT_SIZE13}px ${FONT}`;
            }
            if  (streamObject.row > streamObject.headPosition-2) {
                screenOBJ.CONTEXT.fillStyle = `rgba(255, 255, 255,  ${OPAQUE})`;    // white, opaque
                screenOBJ.CONTEXT.font = `${FONT_SIZE14}px ${FONT}`;          
            }
        }               
        screenOBJ.CONTEXT.fillText(streamObject.stream[streamObject.row], line * 10, (streamObject.row * 15));
    }
    streamObject.headPosition = (streamObject.headPosition + streamObject.speedSetting/100) % (maxROWS + streamObject.streamLength);
    if (streamObject.headPosition === 0) {
        streamObject.init();             
    }
} 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                            /*      MAIN PROGRAM        */
//  run after eight(8) seconds of inactivity
//  stop the matrix on a mousemove event (or a keystroke event)

function removeMatrix() {
    screenOBJ.CANVAS.removeEventListener("mousemove", removeMatrix);        // remove listeners
    window.removeEventListener("keypress", removeMatrix);
    gameEngine.stop();
    screenOBJ.clear();
    screenOBJ.alpha = 0;
    screenOBJ.init();
    theMatrix(TRANSLUCENT);
}

function getDarker() {                  
    screenOBJ.alpha = 0;
    let darker = setInterval(frame, 100);                                   // gets dark in two(2) seconds or 2,000ms
    function frame() {
        if (screenOBJ.alpha < TRANSLUCENT) {
            screenOBJ.alpha += 0.04;
            screenOBJ.init();
        } else {
            clearInterval(darker);
        }
    }
}

function theMatrix(transparency) {
    setTimeout(() =>{
            getDarker();
    }, 8000);
    setTimeout(() => {
        listOfStreamers.init();
        screenOBJ.alpha = transparency;
        gameEngine.start();                                                 //  run the matrix
        screenOBJ.CANVAS.addEventListener("mousemove", removeMatrix);       // initialize listeners
        window.addEventListener("keypress", removeMatrix);
    }, 10000);
}   


// Call The Main Function
theMatrix(TRANSLUCENT);


//----------------------------------------------------------------------------------------------------------------------------------------------------

                                                /*      TODO: Refactor code & Add sound
/*      AUDIO       */
/*
var sound = document.createElement("audio");
sound.src = "matrix.mp3";
sound.volume = 0.2;                             // 20%
sound.muted = true;
sound.loop = true;
console.log(sound.error.code);                  // only works with Microsoft Edge browser
sound.play();
*/






