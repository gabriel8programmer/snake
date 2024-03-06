
import Game from "./game";

//get element canvas
const canvas = document.querySelector("#canvas")

//create constant of the game
const game = new Game(canvas);

//init game
game.init();