//  filename:   stream.mjs
//  path:       /lib/stream.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Matrix Module    (generates the character streams & contains all logic required to execute)                        
*/

/*  the globals */
const CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '$', '#', '%', '^', '&', '*', '(', ')', '-', '=', '+', '{', '?', '>'];
const maxSTREAMERS              = Math.floor( window.innerWidth/10 );                                         // width of window determines number of streamers

/*  exports */
export const minCHARACTERS      = Math.floor( window.innerHeight/15 );
       const maxCHARACTERS      = 2 * minCHARACTERS;


//---------------------------------------------------------------------------------------------------------------

/*                                                                       THE STREAM CLASSES                                                                      */
//  the collection of streams
export var ListOfStreamersClass = function () {
    /*  Properties   */
    this.list    = this.createListOfStreamers();
    /*  Methods  */
    this.init    = function () {
                    let i;                       
                    for (i=0; i < maxSTREAMERS; i++) {
                        this.list[i].init(i);
                    }
                };
};

/*  Prototypes  */
ListOfStreamersClass.prototype.getList               = function () {                                        // List  getter
                                                        return this.list;
                                                    };
ListOfStreamersClass.prototype.createListOfStreamers = function () {
                                                        let list = [];
                                                        // let i;
                                                        for (let i=0; i<maxSTREAMERS; i++) {
                                                            list[i] = new streamClass(i);
                                                        }
                                                        return list;
                                                     };

//  single stream of characters
var streamClass     = function (n) {
    // Properties      
    this.stream           = this.createStreamer();
    this.row              = 0;
    this.column           = n;
    this.headPosition     = 0;
    this.streamLength     = this.randomStreamLength();
    this.speedSetting     = Math.floor(Math.random()*100) + 5; 
    // Methods
    this.init = function (n) {
        this.row          = 0;
        this.column       = n;
        this.headPosition = 0;
        this.streamLength = this.randomStreamLength();
        this.speedSetting = Math.floor(Math.random()*100) + 5;                   // random and arbitrary speed between 5 and 70
    }; 
};                      
/*  Prototypes  */
streamClass.prototype.getStream             = function () {                                                             //  stream getter
                                                return this.stream;
                                            }; 
streamClass.prototype.randomStreamLength    = function () {
                                                return Math.floor((Math.random() * maxCHARACTERS/2) + minCHARACTERS);           // confusing but i want the reader to get a sense that it is a random length between the minCHARACTERS & maxCHARACTERS
                                            };
streamClass.prototype.createStreamer        = function () {
                                                let streamer = [];                                                              // an array of CHARACTERS defined above
                                                let lengthOfStream = this.randomStreamLength();
                                                for (let i=0; i<lengthOfStream;i++) {
                                                    let index = Math.floor(Math.random() * CHARACTERS.length);
                                                    streamer[i] = CHARACTERS[index];
                                                }
                                                return streamer;
                                            };                                  

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
/*                                                      REGULAR ASS FUNCTIONS                                                       */

async function loadCHARACTERS() { 
    const assetManager = new AssetManager();
    return await assetManager.fetchDataFile('/lib/characters.JSON'); 
} 


//--------------------------------------------------------------------------------------------------------------






/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   2.0.1
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/Matrix
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 2.0.1) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */

