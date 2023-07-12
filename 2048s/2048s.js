var screen = document.getElementById("GameScreen");
var ctx = screen.getContext('2d');

ctx.fillStyle = "rgb(255,0,0)"

document.addEventListener('keydown',(e)=>{
    if(e.code === "ArrowUp"){
        swipe(0);
    }
    if(e.code === "ArrowLeft"){
        swipe(1);
    }
    if(e.code === "ArrowDown"){
        swipe(2);
    }
    if(e.code === "ArrowRight"){
        swipe(3);
    }
})

function addBox(){
    var emptyPos = emptyBox()

    var pos = emptyPos[Math.floor(Math.random() * emptyPos.length)]
    
    if(Math.random()<0.75){
        board[pos] = 2
    }
    else{
        board[pos] = 4
    }
}

function slideEach(column){
    var result = [0,0,0,0]
    var tmp =-1
    var marker = 3
    for(let i=3; i>-1; i--){
        if(column[i] != 0){
            if(tmp != column[i]){
                result[marker]=column[i]
                tmp = column[i]
                marker--;}
            else{
                result[marker+1]= tmp*2
                tmp = -1
            }
        }
    }
    return result;
}

function emptyBox(){
    var box = []
    for (let i = 0; i < 16; i++) {
        if(board[i] ==0)
        box.push(i)
    }
    return box;
}

function drawEnd(){
    ctx.clearRect(0, 0, screen.width, screen.height);
    ctx.fillStyle = "rgb(200,0,0)"
    ctx.fillRect(0,0,225,225)       
}

function draw(){
    ctx.clearRect(0, 0, screen.width, screen.height);
    // console.log(board)
    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        if(element != 0){
            ctx.fillStyle = "rgb(170,170,170)"
            ctx.fillRect((i%4)*57,Math.floor(i/4)*57,55,55);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "22px Arial";
            ctx.fillText(element,(i%4)*57+21, Math.floor(i/4)*57+35);
        }
    }
}

function swipe(dir){
    if(dir ==0){
        var columns = [
            slideEach([board[12],board[8],board[4],board[0]]),
            slideEach([board[13],board[9],board[5],board[1]]),
            slideEach([board[14],board[10],board[6],board[2]]),
            slideEach([board[15],board[11],board[7],board[3]]),
        ]
        board = [
            columns[0][3],columns[1][3],columns[2][3],columns[3][3],
            columns[0][2],columns[1][2],columns[2][2],columns[3][2],
            columns[0][1],columns[1][1],columns[2][1],columns[3][1],
            columns[0][0],columns[1][0],columns[2][0],columns[3][0]
        ];
    }

    if(dir ==1){
        var columns = [
            slideEach([board[3],board[2],board[1],board[0]]),
            slideEach([board[7],board[6],board[5],board[4]]),
            slideEach([board[11],board[10],board[9],board[8]]),
            slideEach([board[15],board[14],board[13],board[12]]),
        ]
        board = [
            columns[0][3],columns[0][2],columns[0][1],columns[0][0],
            columns[1][3],columns[1][2],columns[1][1],columns[1][0],
            columns[2][3],columns[2][2],columns[2][1],columns[2][0],
            columns[3][3],columns[3][2],columns[3][1],columns[3][0]
        ];
    }

    if(dir ==2){
        var columns = [
            slideEach([board[0],board[4],board[8],board[12]]),
            slideEach([board[1],board[5],board[9],board[13]]),
            slideEach([board[2],board[6],board[10],board[14]]),
            slideEach([board[3],board[7],board[11],board[15]]),
        ]
        board = [
            columns[0][0],columns[1][0],columns[2][0],columns[3][0],
            columns[0][1],columns[1][1],columns[2][1],columns[3][1],
            columns[0][2],columns[1][2],columns[2][2],columns[3][2],
            columns[0][3],columns[1][3],columns[2][3],columns[3][3]
        ];
    }

    if(dir ==3){
        var columns = [
            slideEach([board[0],board[1],board[2],board[3]]),
            slideEach([board[4],board[5],board[6],board[7]]),
            slideEach([board[8],board[9],board[10],board[11]]),
            slideEach([board[12],board[13],board[14],board[15]]),
        ]
        board = [
            columns[0][0],columns[0][1],columns[0][2],columns[0][3],
            columns[1][0],columns[1][1],columns[1][2],columns[1][3],
            columns[2][0],columns[2][1],columns[2][2],columns[2][3],
            columns[3][0],columns[3][1],columns[3][2],columns[3][3]
        ];
    }

    var emptyPos = emptyBox()
    if(emptyPos.length == 0){
        drawEnd()
    }
    else{
        addBox()
        draw()
    }
}


var board = new Array(16).fill(0)

addBox()
addBox()
draw()
