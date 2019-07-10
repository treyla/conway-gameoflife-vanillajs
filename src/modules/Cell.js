import * as Utils from './Utils.js';

export default class Cell {
  constructor(positionX, positionY, widthHeight, state) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = widthHeight;
    this.height = widthHeight;
    this.state = state; // Dead (0) - Alive (1)
    this.color = Utils.getRandomColor();
  }
}
