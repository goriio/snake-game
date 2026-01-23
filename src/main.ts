import { Game } from "./game";
import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
new Game(canvas);
