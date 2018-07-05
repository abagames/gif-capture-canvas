import * as gcc from '../index';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let ticks = 0;
let x: number;
let y: number;
let mvx: number;
let mvy: number;

window.onload = () => {
  canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  document.body.appendChild(canvas);
  context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 256, 256);
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
  const p = document.createElement('p');
  p.innerText = 'Push [C] to capture';
  document.body.appendChild(p);
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
  // capture the canvas
  gcc.capture(canvas);
  ticks++;
}

function getRandomInt(to: number) {
  return Math.floor(Math.random() * to);
}
