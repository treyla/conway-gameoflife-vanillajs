import Game from './modules/Game.js';

const GAME_MATRIX_COLUMN_CNT = 25;
const GAME_MATRIX_ROW_CNT = 25;

const GAME = new Game(
  document.getElementById('gameCanvas'),
  GAME_MATRIX_COLUMN_CNT,
  GAME_MATRIX_ROW_CNT,
);


document.getElementById('btnStop').addEventListener('click', GAME.stop.bind(GAME), false);
document.getElementById('btnReset').addEventListener('click', GAME.reset.bind(GAME), false);
