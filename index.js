//Game consts and variables

let direction = {x:0 ,y:0};
const foodSound =new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed =5;
let streak=0;
let hiscore = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: Math.round(2 + (16-2)* Math.random()), y: Math.round(2 + (16-2)* Math.random())}
];
let superFoodFlag = 0;
let superFoodTime=0;
let board = document.getElementById('board');
let score=0;
let food = {x: Math.round(2 + (16-2)* Math.random()), y: Math.round(2 + (16-2)* Math.random())}
let scoreCard = document.getElementById('score');
let HiScoreCard = document.getElementById('hiScore');


function main(ctime){
    window.requestAnimationFrame(main);
    // consoleog(lastPaintTime);
    if((ctime - lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine(ctime);
}
let inputDir = {x:0,y:0};
function eventHandler(keyCode) {
    moveSound.play();
    // console.log(e.key);

    switch (keyCode) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
}
const handleClick = (event) =>{
    const dir = event;
    // console.log(dir);
    eventHandler(dir);
}
ArrowUp.addEventListener('click',e =>{handleClick('ArrowUp')});
ArrowDown.addEventListener("click", e => {handleClick('ArrowDown')});
ArrowRight.addEventListener("click", e => {handleClick('ArrowRight')});
ArrowLeft.addEventListener("click", e => {handleClick('ArrowLeft')});

window.addEventListener('keydown',e=>{
    console.log(e.key);
    handleClick(e.key);
    
})

function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
        
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0) return true;
}
// let prevScore=0;
function gameEngine(ctime){
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir = {x:0,y:0};
        alert('Game Over');
        snakeArr =[{x:13,y:13}];
        if(score>hiscore){
            HiScoreCard.innerText = "HighstScore: " + score;
            hiscore = score;
        }
        score = 0;
        streak=0;
        speed=5;
    }
    if(score>5 && score<12) speed = score;
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        if(streak===3 && superFoodFlag === 1) {
            streak = 0;
            superFoodFlag = 0;
            score+=5;
            superFoodTime = 0;
        } 
        else score+=1;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
        foodSound.play();
        let a = 2;
        let b = 16;
        streak+=1;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        
        console.log(score);
    }
    // console.log(ctime,superFoodTime);
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};   
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;

        snakeElement.style.gridColumnStart = e.x;
        if(index==0)
            snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');

        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    if(superFoodFlag === 1 && superFoodTime !=0 && ctime >= superFoodTime+2000 ){
        foodElement.classList.add('Food');
        superFoodFlag = 0 ;
        superFoodTime=0;
        streak=0;
        
    }
    else if(streak === 3 ) {
        foodElement.classList.add('superFood');
        
        if(superFoodFlag === 0) superFoodTime = ctime;
        
        superFoodFlag = 1 ;
    }

    else {
    
        foodElement.classList.add('food');
    }
    scoreCard.innerText = "Score: " + score;

    board.appendChild(foodElement);

}

window.requestAnimationFrame(main);

