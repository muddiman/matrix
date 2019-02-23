//  filename:   display.mjs
//  path:       /lib/display.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Display Module    (renders the streams on screen, contains all display functions)                        
*/

/*
*       The Display Class has a color option where the color can be changed to either 'red', 'green' or 'blue'.
*/

/*  the imports */
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
var maxCOLUMNS  = Math.floor(window.innerWidth/10);

/*      Display Classes     */
// Screen class: sets up the HTML canvas ot view the animations
const Screen = function (_width, _height) {  
    // Properties                                      // Screen Class                     
    this.CANVAS        = document.createElement("canvas");
    this.CANVAS.width  = _width;
    this.CANVAS.height = _height;
    this.CANVAS.id     = `matrixScreen`;
    this.alpha         = OPAQUE;
    this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
    this.CONTEXT       = this.CANVAS.getContext("2d");

    // Methods
    this.init = function () {
        this.CANVAS.width  = window.innerWidth;
        this.CANVAS.height = window.innerHeight;
        // this.CANVAS.id     = `matrixScreen`;
        this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
        document.body.appendChild(this.CANVAS);
    };
};
// Prototypes 
Screen.prototype.getHeight = function () {
                               return this.CANVAS.height;
                            };
Screen.prototype.getWidth = function () {
                                return this.CANVAS.width;
                             };
Screen.prototype.clear = function () {
                         this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
                     };
Screen.prototype.getDarker = function (transparency) {                  
                        this.alpha = TRANSPARENT;
                        let darker = setInterval(() => {
                        if (this.alpha < transparency) {
                            this.alpha += 0.004;
                            this.init();
                        } else {
                            clearInterval(darker);
                        }
                        }, 17);                                            // gets dark in two(3) seconds or 3,000ms
                     };
Screen.prototype.setAlpha = function (_alpha) {
                           this.alpha = _alpha;
                     };    
Screen.prototype.resize = function() {
                        this.CANVAS.width  = window.innerWidth;
                        this.CANVAS.height = window.innerHeight;
}; 

/*  Color Class */
const Color = function (_color) {
    // Properties
    this.red        = 0;
    this.green      = 0;
    this.blue       = 0;
    // Methods
    this.init = function () {
                    this.red        = 0;
                    this.green      = 0;
                    this.blue       = 0;
                    switch (_color) {
                        case "red":
                            this.red   = 255;
                            break;
                        case "green":
                            this.green = 255;
                            break;
                        case "blue":
                            this.blue  = 255;
                            break;
                        default:
                            this.green = 255;
                            break;
                    }
                };
            this.lighten = function () {
                switch (_color) {
                    case "red":
                        this.green = 125;
                        this.blue  = 125;
                        break;
                    case "green":
                        this.red  = 125;
                        this.blue = 125;
                        break;
                    case "blue":
                        this.red   = 125;
                        this.green = 125;
                        break;
                    default:
                        this.red  = 125;
                        this.blue = 125;
                        break;
                }
            };
            this.darken  = function () {
                switch (_color) {
                    case "red":
                        this.red   = 125;
                        break;
                    case "green":
                        this.green = 125;
                        break;
                    case "blue":
                        this.blue  = 125;
                        break;
                    default:
                        this.green = 125;
                        break;
                }
        };
};
// Prototypes
Color.prototype.setBlack = function () {
                            this.red   = 0;
                            this.green = 0;
                            this.blue  = 0;
    };
Color.prototype.setWhite = function () {
                            this.red   = 255;
                            this.green = 255;
                            this.blue  = 255;
    };
Color.prototype.getColor = function () {
                            return `rgba(${this.red}, ${this.green}, ${this.blue}, ${OPAQUE})`;
    };

/*  Display class   */
export const Display = function (_color) {
    // Properties
    this.streamAlpha = OPAQUE;
    this.color       = new Color(_color); 
    this.screen      = new Screen(WIDTH, HEIGHT);                //  instantiate a screen object from the screen class

    // this.buffer  = new Screen(WIDTH, HEIGHT);                     
};                          
// Prototypes
Display.prototype.init = function () {                                                          //  initialize properties
                            this.streamAlpha = OPAQUE;
                            this.screen.init(window.innerWidth, window.innerHeight);            // resize screen
                            this.color.init();
                    };
Display.prototype.setStreamAlpha = function (__alpha) {
                                     this.streamAlpha = __alpha;
                    };
Display.prototype.render = function (streams) {
                        this.screen.clear();
                        // this.screen.alpha = TRANSLUCENT;
                        for (let i=0;i<maxCOLUMNS;i++) {                  
                            for (streams.list[i].row = 0; streams.list[i].row <= streams.list[i].headPosition; streams.list[i].row++) {
                                this.screen.CONTEXT.font = `${FONT_SIZE}px ${FONT}`;
                                this.color.init();   // setColor("green");
                                this.screen.CONTEXT.fillStyle = this.color.getColor(); // `rgba(0, 255, 0,  ${OPAQUE})`;                // green, opaque
                                if (streams.list[i].speedSetting <= 35) {                                      // Slow moving streams get a darker color to give the effect that its further away
                                    this.color.setBlack();
                                    this.screen.CONTEXT.fillStyle = this.color.getColor();  // `rgba(0, 0, 0,  ${OPAQUE})`;              // BLACK, opaque
                                    this.color.init(); 
                                    this.screen.CONTEXT.font = `0px ${FONT}`;
                                } else {
                                    if (streams.list[i].speedSetting > 35 && streams.list[i].speedSetting < 50) { // Slow moving streams get a darker color to give the effect that its further away
                                        this.color.darken();
                                        this.screen.CONTEXT.fillStyle = this.color.getColor(); // `rgba(0, 125, 0,  ${OPAQUE})`;        // DARK green, opaque
                                        this.color.init(); 
                                    }
                                    if (streams.list[i].headPosition > streams.list[i].streamLength) {
                                        if (streams.list[i].row < streams.list[i].headPosition - streams.list[i].streamLength) {
                                            this.color.setBlack();
                                            this.screen.CONTEXT.fillStyle = this.color.getColor();  // `rgba(0, 0, 0,  ${OPAQUE})`;      // BLACK, opaque
                                            this.color.init(); 
                                            this.screen.CONTEXT.font = `0px ${FONT}`;
                                        }
                                    }
                                    if (streams.list[i].row > streams.list[i].headPosition-4) {
                                        this.color.lighten();
                                        this.screen.CONTEXT.fillStyle = this.color.getColor(); // `rgba(127, 255, 127,  ${OPAQUE})`;    // light green, opaque
                                        this.color.init(); 
                                        this.screen.CONTEXT.font = `${FONT_SIZE13}px ${FONT}`;
                                    }
                                    if  (streams.list[i].row > streams.list[i].headPosition-2) {
                                        this.color.setWhite();
                                        this.screen.CONTEXT.fillStyle = this.color.getColor();  // `rgba(255, 255, 255,  ${OPAQUE})`;    // white, opaque
                                        this.color.init(); 
                                        this.screen.CONTEXT.font = `${FONT_SIZE14}px ${FONT}`;          
                                    }
                                }               
                                this.screen.CONTEXT.fillText(streams.list[i].stream[streams.list[i].row], i * 10, (streams.list[i].row * 15));
                            } 
                        }
                    };
              


//          TODO: create 'buffer screen' and 'final display screen' to speed up animation on less powerful devices

/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   1.3.1
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
