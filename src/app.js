import Game from './modules/Game.js';

const GAME = new Game();

document.getElementById('btnSingleStep').addEventListener('click', GAME.singleStepGameLoop.bind(GAME), false);
document.getElementById('btnStart').addEventListener('click', GAME.startGameLoop.bind(GAME), false);
document.getElementById('btnStop').addEventListener('click', GAME.stopGameLoop.bind(GAME), false);
document.getElementById('btnReset').addEventListener('click', GAME.reset.bind(GAME), false);
document.getElementById('btnEmpty').addEventListener('click', GAME.empty.bind(GAME), false);
document.getElementById('speedSlider').addEventListener('change', (e) => {
  GAME.changeSpeed(e.target.value);
}, false);

GAME.canvas.addEventListener('click', (e) => {
  GAME.clickCell(e.x, e.y);
}, false);

window.addEventListener('resize', (e) => {
  GAME.resize(e.target.innerWidth, e.target.innerHeight);
}, false);
