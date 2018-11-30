export default class GameLoop {
  constructor(gameToRender) {
    this.gameToRender = gameToRender;
    this.singleLoopStep();
  }

  startGameLoop(fps) {
    this.gameLoopIntervalId = setInterval(this.gameToRender.nextGeneration.bind(this.gameToRender), 1000 / fps);
  }

  stopGameLoop() {
    clearInterval(this.gameLoopIntervalId);
  }

  singleLoopStep() {
    setTimeout(this.gameToRender.nextGeneration.bind(this.gameToRender), 0);
  }
}
