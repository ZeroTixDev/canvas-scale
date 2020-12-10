'use strict';

require('./style.css');
const math = require('improved-math');
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
document.body.appendChild(canvas);
window.scaleMode = 'ratio';
window.view = 0;
scaleCanvas(window.scaleMode);
window.addEventListener('keyup', ({ keyCode }) => {
   if (keyCode !== 84) {
      if (keyCode === 82) {
         window.view = !window.view;
         draw();
         return;
      } else {
         return;
      }
   }
   if (window.scaleMode === 'ratio') {
      window.changeMode('dynamic');
   } else if (window.scaleMode === 'dynamic') {
      window.changeMode('ratio');
   }
});
window.addEventListener('resize', () => {
   scaleCanvas(window.scaleMode);
});

function scaleCanvas(mode) {
   if (mode === 'ratio') {
      ratioScale(canvas);
   } else if (mode === 'dynamic') {
      dynamicScale(canvas);
   }
   draw();
}
// scaling to fit
function ratioScale(canvas) {
   canvas.width = GAME_WIDTH;
   canvas.height = GAME_HEIGHT;
   const winw = window.innerWidth;
   const winh = window.innerHeight;
   const scale = Math.min(winw / canvas.width, winh / canvas.height);
   canvas.style.transform = 'scale(' + scale + ')';
   canvas.style.left = (winw - canvas.width) / 2 + 'px';
   canvas.style.top = (winh - canvas.height) / 2 + 'px';
}
//scaling to whole screen
function dynamicScale(canvas) {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   canvas.style.transform = 'scale(1)';
   canvas.style.left = 0 + 'px';
   canvas.style.top = 0 + 'px';
}
function getRatio() {
   return Math.max(window.innerHeight, window.innerWidth * (9 / 16)) / 1000;
}
function offset({ x = 0, y = 0 } = {}) {
   return {
      x: Math.round((x - GAME_WIDTH / 2) * getRatio() + canvas.width / 2),
      y: Math.round((y - GAME_HEIGHT / 2) * getRatio() + canvas.height / 2),
   };
}
function draw() {
   ctx.fillStyle = window.view ? 'black' : 'white';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   if (window.scaleMode === 'dynamic') {
      ctx.fillStyle = 'white';
      if (window.view) {
         ctx.fillRect(
            offset({ x: 200 }).x,
            offset({ y: 200 }).y,
            offset({ x: GAME_WIDTH }).x - offset({ x: 400 }).x,
            offset({ y: GAME_HEIGHT }).y - offset({ y: 400 }).y
         );
      }
      ctx.fillStyle = 'black';
      ctx.fontDynamic(100, 'Arial');
      ctx.fillText('canvas scale', offset({ x: GAME_WIDTH / 2 }).x, offset({ y: GAME_HEIGHT / 2 }).y);
      ctx.fontDynamic(70, 'Arial');
      ctx.fillText('[dynamic mode]', offset({ x: GAME_WIDTH / 2 }).x, offset({ y: GAME_HEIGHT / 2 + 100 }).y);
      ctx.fontDynamic(40, 'Arial');
      ctx.fillText('r and t', offset({ x: GAME_WIDTH / 2 }).x, offset({ y: GAME_HEIGHT / 2 + 150 }).y);
   } else {
      ctx.fillStyle = 'white';
      if (window.view) {
         ctx.fillRect(200, 200, canvas.width - 400, canvas.height - 400);
      }
      ctx.fillStyle = 'black';
      ctx.font = `100px Arial`;
      ctx.fillText('canvas scale', canvas.width / 2, canvas.height / 2);
      ctx.font = `70px Arial`;
      ctx.fillText('[fit mode]', canvas.width / 2, canvas.height / 2 + 100);
      ctx.font = `40px Arial`;
      ctx.fillText('r and t', canvas.width / 2, canvas.height / 2 + 150);
   }
}
window.changeMode = function (mode) {
   window.scaleMode = mode;
   scaleCanvas(window.scaleMode);
};
CanvasRenderingContext2D.prototype.fontDynamic = function (value, type) {
   this.font = `${value * getRatio()}px ${type}`;
};
