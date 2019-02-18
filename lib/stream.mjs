//  filename:   stream.mjs
//  path:       /lib/stream.js

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Matrix Module    (generates the character streams & contains all logic required to execute)                        
*/

import { maxCOLUMNS } from "/lib/display.mjs";
export const HEIGHT = window.innerHeight;                                  // canvas height in px
export const maxSTREAMERS = maxCOLUMNS;
const CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '$', '#', '%', '^', '&', '*', '(', ')', '-', '=', '+', '{', '?', '>'];
const minCHARACTERS = Math.floor(HEIGHT/15);
const maxCHARACTERS = 2 * minCHARACTERS;

/*      Stream Classes     */
export const ListOfStreamersClass = function () {
    this.list    = createListOfStreamers();
    this.init    = function () {
        let i;                       
        for (i=0; i < maxSTREAMERS; i++) {
             this.list[i].init();
        }
    };
};

var streamClass = function (n) {      
    this.stream = createStreamer();
    this.init   = function () {
        this.row          = 0;
        this.column       = n;
        this.headPosition = 0;
        this.streamLength = randomStreamLength();
        this.speedSetting = Math.floor(Math.random()*65) + 5;                       // random and arbitrary speed between 5 and 70
    };                
};



//--------------------------------------------------------------------------------------------------------------
/*      Matrix Logic --> Stream Functions       */


function randomStreamLength() {
    return Math.floor((Math.random() * maxCHARACTERS/2) + minCHARACTERS);           // confusing but i want the reader to get a sense that it is a random length between the minCHARACTERS & maxCHARACTERS
}

function createStreamer() {
    let streamer = [];                                                              // an array of CHARACTERS defined above
    let lengthOfStream = randomStreamLength();
    let i;         
    for (i=0; i<lengthOfStream;i++) {
        let index = Math.floor(Math.random() * CHARACTERS.length);
        streamer[i] = CHARACTERS[index];
    }
    return streamer;
}

function createListOfStreamers() {
    let list = [];
    let i;
    for (i=0; i<maxSTREAMERS; i++) {
        list[i] = new streamClass(i);
    }
    return list;
}



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

