// GifCaptureCanvas (https://github.com/abagames/GifCaptureCanvas)
// capture a canvas with an animated gif

declare class GifCaptureCanvas {
	durationSec: number;
	fps: number;
	scale: number;
	width: number;
	height: number;
	keyCode: number;
	
	constructor();
	capture(element: any);
}
