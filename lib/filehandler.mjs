//  file:   filehandler.js
//  path:   /lib/filehandler.js
/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Asset Management Module    (Classes and functions for file handling etc.)                        
*/

export const AssetManager = function () {
    // Properties
  this.dataFile    = null
    // Methods
 /* this.requestImage = function (file, callback) {
    let img = new Image();
    img.src = file;
    callback(img);
  };  */
};

// Prototypes
AssetManager.prototype.loadDataFile = function (file) {
  this.dataFile = file;
};

AssetManager.prototype.retrieveDataFile = function () {
  return this.dataFile;
};

//  working
AssetManager.prototype.requestJSON = function (url) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", () => {
      console.log(` "requestJSON()" callback executed.`);
      return JSON.parse(this.responseText);
  });
  request.open("GET", url);
  request.send();
};

AssetManager.prototype.getJSON = function (file, callback) {
  let data = [];
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(`getJSON callback executed.`);
      callback(JSON.parse(this.responseText));
    }
  };
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
  // console.log(data);
  return data;
};

AssetManager.prototype.getJSON2 = function (file) {
  let data = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(`getJSON2 callback executed.`);
      data = JSON.parse(this.responseText);
      console.log(`JSON2 finally returned: ${data.characters}`);
    }
  };
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
  console.log(`JSON2 returned: ${data}`);
  return data;
};  

AssetManager.prototype.getFile = function (file) {
  new Promise(function (resolve) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        resolve(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
  })
  .then((results) => {
    this.loadDataFile(results);
})
.catch(console.log(error)); 
};


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
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 1.0.0) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */
