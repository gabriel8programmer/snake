
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

    //body
    this.body = [];
    this.sizeBody = 0;

    this.getDir = function(){
        return this.dir;
    }

    this.setDir = function(dir){
        this.dir = dir; 
    }

    this.setX = function(x) {
        this.x = x;
    }

    this.setY = function(y) {
        this.y = y;
    }

    this.setDx = function(dx){
        this.dx = (this.dx === 0)? dx: 0;
    }

    this.setDy = function(dy){
        this.dy = (this.dy === 0)? dy: 0;
    }

    this.tryDir = function(dir){
        switch(dir){
            case "right":
                this.setDir((this.getDir() != "left")? dir: this.getDir());
                break;
            case "left":
                this.setDir((this.getDir() != "right")? dir: this.getDir());
                break;
            case "down":
                this.setDir((this.getDir() != "up")? dir: this.getDir());
                break;
            case "up":
                this.setDir((this.getDir() != "down")? dir: this.getDir());
                break;
        }
    }

    this.move = function(){

        this.setDx(0);
        this.setDy(0);

        //change dx or dy depending on which direction the snake going
        switch(this.getDir()){
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
    }

    this.update = function(){
        //move snake
        this.move();
    }
}

export default Snake;