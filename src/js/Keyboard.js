
function Keyboard(){

    this.keyPressed = "";

    this.getKeyPressed = function(){
        return this.keyPressed;
    }

    this.setKeyPressed = function(keyPressed){
        this.keyPressed = keyPressed;
    }

    this.init = function(){
        document.addEventListener("keydown", (e)=> {
            this.setKeyPressed(e.key);
        })
    }
}

export default Keyboard;