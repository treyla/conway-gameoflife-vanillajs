import Game from './modules/Game.js';

const GAME_MATRIX_COLUMN_CNT = 40;
const GAME_MATRIX_ROW_CNT = 40;

const GAME = new Game(
  GAME_MATRIX_COLUMN_CNT,
  GAME_MATRIX_ROW_CNT,
);

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
