// GifCaptureCanvas (https://github.com/abagames/GifCaptureCanvas)
//  capture a canvas with an animated gif

/// <reference path='../typings/lodash/lodash.d.ts' />
declare var GIFEncoder: any;
declare var encode64: any;

class GifCaptureCanvas {
	durationSec = 3;
	scale = 0.5;
	keyCode = 67; // 'C'
	
	contextsNum: number;
	contexts: CanvasRenderingContext2D[];
	isCaptured: boolean[];
	index = 0;
	capturingFps = 20;
	appFps = 60;
	capturePerFrame = 3; // 60 / 20
	frameCount = 0;

	constructor() { }
	
	setFps(capturingFps: number = 20, appFps: number = 60) {
		this.capturingFps = capturingFps;
		this.appFps = appFps;
		this.capturePerFrame =  this.appFps / this.capturingFps;
	}

	capture(element: any) {
		this.frameCount++;
		if (this.frameCount < this.capturePerFrame) {
			return;
		}
		this.frameCount -= this.capturePerFrame;
		if (!this.contexts) {
			this.begin(element);
		}
		this.contexts[this.index].drawImage(element, 0, 0);
		this.isCaptured[this.index] = true;
		this.index++;
		if (this.index >= this.contextsNum) {
			this.index = 0;
		}
	}

	begin(element: any) {
		this.contextsNum = this.durationSec * this.capturingFps;
		this.contexts = _.times(this.contextsNum, () => {
			var cvs = document.createElement('canvas');
			cvs.width = element.width * this.scale;
			cvs.height = element.height * this.scale;
			var ctx = cvs.getContext('2d');
			ctx.scale(this.scale, this.scale);
			return ctx;
		});
		this.isCaptured = _.times(this.contextsNum, () => false);
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.keyCode == this.keyCode) {
				this.end();
			}
		});
	}

	end() {
		var encoder = new GIFEncoder();
		encoder.setRepeat(0);
		encoder.setDelay(1000 / this.capturingFps);
		encoder.start();
		var idx = this.index;
		_.times(this.contextsNum, () => {
			if (this.isCaptured[idx]) {
				encoder.addFrame(this.contexts[idx]);
			}
			idx++;
			if (idx >= this.contextsNum) {
				idx = 0;
			}
		});
		encoder.finish();
		var binaryGif = encoder.stream().getData();
		window.location.href =
		'data:image/gif;base64,' + encode64(binaryGif);
	}
}
