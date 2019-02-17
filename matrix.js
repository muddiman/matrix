//  fliename:   matrix.js
//  path:       N/A

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Main Program    (the only source code file for this project)                        
*/

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   1.0.0
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

/*    THE GLOBALS      */
const REFRESH_RATE = 24;                                            // in Hz or fps
const INTERVAL = 1000/REFRESH_RATE;                                 // in milliseconds
const WIDTH = window.innerWidth;                                    // canvas width in px
const HEIGHT = window.innerHeight;                                  // canvas height in px
const CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '$', '#', '%', '^', '&', '*', '(', ')', '-', '=', '+', '{', '?', '>'];
const minCHARACTERS = Math.floor(HEIGHT/15);
const maxCHARACTERS = 2 * minCHARACTERS;
const maxROWS = Math.floor(HEIGHT/15) + 50 ;                        // 50 acts as a buffer
const maxCOLUMNS = WIDTH/10;                                        // To be accurately determined
const maxSTREAMERS = maxCOLUMNS;
const OPAQUE = 1.0;
const TRANSLUCENT = 0.8;                                            // 20% translucent
const TRANSPARENT = 0;
const FONT_SIZE = `12`;
const FONT_SIZE13 = `13`;
const FONT_SIZE14 = `14`;
const FONT = `monaco`;

var listOfStreamers = [];                                           // listOfStreamers.length == maxStreamers (120)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*   CLASSES & OBJECTS        */

var screenOBJ = {                            
    CANVAS      : document.createElement("canvas"),
    alpha       : OPAQUE,
    animate     : function () {
                    this.animation = setInterval(__updateFrame__, INTERVAL);
                },   
    init        : function () {
                    this.CANVAS.width  = WIDTH;
                    this.CANVAS.height = HEIGHT;
                    this.CANVAS.id = `matrixScreen`;
                    this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
                    document.body.appendChild(this.CANVAS);
                    this.CONTEXT = this.CANVAS.getContext("2d"); 
                },
    stop        : function () {
                    clearInterval(this.animation);
                },
    clear       : function () {
                    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
                }  
};

function streamClass(n) {        
    this.stream = createStreamer();
    this.init   = function () {
        this.row          = 0;
        this.column       = n;
        this.headPosition = 0;
        this.streamLength = randomStreamLength();
        this.speedSetting = Math.floor(Math.random()*65) + 5;                       // random and arbitrary speed between 5 and 70
    };                
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*      FUNCTIONS       */

function runTheMatrix(screenAlpha) {                       
    for (i=0; i < maxSTREAMERS; i++) {
         listOfStreamers[i].init();
    }
    screenOBJ.alpha = screenAlpha;
    screenOBJ.animate();                           
}

function createStreamer() {
    let streamer = [];                                                              // an array of CHARACTERS defined above
    let lengthOfStream = randomStreamLength();         
    for (i=0; i<lengthOfStream;i++) {
        let index = Math.floor(Math.random() * CHARACTERS.length);
        streamer[i] = CHARACTERS[index];
    }
    return streamer;
}

function createListOfStreamers() {
    let list = [];
    for (n=0;n<maxSTREAMERS;n++) {
        list[n] = new streamClass(n);
    }
    return list;
}

function __updateFrame__() {
    screenOBJ.clear();
    for (i=0;i<maxSTREAMERS;i++) {
        displayStream(listOfStreamers[i], i);
    }
}

function randomStreamLength() {
    return Math.floor((Math.random() * maxCHARACTERS/2) + minCHARACTERS);           // confusing but i want the reader to get a sense that it is a random length between the minCHARACTERS & maxCHARACTERS
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
    streamObject.headPosition = (streamObject.headPosition + streamObject.speedSetting/100) % maxROWS;
    if (streamObject.headPosition === 0) {
        streamObject.init();             
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                            /*      MAIN PROGRAM        */
//  run after eight(8) seconds of inactivity
//  stop the matrix on a mousemove event (or a keystroke event)

function removeMatrix() {
    screenOBJ.CANVAS.removeEventListener("mousemove", removeMatrix);
    window.removeEventListener("keypress", removeMatrix);
    screenOBJ.stop();
    screenOBJ.clear();
    screenOBJ.alpha = 0;
    screenOBJ.init();
    matrix(TRANSLUCENT);
}

function matrix(transparency) {
        setTimeout(() =>{
            getDarker();
    }, 8000);
    setTimeout(() => {
        listOfStreamers = createListOfStreamers();                          //  load the matrix
        runTheMatrix(transparency);                                         //  run the matrix
        screenOBJ.CANVAS.addEventListener("mousemove", removeMatrix);
        window.addEventListener("keypress", removeMatrix);
    }, 10000);
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

// Call The Main Function
matrix(TRANSLUCENT);

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






