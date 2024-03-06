
//imports
import Keyboard from "./Keyboard";
import Snake from "./Snake";

function Game(canvas){

    //globals
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");

    //variables
    this.tileSize = 10;

    //states
    this.running = true;

    this.randNumber = function(max){
        return Math.floor(Math.random() * max);
    }

    this.init = function(){

        //create the object for to manipulate the keyboard
        this.keyboard = new Keyboard();

        //create the apple of the game
        this.apple = {
            x: this.randNumber(this.width-this.tileSize),
            y: this.randNumber(this.height-this.tileSize),
            w: this.tileSize,
            h: this.tileSize
        }

        //create the snake of the game
        this.snake = new Snake(
            this.width / 2 - this.tileSize/2,
            this.height / 2 - this.tileSize/2,
            this.tileSize,
            this.tileSize,
            "#0a0"
        );

        // init keyboard
        this.keyboard.init();
        // run the game
        this.run();
    }

    this.renderScreen = function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    this.renderObj = function(obj, color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    this.render = function(){
        //render screen
        this.renderScreen();
        //render apple
        this.renderObj({...this.apple}, "#f00");
        //render snake
        this.renderObj({...this.snake}, this.snake.c);
    }

    this.updateControls = function(){
        switch(this.keyboard.getKeyPressed()){
            case "ArrowRight":
                this.snake.setDir("right");
                break;
            case "ArrowLeft":
                this.snake.setDir("left");
                break;
            case "ArrowUp":
                this.snake.setDir("up");
                break;
            case "ArrowDown":
                this.snake.setDir("down");
                break;
        }
    }

    this.update = function(){
        //update the control
        this.updateControls();
        //update snake
        this.snake.move();
    }

    this.run = function(){
        this.render();
        if (this.running) this.update();
        //game loop running
        requestAnimationFrame(this.run.bind(this));
    }
}

export default Game;