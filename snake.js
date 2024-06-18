const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const snakeSpeed = 100;

let snake = [{x: 200, y: 200}];
let food = {x: 300, y: 300};
let dx = gridSize;
let dy = 0;

function updateSnake() {
 let head = {x: snake[0].x + dx, y: snake[0].y + dy};

 if (head.x === food.x && head.y === food.y) {
    placeFood();
 } else {
    snake.pop();
 }

 if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head, snake)) {
    clearInterval(gameInterval);
    return;
 }

 snake.unshift(head);
}

function checkCollision(head, arr) {
 for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      return true;
    }
 }
 return false;
}

function placeFood() {
 food = {x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
          y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize};

 for (let i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y) {
      placeFood();
    }
 }
}

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);

 for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
 }

 ctx.fillStyle = 'red';
 ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

document.addEventListener('keydown', (event) => {
 if (event.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -gridSize;
 } else if (event.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = gridSize;
 } else if (event.key === 'ArrowLeft' && dx === 0) {
    dx = -gridSize;
    dy = 0;
 } else if (event.key === 'ArrowRight' && dx === 0) {
    dx = gridSize;
    dy = 0;
 }
});

placeFood();
let gameInterval = setInterval(updateSnake, snakeSpeed);
draw();
setInterval(draw, 1000 / 60);