import GameLoop from './GameLoop.js';
import Cell from './Cell.js';
import * as Utils from './Utils.js';

const privateMethods = {
  drawMatrix() {
    this.canvas2dContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let col = 0; col < this.matrix.length; col += 1) {
      for (let row = 0; row < this.matrix[col].length; row += 1) {
        const currentCell = this.matrix[col][row];
        if (currentCell.state === 0) {
          this.canvas2dContext.fillStyle = 'black';
        } else {
          this.canvas2dContext.fillStyle = currentCell.color;
        }
        this.canvas2dContext.fillRect(
          currentCell.positionX * currentCell.height,
          currentCell.positionY * currentCell.width,
          currentCell.width,
          currentCell.height,
        );
        this.canvas2dContext.strokeRect(
          currentCell.positionX * currentCell.height,
          currentCell.positionY * currentCell.width,
          currentCell.width,
          currentCell.height,
        );
      }
    }
  },

  simulateCellLife() {
    const nextMatrix = Utils.make2DArray(this.columnCount, this.rowCount);
    for (let col = 0; col < this.matrix.length; col += 1) {
      for (let row = 0; row < this.matrix[col].length; row += 1) {
        const currentCell = this.matrix[col][row];
        const aliveNeighboursCount = privateMethods.countAliveNeighbours(currentCell, this.matrix);

        // Any dead cell with exactly three live neighbours will come to life.
        if (currentCell.state === 0 && aliveNeighboursCount === 3) {
          const nextCell = new Cell(row, col, currentCell.width, 1);
          nextMatrix[col][row] = nextCell;
        // Any live cell with fewer than two live neighbours dies
        // (referred to as underpopulation or exposure).
        // Any live cell with more than three live neighbours dies
        // (referred to as overpopulation or overcrowding).
        } else if (currentCell.state === 1
          && (aliveNeighboursCount < 2 || aliveNeighboursCount > 3)) {
          const nextCell = new Cell(row, col, currentCell.width, 0);
          nextMatrix[col][row] = nextCell;
        // Any live cell with two or three live neighbours lives, unchanged, to the next generation.
        } else {
          const nextCell = new Cell(row, col, currentCell.width, currentCell.state);
          nextMatrix[col][row] = nextCell;
        }
      }
    }
    this.matrix = nextMatrix;
  },
  randomizeAndGetCellSeed() {
    const newMatrix = Utils.make2DArray(this.columnCount, this.rowCount);
    for (let col = 0; col < newMatrix.length; col += 1) {
      for (let row = 0; row < newMatrix[col].length; row += 1) {
        // Generate random Cells with a life chance of 60%
        const newCell = new Cell(row, col, this.newCellSquareLength, Math.round(Math.random() * 0.6));
        newMatrix[col][row] = newCell;
      }
    }
    this.matrix = newMatrix;
    return newMatrix;
  },
  initializeAndGetCellSeed() {
    const newMatrix = Utils.make2DArray(this.columnCount, this.rowCount);
    for (let col = 0; col < newMatrix.length; col += 1) {
      for (let row = 0; row < newMatrix[col].length; row += 1) {
        const cellState = 0;
        const newCell = new Cell(row, col, this.newCellSquareLength, cellState);
        newMatrix[col][row] = newCell;
      }
    }
    this.matrix = newMatrix;
    return newMatrix;
  },
  countAliveNeighbours(cell, matrix) {
    const neighborDirections = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1], [0, 1], [1, 1],
    ];

    const getFromMatrix = m => ([x, y]) => (m[y] || [])[x];
    const getAliveNeighbors = (x, y, n, m) => n
      .map(([dX, dY]) => [x + dX, y + dY])
      .map(getFromMatrix(m))
      .filter(v => v !== undefined)
      .filter(v => v.state !== 0);

    return getAliveNeighbors(cell.positionX, cell.positionY, neighborDirections, matrix).length;
  },
};

export default class Game {
  constructor(columnCount, rowCount) {
    this.fps = 10;
    this.gameLoop = new GameLoop(this, this.fps);

    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.newCellSquareLength = Math.ceil(window.innerWidth / this.columnCount);

    this.matrix = privateMethods.randomizeAndGetCellSeed.call(this);

    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas2dContext = this.canvas.getContext('2d');
  }

  draw() {
    privateMethods.drawMatrix.call(this);
  }

  startGameLoop() {
    this.gameLoop.startGameLoop(this.fps);
  }

  stopGameLoop() {
    this.gameLoop.stopGameLoop();
  }

  singleStepGameLoop() {
    this.gameLoop.singleLoopStep();
  }

  changeSpeed(newSpeed) {
    this.fps = newSpeed;
    this.stopGameLoop();
    this.startGameLoop();
  }

  reset() {
    this.stopGameLoop();
    privateMethods.randomizeAndGetCellSeed.call(this);
    this.draw();
  }

  empty() {
    this.stopGameLoop();
    privateMethods.initializeAndGetCellSeed.call(this);
    this.draw();
  }

  nextGeneration() {
    privateMethods.simulateCellLife.call(this);
    this.draw();
  }

  clickCell(canvasX, canvasY) {
    const cell = this.getCellByScreenPosition(canvasX, canvasY);
    if (cell.state === 1) {
      cell.state = 0;
    } else {
      cell.state = 1;
    }
    this.draw();
  }

  getCellByScreenPosition(screenPositionX, screenPositionY) {
    for (let col = 0; col < this.matrix.length; col += 1) {
      for (let row = 0; row < this.matrix[col].length; row += 1) {
        const currentCell = this.matrix[col][row];
        const left = (currentCell.positionX * currentCell.width);
        const right = (currentCell.positionX * currentCell.width) + currentCell.width;
        const top = (currentCell.positionY * currentCell.height);
        const bottom = (currentCell.positionY * currentCell.height) + currentCell.height;
        if (left <= screenPositionX
          && right >= screenPositionX
          && top <= screenPositionY
          && bottom >= screenPositionY) {
          return currentCell;
        }
      }
    }
    return null;
  }
}
