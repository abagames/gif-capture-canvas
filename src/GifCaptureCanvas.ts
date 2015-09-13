// GifCaptureCanvas (https://github.com/abagames/GifCaptureCanvas)
//  capture a canvas with an animated gif

/// <reference path='../typings/lodash/lodash.d.ts' />
declare var GIFEncoder: any;
declare var encode64: any;

class GifCaptureCanvas {
	durationSec = 3;
	fps = 20;
	scale = 0.5;
	width = 640;
	height = 480;
	keyCode = 67; // 'C'
	
	contextsNum: number;
	contexts: CanvasRenderingContext2D[];
	isCaptured: boolean[];
	index = 0;

	constructor() { }

	capture(element: any) {
		if (!this.contexts) {
			this.begin();
		}
		this.contexts[this.index].drawImage(element, 0, 0);
		this.isCaptured[this.index] = true;
		this.index++;
		if (this.index >= this.contextsNum) {
			this.index = 0;
		}
	}

	begin() {
		this.contextsNum = this.durationSec * this.fps;
		this.contexts = _.times(this.contextsNum, () => {
			var cvs = document.createElement('canvas');
			cvs.width = this.width * this.scale;
			cvs.height = this.height * this.scale;
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
		encoder.setDelay(1000 / this.fps);
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
