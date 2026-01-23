import { Food } from "./food";
import { Score } from "./score";
import { Snake } from "./snake";
import { Vector } from "./vector";

export class Game {
  private context: CanvasRenderingContext2D;
  private gridSize = 20;
  private tileSize = 20;
  private intervalId?: number;

  private snake = new Snake();
  private food = new Food(this.gridSize);
  private score = new Score();

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.handleInput(event),
    );

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => this.update(), 100);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  handleInput(event: KeyboardEvent) {
    const map: Record<string, Vector> = {
      ArrowUp: new Vector(0, -1),
      ArrowDown: new Vector(0, 1),
      ArrowRight: new Vector(1, 0),
      ArrowLeft: new Vector(-1, 0),
    };

    if (map[event.key]) {
      this.snake.setDirection(map[event.key]);
    }
  }

  update() {
    this.snake.move();
    this.checkCollisions();
    this.draw();
  }

  checkCollisions() {
    if (
      this.snake.isCollidingWithSelf() ||
      this.snake.isCollidingWithWall(this.gridSize)
    ) {
      this.stop();
    }

    if (this.snake.isCollidingWithFood(this.food)) {
      this.snake.grow();
      this.food.respawn(this.snake);
      this.score.increase();
    }
  }

  draw() {
    this.context.clearRect(0, 0, 400, 400);

    this.context.fillStyle = "#0add51";

    for (const segment of this.snake.body) {
      this.context.fillRect(
        segment.x * this.tileSize,
        segment.y * this.tileSize,
        this.tileSize,
        this.tileSize,
      );
    }

    this.context.fillStyle = "#dd230a";

    this.context.fillRect(
      this.food.position.x * this.tileSize,
      this.food.position.y * this.tileSize,
      this.tileSize,
      this.tileSize,
    );

    this.score.render();
  }
}
