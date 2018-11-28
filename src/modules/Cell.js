export default class Cell {
  constructor(positionX, positionY, widthHeight, state) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = widthHeight;
    this.height = widthHeight;
    this.state = state;
  }
}
