var screen = document.getElementById("GameScreen");
var ctx = screen.getContext('2d');

document.addEventListener('keydown',(e)=>{
    if(e.code === "ArrowUp"){
        nextDir = 3;
    }
    if(e.code === "ArrowDown"){
        nextDir = 1;
    }
    if(e.code === "ArrowLeft"){
        nextDir = 2;
    }
    if(e.code === "ArrowRight"){
        nextDir = 0;
    }
})

function regenApple(){

    applePos = [Math.floor(Math.random()*15),Math.floor(Math.random()*15)]
    
    for (let i = 1; i < bodyPos.length; i++) {
        const element = bodyPos[i];
        if (element[0] == applePos[0] && element[1] == applePos[1]){
            regenApple();
        }
    }
}

function drawScreen(){
    ctx.clearRect(0, 0, screen.width, screen.height);
    for (let k = 0; k < bodyLength; k++) {
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(1+15*bodyPos[k][0],1+15*bodyPos[k][1],13,13); 
    }
    ctx.fillStyle = "rgb(255,0,0)"
    ctx.fillRect(1+15*applePos[0],1+15*applePos[1],13,13); 

}

function drawEnd(){
    ctx.clearRect(0, 0, screen.width, screen.height);
    ctx.fillStyle = "rgb(200,0,0)"
    ctx.fillRect(0,0,225,225)       
}
                

function isBumped(){
    if (bodyPos[0][0] < 0 || bodyPos[0][0] > 14) {
        return true;
    }
    if (bodyPos[0][1] < 0 || bodyPos[0][1] > 14) {
        return true;
    }
    for (let i = 1; i < bodyPos.length; i++) {
        const element = bodyPos[i];
        if (bodyPos[0][0] == element[0] && bodyPos[0][1] == element[1]){
            return true;
        }
    }
}

function move(){
    if(running){
        if(Math.abs(headDir - nextDir) != 2){
            headDir = nextDir;
        }

        switch (headDir) {
            case 0:
                bodyPos.unshift([bodyPos[0][0]+1,bodyPos[0][1]])
                break;
        
            case 1:
                bodyPos.unshift([bodyPos[0][0],bodyPos[0][1]+1])
                break;

            case 2:
                bodyPos.unshift([bodyPos[0][0]-1,bodyPos[0][1]])
                break;

            case 3:
                bodyPos.unshift([bodyPos[0][0],bodyPos[0][1]-1])
                break;
                            
            default:
                break;
        }
        if (bodyPos[0][0] == applePos[0] && bodyPos[0][1] == applePos[1]){
            console.log("ate apple")
            bodyLength += 1
            regenApple();
            console.log(applePos)
        }
        else{
            bodyPos.pop()
        }

        if (isBumped()) {
            running = false;
        }
        
        
        drawScreen()
    }
    else{
        drawEnd()
    }
}

var bodyPos = [[6,7],[7,7]]
var bodyLength = 2;
var headDir = 0;
var nextDir = 0;
var applePos = [9,7]

var running = true;

const intervalID = setInterval(move,200)