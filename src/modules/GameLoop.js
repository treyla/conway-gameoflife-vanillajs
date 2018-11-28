const FPS = 1000;

export default class GameLoop {
  constructor(game) {
    this.FPS = FPS;
    this.game = game;
    this.gameLoopIntervalId = setInterval(this.game.update.bind(this.game), 1000 / FPS);
  }

  resetGameLoop() {
    this.gameLoopIntervalId = setInterval(this.game.update.bind(this.game), 1000 / FPS);
  }

  stopGameLoop() {
    clearInterval(this.gameLoopIntervalId);
  }
}
