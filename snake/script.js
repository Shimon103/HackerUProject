const gameBoard = document.querySelector('#gameScreen');
const ctx = gameBoard.getContext('2d');
const gameBackground = "rgba(255, 255, 255, 0.8)";
const scoreTXT = document.querySelector('#scoreTXT');
const resetBTN = document.querySelector('#reset');
const gameWidth = document.querySelector('#gameScreen').width;
const gameHeight = document.querySelector('#gameScreen').height;
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "purple";
const unitSize = 5;
const diffcultyPick= document.querySelector('#changeDifficulty')


let diffculty
window.onload = function () {
    diffculty = 250
}
diffculty = diffcultyPick.addEventListener('change',()=>{
    if(diffcultyPick.value==="easy"){
        diffculty=250
    }
    else if(diffcultyPick.value==="medium"){
        diffculty=200
    }
    else if(diffcultyPick.value==="hard"){
        diffculty=100
    }
    else{
        diffculty=250
    }
    resetGame()
})


let running = false;
let xMove = 5
let yMove = 0
let foodX
let foodY
let score = 0
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 }
]


window.addEventListener('keydown', changeDirection);
resetBTN.addEventListener('click', resetGame);
gameStart()
function gameStart() {
    running = true
    scoreTXT.textContent = score
    createFood();
    drawFood();
    gameTick();
}
function gameTick() {
    if (running) {
        setTimeout(() => {
            boardClear();
            drawFood();
            snakeMovment();
            drawSnake();
            gameOver();
            gameTick();

        }, diffculty)
    }
    else {
        displayGO()
    }
}
function createFood() {
    function randomFood(min, max) {
        const randNumb = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNumb
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameHeight - unitSize)
}
function drawFood() {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
    ctx.strokeRect(foodX, foodY, unitSize, unitSize)
}
function boardClear() {
    ctx.fillStyle = gameBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
    ctx.strokeRect(0, 0, gameWidth, gameHeight)
}
function snakeMovment() {
    const head = { x: snake[0].x + xMove, y: snake[0].y + yMove }
    snake.unshift(head)
    const didEat = snake[0].x === foodX && snake[0].y === foodY
    if (didEat) {
        score += 10
        scoreTXT.textContent = score
        createFood()
    }
    else {
        snake.pop()
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    });
}
function changeDirection(event) {
    const keyPressed = event.keyCode
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    const movingUp = yMove === -unitSize
    const movingDown = yMove === unitSize
    const movingRight = xMove === unitSize
    const movingLeft = xMove === -unitSize
    switch (keyPressed) {
        case left:
            if (!movingRight) {
                xMove = -unitSize
                yMove = 0
            }
            break
        case up:
            if (!movingDown) {
                xMove = 0
                yMove = -unitSize
            }
            break
        case right:
            if (!movingLeft) {
                xMove = unitSize
                yMove = 0
            }
            break
        case down:
            if (!movingUp) {
                xMove = 0
                yMove = unitSize
            }
            break
    }
}
function gameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break
        case (snake[0].x > gameWidth):
            running = false
            break
        case (snake[0].y < 0):
            running = false
            break
        case (snake[0].y > gameHeight):
            running = false
            break
        case (checkCollision()):
            running = false
            break


    }
}
function displayGO() {
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.font = "4vh Arial"
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2)
    ctx.font = "1vh Arial"
    ctx.fillText("Press the reset button to play again", gameWidth / 2, gameHeight / 2 + 50)
    running = false

}
function checkCollision() {
    let snakeHead = snake[0]
    for (let i = 1; i < snake.length; i++) {
        if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {
            return true
        }
    }
    return false
}
function resetGame() {
    score = 0
    scoreTXT.textContent = score
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 }
    ]
    xMove = 5
    yMove = 0
    gameStart()
}

const upPhone = document.querySelector('#upPhone')
const downPhone = document.querySelector('#downPhone')
const leftPhone = document.querySelector('#leftPhone')
const rightPhone = document.querySelector('#rightPhone')
upPhone.addEventListener('click', () => {
    if (yMove !== unitSize) {
        xMove = 0
        yMove = -unitSize
    }
})
downPhone.addEventListener('click', () => {
    if (yMove !== -unitSize) {
        xMove = 0
        yMove = unitSize
    }
})
leftPhone.addEventListener('click', () => {
    if (xMove !== unitSize) {
        xMove = -unitSize
        yMove = 0
    }
})
rightPhone.addEventListener('click', () => {
    if (xMove !== -unitSize) {
        xMove = unitSize
        yMove = 0
    }
})