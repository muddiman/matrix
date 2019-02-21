//  file:   filehandler.js
//  path:   /lib/filehandler.js
const AssetManager = function () {
    // Properties
 
    // Methods
    requestJSON = function (url, callback) {
            let request = new XMLHttpRequest();
            request.addEventListener("load", (event) => {
                callback(JSON.parse(this.responseText));
            });

            request.open("GET", url);
            request.send();
        };

    requestImage = function (file, callback) {
        let img = new Image();
        img.src = file;
        callback(img);
    };
};