export class Score {
  private element: HTMLDivElement;
  private current: number = 0;

  constructor() {
    this.element = document.querySelector(".score")!;
  }

  increase() {
    this.current++;
  }

  render() {
    this.element.innerHTML = `🍎 Score: ${this.current}`;
  }
}
