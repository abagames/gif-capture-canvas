// GifCaptureCanvas (https://github.com/abagames/GifCaptureCanvas)
//  capture a canvas with an animated gif
/// <reference path='../typings/lodash/lodash.d.ts' />
var GifCaptureCanvas = (function () {
    function GifCaptureCanvas() {
        this.durationSec = 3;
        this.fps = 20;
        this.scale = 0.5;
        this.keyCode = 67; // 'C'
        this.index = 0;
    }
    GifCaptureCanvas.prototype.capture = function (element) {
        if (!this.contexts) {
            this.begin(element);
        }
        this.contexts[this.index].drawImage(element, 0, 0);
        this.isCaptured[this.index] = true;
        this.index++;
        if (this.index >= this.contextsNum) {
            this.index = 0;
        }
    };
    GifCaptureCanvas.prototype.begin = function (element) {
        var _this = this;
        this.contextsNum = this.durationSec * this.fps;
        this.contexts = _.times(this.contextsNum, function () {
            var cvs = document.createElement('canvas');
            cvs.width = element.width * _this.scale;
            cvs.height = element.height * _this.scale;
            var ctx = cvs.getContext('2d');
            ctx.scale(_this.scale, _this.scale);
            return ctx;
        });
        this.isCaptured = _.times(this.contextsNum, function () { return false; });
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == _this.keyCode) {
                _this.end();
            }
        });
    };
    GifCaptureCanvas.prototype.end = function () {
        var _this = this;
        var encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(1000 / this.fps);
        encoder.start();
        var idx = this.index;
        _.times(this.contextsNum, function () {
            if (_this.isCaptured[idx]) {
                encoder.addFrame(_this.contexts[idx]);
            }
            idx++;
            if (idx >= _this.contextsNum) {
                idx = 0;
            }
        });
        encoder.finish();
        var binaryGif = encoder.stream().getData();
        window.location.href =
            'data:image/gif;base64,' + encode64(binaryGif);
    };
    return GifCaptureCanvas;
})();
//# sourceMappingURL=GifCaptureCanvas.js.map