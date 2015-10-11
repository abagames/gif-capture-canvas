/// <reference path='../GifCaptureCanvas.ts' />
var gifCaptureCanvas;
var canvas;
var context;
var ticks = 0;
var x;
var y;
var mvx;
var mvy;
window.onload = function () {
    canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, 256, 256);
    gifCaptureCanvas = new GifCaptureCanvas();
    // set a capturing fps
    // default: (capturing: 20 fps, app: 60 fps)
    gifCaptureCanvas.setFps(20, 60);
    // set a capturing time duration (seconds.)
    // default: 3 seconds
    gifCaptureCanvas.durationSec = 3;
    // set a scaling of a capturing screen size
    // default: 0.5
    gifCaptureCanvas.scale = 0.5;
    // set a keycode of a capturing key
    // default: 67 ('C')
    gifCaptureCanvas.keyCode = 67;
    x = getRandomInt(256);
    y = getRandomInt(256);
    mvx = (Math.random() + 2) * (getRandomInt(2) * 2 - 1);
    mvy = (Math.random() + 2) * (getRandomInt(2) * 2 - 1);
    requestAnimationFrame(update);
};
function update() {
    requestAnimationFrame(update);
    context.strokeStyle = '#' +
        Math.floor(Math.sin(ticks * 0.01) * 4 + 5) +
        Math.floor(Math.cos(ticks * 0.015) * 4 + 5) +
        Math.floor(Math.sin(ticks * 0.018) * 4 + 5);
    context.beginPath();
    context.moveTo(128, 128);
    context.lineTo(x, y);
    context.stroke();
    x += mvx;
    y += mvy;
    if (x < 0 || x > 256) {
        mvx *= -1;
    }
    if (y < 0 || y > 256) {
        mvy *= -1;
    }
    // capture the canvas
    gifCaptureCanvas.capture(canvas);
    ticks++;
}
function getRandomInt(to) {
    return Math.floor(Math.random() * to);
}
//# sourceMappingURL=demo.js.map