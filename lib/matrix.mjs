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
export var Matrix  = function () {
  // Properties
  this.streamersArr                     = new ListOfStreamersClass(); 
  // Methods                     
  this.init                             = function () {
                                            this.streamersArr = new ListOfStreamersClass();                      
                                        };
};

// Prototypes
Matrix.prototype.update                 = function () {
                                        //return new Promise(resolve, reject)
                                          for (let i = 0; i < this.streamersArr.list.length; i++) {
                                            this.streamersArr.list[i].headPosition = (this.streamersArr.list[i].headPosition + this.streamersArr.list[i].speedSetting/100) % (maxROWS + this.streamersArr.list[i].streamLength);
                                              if (this.streamersArr.list[i].headPosition === 0) {
                                                this.streamersArr.list[i].init(i);             
                                              }    
                                          }
                                        };
Matrix.prototype.getStreamersArr        = function () {
                                          return this.streamersArr;
                                        };


/** */
/****************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   2.0.1
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/Matrix
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 1.3.1) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */




