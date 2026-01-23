import type { Food } from "./food";
import { Vector } from "./vector";

export class Snake {
  body: Vector[] = [];
  direction: Vector = new Vector(1, 0);

  constructor(position: Vector = { x: 10, y: 10 }, length: number = 2) {
    for (let i = 0; i < length; i++) {
      this.body.push(new Vector(position.x - i, position.y));
    }
  }

  move() {
    const head = this.body[0];

    const newHead = new Vector(
      head.x + this.direction.x,
      head.y + this.direction.y,
    );

    this.body.unshift(newHead);

    this.body.pop();
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push(tail);
  }

  setDirection(direction: Vector) {
    if (
      this.direction.x + direction.x !== 0 ||
      this.direction.y + direction.y !== 0
    ) {
      this.direction = direction;
    }
  }

  isCollidingWithSelf() {
    const [head, ...tail] = this.body;
    return tail.some((segment) => segment.x === head.x && segment.y === head.y);
  }

  isCollidingWithWall(gridSize: number) {
    const head = this.body[0];
    return (
      head.x < 0 || head.y < 0 || head.x > gridSize - 1 || head.y > gridSize - 1
    );
  }

  isCollidingWithFood(food: Food) {
    const head = this.body[0];
    return head.x === food.position.x && head.y === food.position.y;
  }
}
