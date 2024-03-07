
//imports
import Keyboard from "./Keyboard";
import Snake from "./Snake";

function Game(canvas) {

    //globals
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");

    //variables
    this.tileSize = 10;
    this.score = 0;

    //states
    this.running = true;

    this.randNumber = function (max) {
        return Math.floor(Math.random() * max);
    }

    this.init = function () {

        //create the object for to manipulate the keyboard
        this.keyboard = new Keyboard();

        //create the apple of the game
        this.apple = {
            x: this.randNumber(this.width - this.tileSize),
            y: this.randNumber(this.height - this.tileSize),
            w: this.tileSize,
            h: this.tileSize,
            teleport: function (randX, randY) {
                this.x = randX;
                this.y = randY;
            }
        }

        //create the snake of the game
        this.snake = new Snake(
            this.width / 2 - this.tileSize / 2,
            this.height / 2 - this.tileSize / 2,
            this.tileSize,
            this.tileSize,
            "#0a0"
        );

        // init keyboard
        this.keyboard.init();
        // run the game
        this.run();
    }

    this.renderScreen = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    this.renderObj = function (obj, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    this.renderScore = function () {
        this.ctx.fillStyle = "white";
        this.ctx.font = "12px Monospace";
        const textWidth = this.ctx.measureText(this.score).width;
        this.ctx.fillText(this.score, this.width - textWidth - 20, 30);
    }

    this.render = function () {
        //render screen
        this.renderScreen();
        //render apple
        this.renderObj({ ...this.apple }, "#f00");
        //render snake
        this.renderObj({ ...this.snake }, this.snake.c);
        //render score
        this.renderScore();
    }

    this.commandRight = function () {
        return (
            this.keyboard.getKeyPressed() == "ArrowRight" ||
            this.keyboard.getKeyPressed() == "d"
        );
    }

    this.commandLeft = function () {
        return (
            this.keyboard.getKeyPressed() == "ArrowLeft" ||
            this.keyboard.getKeyPressed() == "a"
        );
    }

    this.commandDown = function () {
        return (
            this.keyboard.getKeyPressed() == "ArrowDown" ||
            this.keyboard.getKeyPressed() == "s"
        );
    }

    this.commandUp = function () {
        return (
            this.keyboard.getKeyPressed() == "ArrowUp" ||
            this.keyboard.getKeyPressed() == "w"
        );
    }

    this.updateControls = function () {
        if (this.commandRight()) {
            this.snake.tryDir("right");
        }
        else if (this.commandLeft()) {
            this.snake.tryDir("left");
        }
        else if (this.commandDown()) {
            this.snake.tryDir("down");
        }
        else if (this.commandUp()) {
            this.snake.tryDir("up");
        }
    }

    this.teleportSnake = function () {
        //test snake x
        if (this.snake.x < 0) {
            this.snake.setX(this.width - this.snake.w);
        } else if (this.snake.x > this.width - this.snake.w) {
            this.snake.setX(0);
        }
        //test snake y
        if (this.snake.y < 0) {
            this.snake.setY(this.width - this.snake.h);
        } else if (this.snake.y > this.width - this.snake.h) {
            this.snake.setY(0);
        }
    }

    this.collideSnakeWithApple = function () {
        return (
            this.snake.x < this.apple.x + this.apple.w &&
            this.snake.x + this.snake.w > this.apple.x &&
            this.snake.y < this.apple.y + this.apple.h &&
            this.snake.y + this.snake.h > this.apple.y
        );
    }

    this.updateApple = function () {
        if (this.collideSnakeWithApple()) {
            this.apple.teleport(
                this.randNumber(this.width - this.apple.w),
                this.randNumber(this.height - this.apple.h)
            );
        }
    }

    this.updateScore = function () {
        if (this.collideSnakeWithApple()) {
            this.score++;
        }
    }.bind(this);

    this.update = function () {
        //update the control
        this.updateControls();
        //update snake
        this.snake.update();
        //teleport snake when it is exited of the screen
        this.teleportSnake();
        //update score
        this.updateScore();
        //udpate position apple
        this.updateApple();
    }

    this.run = function () {
        //if it is not running the game
        if (!this.running) return
        this.render();
        this.update();
        //game loop running
        requestAnimationFrame(this.run.bind(this));
    }
}

export default Game;