/// <reference path='GifCaptureCanvas.ts' />

var gifCaptureCanvas: GifCaptureCanvas;
var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var ticks = 0;
var x: number;
var y: number;
var mvx: number;
var mvy: number;

window.onload = () => {
	canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.fillStyle = '#fff';
	context.fillRect(0, 0, 256, 256);
	gifCaptureCanvas = new GifCaptureCanvas();
	// set a capturing time duration (seconds.)
	// default: 3 seconds
	gifCaptureCanvas.durationSec = 3;
	// set a capturing fps
	// default: 20 fps
	gifCaptureCanvas.fps = 20;
	// set a scaling of a capturing screen size
	// default: 0.5
	gifCaptureCanvas.scale = 0.5;
	// set a size of the capturing canvas
	// default: 640 x 480
	gifCaptureCanvas.width = 256;
	gifCaptureCanvas.height = 256;
	// set a keycode of a capturing key
	// default: 67 ('C')
	gifCaptureCanvas.keyCode = 67;
	x = getRandomInt(256);
	y = getRandomInt(256);
	mvx = (Math.random() + 2) * (getRandomInt(2) * 2 - 1);
	mvy = (Math.random() + 2) * (getRandomInt(2) * 2 - 1);
	requestAnimationFrame(update);
}

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
	// since the capturing fps = 20,
	// the canvas should be captured once per 3 (60/20) frames
	if (ticks % 3 == 0) {
		gifCaptureCanvas.capture(canvas);
	}
	ticks++;
}

function getRandomInt(to: number) {
	return Math.floor(Math.random() * to);
}
