//  file:   filehandler.js
//  path:   /lib/filehandler.js

/*
    Asset Management Module
    Classes and functions for file handling etc.
*/
export const AssetManager = function () {
    // Properties
    
    // Methods
   this.requestImage = function (file, callback) {
        let img = new Image();
        img.src = file;
        callback(img);
    };
};

// Prototypes
AssetManager.prototype.requestJSON = function (url, callback) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", (event) => {
        callback(JSON.parse(this.responseText));
    });

    request.open("GET", url);
    request.send();
};

AssetManager.prototype.getJSON = function (file, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = async function() {
    if (this.readyState == 4 && this.status == 200) {
       await callback(JSON.parse(this.responseText));
      // var myObj = JSON.parse(this.responseText);
      // document.getElementById("demo").innerHTML = myObj.name;
    }
  };
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
};  