import GameLoop from './GameLoop.js';
import Cell from './Cell.js';

const NEW_CELL_WIDTH_HEIGHT = 20; // since its a cube: width == height

const privateMethods = {
  draw() {
    const matrix = privateMethods.generateAndGetRandomModel.call(this);
    this.canvas2dContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let col = 0; col < this.columnCount; col += 1) {
      for (let row = 0; row < this.rowCount; row += 1) {
        const currentCell = matrix[col][row];
        this.canvas2dContext.fillRect(
          currentCell.positionX,
          currentCell.positionY,
          currentCell.width,
          currentCell.height,
        );
        if (currentCell.state === 0) {
          this.canvas2dContext.fillStyle = 'black';
        } else {
          this.canvas2dContext.fillStyle = 'green';
        }
      }
    }
  },
  generateAndGetRandomModel() {
    const matrix = new Array(this.columnCount);
    for (let col = 0; col < this.columnCount; col += 1) {
      matrix[col] = new Array(this.rowCount);
      for (let row = 0; row < this.rowCount; row += 1) {
        const cellState = Math.round(Math.random());
        const cellPositionX = col * NEW_CELL_WIDTH_HEIGHT;
        const cellPositionY = row * NEW_CELL_WIDTH_HEIGHT;
        matrix[col][row] = new Cell(cellPositionX, cellPositionY, NEW_CELL_WIDTH_HEIGHT, cellState);
      }
    }
    this.matrix = matrix;
    return matrix;
  },
};

export default class Game {
  constructor(canvas, columnCount, rowCount) {
    this.canvas = canvas;
    this.columnCount = columnCount;
    this.rowCount = rowCount;

    this.canvasWidth = columnCount * NEW_CELL_WIDTH_HEIGHT;
    this.canvasHeight = rowCount * NEW_CELL_WIDTH_HEIGHT;
    this.canvas2dContext = this.canvas.getContext('2d');

    this.gameLoop = new GameLoop(this);

    this.matrix = privateMethods.generateAndGetRandomModel.call(this);
  }

  update() {
    privateMethods.draw.call(this);
  }

  stop() {
    this.gameLoop.stopGameLoop();
  }

  reset() {
    this.gameLoop.resetGameLoop();
  }
}
