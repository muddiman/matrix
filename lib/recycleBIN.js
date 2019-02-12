// function displayStreamers(streamList) {
  /* column = Math.floor(Math.random() * maxCOLUMNS);
  for (column=0;column<maxCOLUMNS;column++) {
      let randomTime = Math.floor(Math.random() * 10000);
      setTimeout(() => {  }, randomTime);
      let stream = streamList[column];   
      for (row = 0; row < stream.length; row++) {
          CONTEXT.font = "12px monaco";
          CONTEXT.fillStyle = "rgba(0, 255, 0,  1.0)";  // green, opaque             
          CONTEXT.fillText(stream[row], column * 10, (headPosition * 15) - (row * 15));
          // row = (row + 1) % stream.length;
        }
}   
  headPosition = (headPosition + 1) % maxROWS;
  if (headPosition >= maxROWS - 1) {
    column = (column + 1) % maxCOLUMNS;
  }
  */

  /*
    rgba(254,254,254, 1.0) white
    rgba(127,254,127,1.0) 
    rgba(0,254,0, 1.0) green
  */
 //     timer = (timer + 1) % REFRESH_RATE;         // every sec
 //for (column=0;column<10;column++) {
    // speed = Math.floor(Math.random()*10) + 10;
    // let speed = 15;             // speed between 10 and 20
    // let stream = streamList[column]; 
    displaySingleStream(streamLayerObj, column);
    displaySingleStream(streamLayerObj2, 1);
    //displaySingleStream(streamList[1], 1, 10);
    // displaySingleStream(streamList[2], 2, 19);     
 //}
 // counter = (counter + 1) % maxCount;
 // speed = Math.floor(Math.random()*10) + 10;
 /*
 let speed = 12;             // speed between 10 and 20
 let stream = streamList[column]; 
 displaySingleStream(stream, column, speed);
 */
}

function _updateScreen() {
    // clear screen
    // CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    // draw new content
    CONTEXT.font = "12px monaco";
    CONTEXT.fillStyle = "rgba(0, 255, 0,  1.0)"; // green, opaque
    
      let randCharArray = randomize(CHARACTERS);
      // for (i=0; i<randCharArray.length; i++) {                
        CONTEXT.fillText(randCharArray[row], column * 10, row * 15);
        row =(row + 1)%35;
        if (row===0) {
            column = Math.floor(Math.random() * 120);
        }
      
   
  
  }

  /*
function stop() {
  clearInterval(animate);
}
*/
// streaming function
function streamingCharacters() {
    // null;
}                        
var column=0;
var row=0;



function displaySingleStream(stream, line, speedSetting) {
    // stream = streamList[column];   
    for (row = 0; row < stream.length; row++) {
        CONTEXT.font = "12px monaco";
        CONTEXT.fillStyle = "rgba(0, 255, 0,  1.0)";  // green, opaque             
        CONTEXT.fillText(stream[row], line * 10, (headPosition * 15) - (row * 15));
        // row = (row + 1) % stream.length;
    }
    headPosition = (headPosition + speedSetting/100) % maxROWS;
}



function displayStreamers(streamList) {
    /* column = Math.floor(Math.random() * maxCOLUMNS);
    for (column=0;column<maxCOLUMNS;column++) {
        let randomTime = Math.floor(Math.random() * 10000);
        setTimeout(() => {  }, randomTime);
        let stream = streamList[column];   
        for (row = 0; row < stream.length; row++) {
            CONTEXT.font = "12px monaco";
            CONTEXT.fillStyle = "rgba(0, 255, 0,  1.0)";  // green, opaque             
            CONTEXT.fillText(stream[row], column * 10, (headPosition * 15) - (row * 15));
            // row = (row + 1) % stream.length;
          }
  }   
    headPosition = (headPosition + 1) % maxROWS;
    if (headPosition >= maxROWS - 1) {
      column = (column + 1) % maxCOLUMNS;
    }
    */
  
    /*
      rgba(254,254,254, 1.0) white
      rgba(127,254,127,1.0) 
      rgba(0,254,0, 1.0) green
    */
   //     timer = (timer + 1) % REFRESH_RATE;         // every sec
   //for (column=0;column<10;column++) {
      // speed = Math.floor(Math.random()*10) + 10;
      // let speed = 15;             // speed between 10 and 20
      // let stream = streamList[column]; 
      displaySingleStream(streamLayerObj, column);
      displaySingleStream(streamLayerObj2, 1);
      //displaySingleStream(streamList[1], 1, 10);
      // displaySingleStream(streamList[2], 2, 19);     
   //}
   // counter = (counter + 1) % maxCount;
   // speed = Math.floor(Math.random()*10) + 10;
   /*
   let speed = 12;             // speed between 10 and 20
   let stream = streamList[column]; 
   displaySingleStream(stream, column, speed);
   */
  }

  
function buildScreen() {
    CONTEXT.font = "12px monaco";
    CONTEXT.fillStyle = "rgba(0, 255, 0,  1.0)"; // green, opaque
    for (n=0; n < 120; n++) {
      let randCharArray = randomize(CHARACTERS);
      for (i=0; i<randCharArray.length; i++) {                
        CONTEXT.fillText(randCharArray[i], n * 10, i * 15);
      }
    }
  }
  
  function randomize(charArr) {
    for (j=0; j<charArr.length; j++) {
      let temporaryPlaceHolder = charArr[j];
      let randomIndex = Math.floor(Math.random() * charArr.length);
      charArr[j] = charArr[randomIndex];
      charArr[randomIndex] = temporaryPlaceHolder;
    }
    return charArr;
  }
  
/*      OBJECT PROPERTIES       
var CANVAS = document.createElement("canvas");
CANVAS.id = "matrix_screen";
CANVAS.width = 1200;
CANVAS.height = 500;
CANVAS.style="background-color: rgba(0, 0, 0, 255);";  
const CONTEXT = CANVAS.getContext("2d");
document.body.appendChild(CANVAS);
var animate = setInterval(__updateFrame__, INTERVAL);

var row=0;
var column=0;
var headPosition=0;
var speedSetting=15;
var stream=createStreamer();


var streamLayerObj = {
    //  using html canvas to superimpose transparent layers on each other such that streams can be animated at different speeds
    stream        : createStreamer(),
    CANVAS        : document.createElement("canvas"),
    init          :  function () {
                      this.CANVAS.width  = WIDTH;
                      this.CANVAS.height = HEIGHT;
                      this.CANVAS.id = "matrix_screen";
                      this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, 255); z-index: 0;`;
                      document.body.appendChild(this.CANVAS);
                      this.CONTEXT = this.CANVAS.getContext("2d");
                      this.row          = 0;
                      this.column       = 0;
                      this.headPosition = 0;
                      this.speedSetting = Math.floor(Math.random()*10) + 10;
                      this.animate = setInterval(__updateFrame__, INTERVAL);
                    },
    // CONTEXT       : this.CANVAS.getContext("2d"),

    stop          : function () {
                        clearInterval(this.animate);
                    },
    clear         : function () {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    }                
};

var streamLayerObj2 = {
    //  using html canvas to superimpose transparent layers on each other such that streams can be animated at different speeds
    stream        : createStreamer(),
    CANVAS        : document.createElement("canvas"),
    init          :  function () {
                      this.CANVAS.width  = WIDTH;
                      this.CANVAS.height = HEIGHT;
                      this.CANVAS.id = "matrix_screen1";
                      this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, 0); z-index: 1;`;
                      document.body.appendChild(this.CANVAS);
                      this.CONTEXT = this.CANVAS.getContext("2d");
                      this.row          = 0;
                      this.column       = 1;
                      this.headPosition = 0;
                      this.speedSetting = Math.floor(Math.random()*10) + 10;
                      this.animate = setInterval(__updateFrame__, INTERVAL);
                    },
    // CONTEXT       : this.CANVAS.getContext("2d"),

    stop          : function () {
                        clearInterval(this.animate);
                    },
    clear         : function () {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    }                
};
*/
        this.CANVAS.width  = WIDTH;
        this.CANVAS.height = HEIGHT;
        this.CANVAS.id = `screen${n}`;
        this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${alpha}); z-index: ${n}`;
        document.body.appendChild(this.CANVAS);
        this.CONTEXT = this.CANVAS.getContext("2d");      
        
        
            /*    this.animate = setInterval(__updateFrame__, INTERVAL);
    };
    this.stop = function () {
        clearInterval(this.animate);
    };
    this.clear = function () {
        this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);        */

        
listOfStreamers[0] = new streamClass(0); 
listOfStreamers[1] = new streamClass(1);
listOfStreamers[2] = new streamClass(2);
listOfStreamers[3] = new streamClass(3);
listOfStreamers[4] = new streamClass(4);
listOfStreamers[5] = new streamClass(5);
listOfStreamers[6] = new streamClass(6);
listOfStreamers[7] = new streamClass(7);
listOfStreamers[8] = new streamClass(8);


function loadTheMatrix() {
    return new Promise((resolve) => {
    for (i=0; i < maxSTREAMERS; i++) {
       // if (i===0) {
            listOfStreamers[i] = new streamClass(i);
        //} else {
           // listOfStreamers[i] = new streamClass(i, TRANSPARENT);
       // }
       resolve(listOfStreamers);
       //reject(console.error());
       
    }
});
}



loadTheMatrix().then(runTheMatrix());



function screenClass(n, alpha) {                            // shouldbe converted to an object since only one instance was needed
    this.CANVAS = document.createElement("canvas");
    this.init = function () {
        this.CANVAS.width  = WIDTH;
        this.CANVAS.height = HEIGHT;
        this.CANVAS.id = `screen${n}`;
        this.CANVAS.style  = `position: absolute; background-color: rgba(0, 0, 0, ${alpha}); z-index: ${n}`;        // n = 0 or 1 && alpha = OPAQUE(1.0) or TRANSPARENT(0) or 15% TRANSLUCENT (0.85) 
        document.body.appendChild(this.CANVAS);
        this.CONTEXT = this.CANVAS.getContext("2d"); 
        this.animate = setInterval(__updateFrame__, INTERVAL);
    };
    this.stop = function () {
        clearInterval(this.animate);
    };
    this.clear = function () {
        this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
    };   
}
