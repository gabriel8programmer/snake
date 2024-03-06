
function Snake(x, y, w, h, c){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    //moves
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.dir = "";

    this.setDir = function(dir){
        this.dir = dir;
    }

    this.teleport = function(x, y){
        this.x = x;
        this.y = y;
    }

    this.setDx = function(dx){
        this.dx = (this.dx === 0)? dx: 0;
    }.bind(this);

    this.setDy = function(dy){
        this.dy = (this.dy === 0)? dy: 0;
    }.bind(this);

    this.move = function(){

        this.setDx(0);
        this.setDy(0);

        //change dx or dy depending on which direction the snake going
        switch(this.dir){
            case "right":
                this.setDx(1);
                break;
            case "left":
                this.setDx(-1);
                break;
            case "up":
                this.setDy(-1);
                break;
            case "down":
                this.setDy(1);
                break;
        }
        //move
        this.x += (this.speed * this.dx);
        this.y += (this.speed * this.dy);
    }.bind(this);

    this.update = function(){
        //move snake
        this.move();
    }
}

export default Snake;