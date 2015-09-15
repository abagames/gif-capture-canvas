GifCaptureCanvas
======================

Capture a canvas with an anmiated gif.

![demo](http://abagames.sakura.ne.jp/15/GifCaptureCanvas/demo.gif)

### Usage

* Include libraries to HTML.

```html
    <script src="libs/GIFEncoder/LZWEncoder.js"></script>
    <script src="libs/GIFEncoder/NeuQuant.js"></script>
    <script src="libs/GIFEncoder/b64.js"></script>
    <script src="libs/GIFEncoder/GIFEncoder.js"></script>
    <script src="GifCaptureCanvas.js"></script>
```

* Construct GifCaptureCanvas.

```ts
	gifCaptureCanvas = new GifCaptureCanvas();
```

* Capture HTMLCanvasElement.

```ts
	// since the capturing fps = 20,
	// the canvas should be captured once per 3 (60/20) frames
	if (ticks % 3 == 0) {
		gifCaptureCanvas.capture(canvas);
	}
```

* Push the capturing key (default: 'C') to output an animated gif.

#### Configuration

```ts
	// set a capturing time duration (seconds.)
	// default: 3 seconds
	gifCaptureCanvas.durationSec = 3;
	// set a capturing fps
	// default: 20 fps
	gifCaptureCanvas.fps = 20;
	// set a scaling of a capturing screen size
	// default: 0.5
	gifCaptureCanvas.scale = 0.5;
	// set a keycode of a capturing key
	// default: 67 ('C')
	gifCaptureCanvas.keyCode = 67;
```

### Acknowledgement

[jsgif](https://github.com/antimatter15/jsgif)

License
----------
MIT
