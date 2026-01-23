import type { Snake } from "./snake";
import { Vector } from "./vector";

export class Food {
  position: Vector;
  private gridSize;

  constructor(gridSize: number) {
    this.gridSize = gridSize;

    this.position = this.randomPosition();
  }

  randomPosition() {
    return new Vector(
      Math.floor(Math.random() * this.gridSize),
      Math.floor(Math.random() * this.gridSize),
    );
  }

  respawn(snake: Snake) {
    let position: Vector;

    do {
      position = this.randomPosition();
    } while (
      snake.body.some(
        (segment) => segment.x === position.x && segment.y === position.y,
      )
    );

    this.position = position;
  }
}
