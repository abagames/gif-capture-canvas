// GifCaptureCanvas (https://github.com/abagames/GifCaptureCanvas)
// capture a canvas with an animated gif

declare class GifCaptureCanvas {
	durationSec: number;
	scale: number;
	keyCode: number;
	
	constructor();
	setFps(capturingFps?: number, appFps?: number);
	capture(element: any);
	captureSvg(svgElm: any);
	end();
}
