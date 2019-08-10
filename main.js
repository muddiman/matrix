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
 *  @version   2.1.0
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
const FPS = 24;
const IDLE_TIME   = 4000;   //  in milliseconds
const TRANSPARENT =    0;
const TRANSLUCENT =  0.8;
const OPAQUE      =  1.0;
const FONT_SIZE   = `12`;
const FONT_SIZE13 = `13`;
const FONT_SIZE14 = `14`;
const FONT        = `monaco`;
const WIDTH       = window.innerWidth;
const HEIGHT      = window.innerHeight;
const maxCOLUMNS  = Math.floor(WIDTH/10);
const CHARACTERS  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '$', '#', '%', '^', '&', '*', '(', ')', '-', '=', '+', '{', '?', '>'];
const maxSTREAMERS= Math.floor( window.innerWidth/10 );                                         // width of window determines number of streamers
const minCHARACTERS= Math.floor( window.innerHeight/15 );
const maxCHARACTERS= 2 * minCHARACTERS;
const maxROWS = minCHARACTERS + 50 ;                        // 50 acts as a buffer
var darkness, delayMatrix;
 
/*  the imports */
// import { Matrix   } from "/lib/matrix.mjs";      //  Matrix

/*  CLASSES */
/*  THE STREAM CLASSES                                                                      */
//  the collection of streams
var ListOfStreamersClass = function () {
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

/*  the Matrix Class    */
var Matrix  = function () {
  // Properties
  this.streamersArr                     = new ListOfStreamersClass(); 
  // Methods                     
  this.init                             = function () {
                                            this.streamersArr = new ListOfStreamersClass();                      
                                        };
};
/*  Prototypes  */
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
//---------------------------------------------------------------------------------------------------------------------

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
      this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${this.alpha}); z-index: 0`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
      document.body.appendChild(this.CANVAS);
  };
};
/*  Prototypes  */ 
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

/*  Prototypes  */
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
var Display = function (_color) {
  // Properties
  this.streamAlpha = OPAQUE;
  this.color       = new Color(_color); 
  this.screen      = new Screen(WIDTH, HEIGHT);                //  instantiate a screen object from the screen class
  // this.buffer  = new Screen(WIDTH, HEIGHT);                     
};                          
/*  Prototypes  */
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
/*   Game Engine    */
const gEngine = function(time_step, update, render) {
  this.time_interval  = time_step;                // related to the games frame rate
  this.update         = update;                   // update function
  this.render         = render;                   // render function (undefined)
  this.time           = 0;                        // previous time_stamp
  this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
  this.isUpdated      = false;
  this.frameNo        = null;
  this.animate          = function () {
                          this.init(time_step, update, render);
                          // var n=0;                // for debugging
                          // var r=0;
                          // (async function () {
                          this.running = setInterval(async () => {
                              // render();
                             let time_stamp = Date.now();
                              if (this.time === 0) {
                                  this.time = time_stamp;
                              } 
                              this.accumulated_time += time_stamp - this.time;
                              // console.log(this.accumulated_time);                     // debugging
                              this.time = time_stamp;
                              await this.update();
                              await this.render();
                          /*  this check ensures the system won't crash trying to keep up with timely cycles 
                          it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                          if (this.accumulated_time >= this.time_interval * 3) {
                              this.accumulated_time = this.time_interval;
                              //  debug
                              n++;
                              // console.log(`A lot behind ${n}`);
                          }
                          /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                          while (this.accumulated_time >= this.time_interval) {
                              this.accumulated_time -= this.time_interval;
                              this.update();
                              this.isUpdated = true;
                          }
                          if (this.isUpdated === true) {       //  screen is drawn only when when the matrix is updated
                              this.render();
                              r++;                    //   debugging
                              this.isUpdated = false;
                          }
                        }, this.time_interval);
                      };
  this.start          = () => {
                          let time_stamp = Date.now();
                          if (this.time === 0) {
                              this.time = time_stamp;
                          } 
                          this.accumulated_time += time_stamp - this.time;
                          console.log
                          this.time = time_stamp;
                          this.update();
                          this.render();
                          /*  this check ensures the system won't crash trying to keep up with timely cycles 
                          it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                          if (this.accumulated_time >= this.time_interval * 3) {
                              this.accumulated_time = this.time_interval;
                          }
                          /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                          while (this.accumulated_time >= this.time_interval) {
                              this.accumulated_time -= this.time_interval;
                              this.update();
                              this.isUpdated = true;
                          }
                          if (this.isUpdated === true) {       //  screen is drawn only when when the matrix is updated
                              this.render();
                              this.isUpdated = false;
                          }
                          this.frameNo = requestAnimationFrame(this.start);
                      };                        
  this.stop           = () => {
                          if (this.frameNo) {
                              cancelAnimationFrame(this.frameNo);
                          } else {
                              clearInterval(this.running); 
                          }    
                      };
};
/*  Prototypes   */
gEngine.prototype.init = function (time_step, update, render) {
  this.time_interval    = time_step;                // related to the games frame rate
  this.update           = update;                   // update function
  this.render           = render;                   // render function (undefined)
  this.time             = 0;                        // previous time_stamp
  this.accumulated_time = 0;                        // amt. of time that has accumulated since last update fcn call
  this.isUpdated        = false;
  this.frameNo          = null;
};


var display = new Display("green");                                        
var matrix  = new Matrix();
var engine  = new gEngine(1000/FPS, () => {matrix.update();}, () => {display.render(matrix.getStreamersArr());});       


//-------------------------------------------------------------------------------------------------------------
/*  functions   */
//  event handling functions 
function loadListeners() {                            // affix listenners
  window.addEventListener("resize", removeMatrix);                           
  window.addEventListener("keydown", removeMatrix);
  window.addEventListener("touchmove", removeMatrix);
  display.screen.CANVAS.addEventListener("mousemove", removeMatrix);       
}

function removeListeners() {                          // 
  window.removeEventListener("resize", removeMatrix);
  window.removeEventListener("keydown", removeMatrix);
  window.removeEventListener("touchmove", removeMatrix);                     //  remove the event listeners
  display.screen.CANVAS.removeEventListener("mousemove", removeMatrix);
}

function resizeWindow() {                                           //  what to do when a 'resize' event occurs
  removeListeners();
  clearTimeout(darkness);                                                 //  clear the timeouts
  clearTimeout(delayMatrix);
  engine.stop();
  display.screen.clear(); 
  display.screen.setAlpha(TRANSPARENT);                                      //  resets the transparency cycle for getDarker function
  display.screen.resize();             
  display.screen.init();                                                     //  initialize screen with updated screen dimensions
  theMatrix();
}
//  Matrix functions
function theMatrix() {
  darkness = setTimeout( () => {                                         //  dim screen after 8 secs
    display.screen.getDarker(TRANSLUCENT);
    loadListeners();
    delayMatrix = setTimeout(() => {                                       //  go into the matrix after 10 secs
      matrix.streamersArr.init();
      display.screen.setAlpha(TRANSLUCENT);
      display.screen.init();
      engine.start();
    }, 3000);
  }, IDLE_TIME);
}

function removeMatrix() {
  removeListeners();
  clearTimeout(darkness);                                                 //  clear the timeouts
  clearTimeout(delayMatrix);
  engine.stop();
  display.screen.clear(); 
  display.screen.setAlpha(TRANSPARENT);                                      //  resets the transparency cycle for getDarker function
  display.screen.init();
  theMatrix();                                                               //  restart the program 
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


/*    SETTINGS    */
/*
var newMatrix = new Matrix({
  color     :     "green",
  speed     :     10,
  idleTime :     5000,         //  in milliseconds
});

matrix.delayMatrix();

*/

