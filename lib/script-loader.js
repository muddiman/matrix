/*  The Script Loader   */
function loadScript(url) {
    let tag = document.createElement('script');
    tag.setAttribute("type", "module");
    tag.setAttribute("src", url);
    body.appendChild(tag);
}

const script = [
    "/lib/display.mjs",
    "/lib/matrix.mjs",
    "/lib/engine.mjs",
    "/lib/stream.mjs"
];

script.forEach(file => {
    loadScript(file);
});