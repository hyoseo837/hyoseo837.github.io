var screen = document.getElementById("GameScreen");
var ctx = screen.getContext('2d');

document.addEventListener('keydown',(e)=>{
    if(e.key == " "){
        velY = -2;

    }   
    else if(e.key == "r"){
        isRunning = true;
        posY = screen.height/2;
        velY = -1;
        pipes = [];
        cnt = 20;
    }
})

var isRunning = true;

var posY = screen.height/2;
var velY = -1;
const ACC = 0.1;
const RAD = 7;

class obstacle{
    constructor(){
        this.upperBound = Math.random()*150 +10;
        this.lowerBound = this.upperBound + 60;
        this.posX = 225;
    }

    drawPipe(ctx){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.posX,0,25,this.upperBound);
        ctx.fillRect(this.posX,this.lowerBound,25,225);
    }

    update(){
        this.posX -= 1
        if(this.posX < -25){
            return true;
        }else{
            return false;
        }
    }

    detact(){

        if(this.posX> (50+RAD) || this.posX<(25-RAD)){
            return false;
        }
        else{
            if(posY<(this.upperBound+RAD) || posY > (this.lowerBound -RAD)){
                return true;
            }
            else{
                return false;
            }
        }
        
    }
}

function draw(){
    ctx.clearRect(0, 0, screen.width, screen.height);

    ctx.beginPath();
    ctx.arc(50, posY, RAD, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgb(230,230,0)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    
    for (let i = 0; i < pipes.length; i++) {
        const element = pipes[i];
        element.drawPipe(ctx);
    }
}

function drawEnd(){
    ctx.clearRect(0, 0, screen.width, screen.height);
    ctx.fillStyle = "rgb(200,0,0)"
    ctx.fillRect(0,0,225,225)
    
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "25px Arial";
    ctx.fillText("'r' to restart",50,130);
}

var test = new obstacle()

var pipes = [];
var cnt = 20;

function tick(){
    if (isRunning){
        if (cnt == 0){
            pipes.push(new obstacle());
            cnt += 110;
        }
        else{
            cnt -= 1;
        }
        velY += ACC
        posY += velY
        if(velY > 4){
            velY = 4;
        }
        if(posY > 225 || posY < 0){
            isRunning = false;
        }
        


        for (let i = 0; i < pipes.length; i++) {
            const element = pipes[i];
            if(element.detact()){
                isRunning = false;
            }
            if(element.update()){
                pipes.shift();
            }
        }

        draw()

    }
    else{
        drawEnd()
    }
}

draw()
setInterval(tick,10)