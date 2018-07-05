# gif-capture-canvas

Capture a canvas with an animated gif (using [jsgif](https://github.com/antimatter15/jsgif)).

[Demo](https://abagames.github.io/gif-capture-canvas/index.html?lineart)

[![demo](https://abagames.github.io/gif-capture-canvas/demo.gif)](https://abagames.github.io/gif-capture-canvas/index.html?lineart)

### Usage

- Include [build/index.js](https://github.com/abagames/gif-capture-canvas/blob/master/build/index.js) script or install from npm.

```
% npm i gif-capture-canvas
```

- Capture HTMLCanvasElement in a requestAnimationFrame loop.

see: [src/samples/lineart.ts](https://github.com/abagames/gif-capture-canvas/blob/master/src/samples/lineart.ts)

```js
// capture the canvas
gcc.capture(canvas);
```

- Push the capturing key (default: 'C') to output an animated gif.

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
  quality: 10,
  downloadFileName: null
});
```
