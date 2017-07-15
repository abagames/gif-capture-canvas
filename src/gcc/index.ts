declare const require: any;
const GIFEncoder = require('jsgif');

export let options = {
  scale: 0.5,
  durationSec: 3,
  keyCode: 67, // 'C'
  capturingFps: 20,
  appFps: 60,
  isAppendingImgElement: true,
  quality: 10,
  downloadFileName: null
};
let contextsNum: number;
let contexts: CanvasRenderingContext2D[];
let isCaptured: boolean[];
let index = 0;
let frameCount = 0;
let image = new Image();
let isInfiniteDuration = false;

export function capture(element: any) {
  frameCount++;
  const capturePerFrame = options.appFps / options.capturingFps;
  if (frameCount < capturePerFrame) {
    return;
  }
  frameCount -= capturePerFrame;
  if (!contexts) {
    begin(element);
  }
  if (isInfiniteDuration) {
    contexts.push(createContext(element));
  }
  contexts[index].drawImage(element, 0, 0);
  if (!isInfiniteDuration) {
    isCaptured[index] = true;
  }
  index++;
  if (!isInfiniteDuration && index >= contextsNum) {
    index = 0;
  }
}

export function captureSvg(svgElm: any) {
  const capturePerFrame = options.appFps / options.capturingFps;
  if (frameCount + 1 < capturePerFrame) {
    frameCount++;
    return;
  }
  const svgXml = new XMLSerializer().serializeToString(svgElm);
  image.src = "data:image/svg+xml;base64," + btoa(svgXml);
  capture(image);
}

function begin(element: any) {
  if (isInfiniteDuration) {
    contexts = [];
  } else {
    contextsNum = options.durationSec * options.capturingFps;
    contexts = times(contextsNum, () => createContext(element));
    isCaptured = times(contextsNum, () => false);
  }
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.keyCode == options.keyCode) {
      end();
    }
  });
}

function createContext(element: any) {
  const cvs = document.createElement('canvas');
  cvs.width = element.width * options.scale;
  cvs.height = element.height * options.scale;
  const ctx = cvs.getContext('2d');
  ctx.scale(options.scale, options.scale);
  return ctx;
}

export function end() {
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(1000 / options.capturingFps);
  encoder.setQuality(options.quality);
  encoder.start();
  if (isInfiniteDuration) {
    times(index - 1, i => {
      encoder.addFrame(contexts[i]);
    });
  } else {
    let idx = index;
    times(contextsNum, () => {
      if (isCaptured[idx]) {
        encoder.addFrame(contexts[idx]);
      }
      idx++;
      if (idx >= contextsNum) {
        idx = 0;
      }
    });
  }
  encoder.finish();
  if (options.downloadFileName != null) {
    encoder.download(options.downloadFileName);
    return null;
  }
  const binaryGif = encoder.stream().getData();
  const imgElement = document.createElement('img');
  imgElement.src = 'data:image/gif;base64,' + encode64(binaryGif);
  if (options.isAppendingImgElement) {
    document.getElementsByTagName('body')[0].appendChild(imgElement);
  }
  return imgElement;
}

function times(n: number, func: Function) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(func(i));
  }
  return result;
}

export function setOptions(_options) {
  for (let attr in _options) {
    options[attr] = _options[attr];
  }
  isInfiniteDuration = options.durationSec <= 0;
}

// https://github.com/antimatter15/jsgif/blob/master/b64.js
function encode64(input) {
  var output = "", i = 0, l = input.length,
    key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  while (i < l) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) enc3 = enc4 = 64;
    else if (isNaN(chr3)) enc4 = 64;
    output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
  }
  return output;
}
