//  filename:   display.mjs
//  path:       /lib/display.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Module    (renders the streams on screen, contains all display functions)                        
*/

/*  the imports */
//import { maxSTREAMERS } from "../lib/stream.mjs";
/*  the globals */
const TRANSPARENT =    0;
// export const TRANSLUCENT = 0.8;                //  provides Perfect balance between screen transparency and visibility of matrix streams
const OPAQUE      =  1.0;
const FONT_SIZE   = `12`;
const FONT_SIZE13 = `13`;
const FONT_SIZE14 = `14`;
const FONT = `monaco`;
/*  the exports */
export var WIDTH  = window.innerWidth;
export var HEIGHT = window.innerHeight;
const maxCOLUMNS  = Math.floor(WIDTH/10);

/*      Display Classes     */
const Screen = function (_width, _height) {                                        // Screen Class                     
    this.CANVAS      = document.createElement("canvas");
    this.alpha       = OPAQUE;
    this.CONTEXT     = this.CANVAS.getContext("2d"); 
    this.init        = function () {
                    this.CANVAS.width  = _width;
                    this.CANVAS.height = _height;
                    this.CANVAS.id = `matrixScreen`;
                    this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
                    document.body.appendChild(this.CANVAS);
                };
    this.clear       = function () {
                    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
                };
    this.getDarker  = function (transparency) {                  
                    this.alpha = TRANSPARENT;
                    let darker = setInterval(() => {
                        if (this.alpha < transparency) {
                            this.alpha += 0.04;
                            this.init();
                        } else {
                            clearInterval(darker);
                        }
                    }, 100);                                            // gets dark in two(2) seconds or 2,000ms
                };
    this.setAlpha    = function (_alpha) {
                           this.alpha = _alpha;
                     };    
/*    this.getHeight = function () {
                         return this.CANVAS.height;
                    };  
*/
};

export const Display = function (_color) {
    // Properties
    this.streamAlpha = OPAQUE;
    // Methods
    this.init        = function () {
                        //  initialize properties;
                    };
    this.setStreamAlpha = function (__alpha) {
                            this.streamAlpha = __alpha;
                        };
    this.setColor   = function (matrixColor) {
                        let red, green, blue;
                        if (matrixColor === "green") {
                            red   =   0;
                            green = 255;
                            blue  =   0;
                        }
                        if (matrixColor === "dark green") {
                            red   =   0;
                            green = 125;
                            blue  =   0;
                        } 
                        if (matrixColor === "light green") {
                            red   = 125;
                            green = 255;
                            blue  = 125;
                        }                                              
                        if (matrixColor === "red") {
                            red   = 255;
                            green =   0;
                            blue  =   0;
                        }
                        if (matrixColor === "dark red") {
                            red   = 125;
                            green =   0;
                            blue  =   0;
                        }
                        if (matrixColor === "light red") {
                            red   =  255;
                            green =  125;
                            blue  =  125;
                        }                                                
                            return `rgba(${red}, ${green}, ${blue}, ${this.streamAlpha})`;
                      }; 
    this.streamColor = this.setColor(_color);

    this.getHeight  = function () {
                        return HEIGHT;
                    };
    this.getWidth   = function () {
                        return WIDTH;
                    };
    this.screen     = new Screen(WIDTH, HEIGHT);                            //  instantiate a screen object from the screen class
    // this.buffer  = new Screen(WIDTH, HEIGHT);                     
    this.render     = function (streams) {
                        this.screen.clear();
                        // this.screen.alpha = TRANSLUCENT;
                        for (let i=0;i<maxCOLUMNS;i++) {                  
                            for (streams.list[i].row = 0; streams.list[i].row <= streams.list[i].headPosition; streams.list[i].row++) {
                                this.screen.CONTEXT.font = `${FONT_SIZE}px ${FONT}`;
                                // this.setColor("green");
                                this.screen.CONTEXT.fillStyle = this.streamColor; // `rgba(0, 255, 0,  ${OPAQUE})`;                // green, opaque
                                if (streams.list[i].speedSetting <= 35) {                                      // Slow moving streams get a darker color to give the effect that its further away
                                    this.screen.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;              // BLACK, opaque
                                    this.screen.CONTEXT.font = `0px ${FONT}`;
                                    //  `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                                } else {
                                    if (streams.list[i].speedSetting > 35 && streams.list[i].speedSetting < 50) { // Slow moving streams get a darker color to give the effect that its further away
                                        this.screen.CONTEXT.fillStyle = `rgba(0, 125, 0,  ${OPAQUE})`;        // DARK green, opaque
                                    }
                                    if (streams.list[i].headPosition > streams.list[i].streamLength) {
                                        if (streams.list[i].row < streams.list[i].headPosition - streams.list[i].streamLength) {
                                            this.screen.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;      // BLACK, opaque
                                            this.screen.CONTEXT.font = `0px ${FONT}`;
                                        }
                                    }
                                    if (streams.list[i].row > streams.list[i].headPosition-4) {
                                        this.screen.CONTEXT.fillStyle = `rgba(127, 255, 127,  ${OPAQUE})`;    // light green, opaque
                                        this.screen.CONTEXT.font = `${FONT_SIZE13}px ${FONT}`;
                                    }
                                    if  (streams.list[i].row > streams.list[i].headPosition-2) {
                                        this.screen.CONTEXT.fillStyle = `rgba(255, 255, 255,  ${OPAQUE})`;    // white, opaque
                                        this.screen.CONTEXT.font = `${FONT_SIZE14}px ${FONT}`;          
                                    }
                                }               
                                this.screen.CONTEXT.fillText(streams.list[i].stream[streams.list[i].row], i * 10, (streams.list[i].row * 15));
                            } 
                        }
                    };
    this.resize     = function(event) {
                        var height, width;
                    };               
    };

    var color = {
        red     : [255, 0, 0], // `rgba(${red}, ${green}, ${blue}, ${alpha})`
        green   : [0, 255, 0],
        blue    : [0, 0, 255],
        white   : [255, 255, 255],
        BLACK   : [0, 0, 0]
    };

    function assign_color() {
        red   = color.red[0];
        green = color.red[1];
        blue  = color.red[2];
    }

    // light = if (x=0) {x=127}
    // dark if (x=255) { x=127}
       // x/2
    //}
    
    //  or discribe an object literal for screen
    /*  this.screen = {
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
    }       */


/*
function displayStream(streams.list[i], line) {
    for (streams.list[i].row = 0; streams.list[i].row <= streams.list[i].headPosition; streams.list[i].row++) {
        this.screen.CONTEXT.font = `${FONT_SIZE}px ${FONT}`;
        this.screen.CONTEXT.fillStyle = `rgba(0, 255, 0,  ${OPAQUE})`;                // green, opaque
        if (streams.list[i].speedSetting <= 35) {                                      // Slow moving streams get a darker color to give the effect that its further away
            this.screen.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;              // BLACK, opaque
            this.screen.CONTEXT.font = `0px ${FONT}`;

        } else {
            if (streams.list[i].speedSetting > 35 && streams.list[i].speedSetting < 50) { // Slow moving streams get a darker color to give the effect that its further away
                this.screen.CONTEXT.fillStyle = `rgba(0, 125, 0,  ${OPAQUE})`;        // DARK green, opaque
            }
            if (streams.list[i].headPosition > streams.list[i].streamLength) {
                if (streams.list[i].row < streams.list[i].headPosition - streams.list[i].streamLength) {
                    this.screen.CONTEXT.fillStyle = `rgba(0, 0, 0,  ${OPAQUE})`;      // BLACK, opaque
                    this.screen.CONTEXT.font = `0px ${FONT}`;
                }
            }
            if (streams.list[i].row > streams.list[i].headPosition-4) {
                this.screen.CONTEXT.fillStyle = `rgba(127, 255, 127,  ${OPAQUE})`;    // light green, opaque
                this.screen.CONTEXT.font = `${FONT_SIZE13}px ${FONT}`;
            }
            if  (streams.list[i].row > streams.list[i].headPosition-2) {
                this.screen.CONTEXT.fillStyle = `rgba(255, 255, 255,  ${OPAQUE})`;    // white, opaque
                this.screen.CONTEXT.font = `${FONT_SIZE14}px ${FONT}`;          
            }
        }               
        this.screen.CONTEXT.fillText(streams.list[i].stream[streams.list[i].row], line * 10, (streams.list[i].row * 15));
    }
    streams.list[i].headPosition = (streams.list[i].headPosition + streams.list[i].speedSetting/100) % maxROWS;
    if (streams.list[i].headPosition === 0) {
        streams.list[i].init();             
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
 *  @version   1.2.0
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
