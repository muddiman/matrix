//  filename:   display.mjs
//  path:       /lib/display.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Module    (renders the streams on screen, contains all display functions)                        
*/
// const TRANSPARENT = 0;
const OPAQUE = 1.0;
const WIDTH = window.innerWidth;
export const maxCOLUMNS = WIDTH/10;                                        // To be accurately determined  
export const HEIGHT = window.innerHeight;

export const Screen = function () {                                        // Screen Class                     
    this.CANVAS      = document.createElement("canvas");
    this.alpha       = OPAQUE;
    this.init        = function () {
                    this.CANVAS.width  = WIDTH;
                    this.CANVAS.height = HEIGHT;
                    this.CANVAS.id = `matrixScreen`;
                    this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
                    document.body.appendChild(this.CANVAS);
                    this.CONTEXT = this.CANVAS.getContext("2d"); 
                };
    this.clear       = function () {
                    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
                };  
};
/*
const Display = function (canvas) {
    this.buffer = document.createElement("canvas").getContext("2d");
    this.context    = canvas.getContext("2d");
    this.init       = function () {
                        //  initialize properties;
                    };
    this.render     = function () {
                        //  draw gfx;
    };
    this.resize     = function(event) {
        var height, width;
    };
    //  instantiate a screen object from the screen class
    this.screen = new Screen(),
        //  or discribe an object literal for screen
    this.screen = {
        alpha:OPAQUE,
        canvas:createElement("canvas"),
        context:canvas.getContext("2d"),
        init:function() {
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.id = `matrixScreen`;
            this.canvas.style = `position: absolute;`;
            document.body.appendChild(this.canvas);

        },
        clear:function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
    }
};
*/

/*
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
*/

//          TODO: create 'buffer screen' and 'final display screen' to speed up animation on less powerful devices

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