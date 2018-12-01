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

  // isAlive() {
  //   if (this.state === 1) {
  //     return true;
  //   }
  //   return false;
  // }

  // isDead() {
  //   if (this.state === 0) {
  //     return true;
  //   }
  //   return false;
  // }

  // die() {
  //   this.state = 0;
  // }

  // live() {
  //   this.state = 1;
  // }

  // flickCell() {
  //   if (this.isAlive()) {
  //     this.die();
  //   } else {
  //     this.live();
  //   }
  // }
}
