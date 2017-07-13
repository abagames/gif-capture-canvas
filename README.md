gif-capture-canvas
======================

Capture a canvas with an animated gif.

![demo](http://abagames.sakura.ne.jp/15/GifCaptureCanvas/demo.gif)

See [the demo](https://abagames.github.io/gif-capture-canvas/).

### Usage

* Include the library.

```html
  <script src="docs/libs/gcc/index.js"></script>
```

* Capture HTMLCanvasElement.

see: [src/sample/index.ts](https://github.com/abagames/gif-capture-canvas/blob/master/src/sample/index.ts)

```js
	// capture the canvas
	gcc.capture(canvas);
```

* Push the capturing key (default: 'C') to output an animated gif.

#### Configuration

```js
  // set options (default values are shown below)
  gcc.setOptions({
    scale: 0.5,
    durationSec: 3,
    keyCode: 67, // 'C'
    capturingFps: 20,
    appFps: 60,
    isAppendingImgElement: true,
    quality: 10
  });
```

### Acknowledgement

[jsgif](https://github.com/antimatter15/jsgif)
