//  filename:   matrix.mjs
//  path:       /lib/matrix.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Matrix Component (Matrix Streams Classes & Logic)                        
*/


//  imports 
import { ListOfStreamersClass, minCHARACTERS } from "/lib/stream.mjs";
/*  the globals */
const maxROWS = minCHARACTERS + 50 ;                        // 50 acts as a buffer

/*  the Matrix Class    */
export var Matrix = function () {
  // Properties
  this.streamersArr   = new ListOfStreamersClass(); 
  // Methods                     
  this.init           = function () {
                            this.streamersArr = new ListOfStreamersClass();                      
                        };
  this.update         = function () {
                          for (let i = 0; i < this.streamersArr.list.length; i++) {
                            this.streamersArr.list[i].headPosition = (this.streamersArr.list[i].headPosition + this.streamersArr.list[i].speedSetting/100) % (maxROWS + this.streamersArr.list[i].streamLength);
                              if (this.streamersArr.list[i].headPosition === 0) {
                                this.streamersArr.list[i].init();             
                              }    
                           }
                        };
  this.getStreamersArr = function () {
                           return this.streamersArr;
                        };
};

//----------------------------------------------------------------------------------------------------------------------------------------------------


// import { HEIGHT }  from "/lib/display.mjs";                                  // canvas height in px
/* import { Screen }  from "/lib/display.mjs";
import { gEngine } from "/lib/engine.mjs";
//  constants
const maxROWS = Math.floor(HEIGHT/15) + 50 ;                        // 50 acts as a buffer
/* const OPAQUE = 1.0;
const TRANSLUCENT = 0.8;
const REFRESH_RATE = 45;                                            // in Hz or fps
const INTERVAL = 1000/REFRESH_RATE;                                 // in milliseconds                                           // 20% translucent
const FONT_SIZE = `12`;
const FONT_SIZE13 = `13`;
const FONT_SIZE14 = `14`;
const FONT = `monaco`;
// const TRANSPARENT = 0;


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
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */




