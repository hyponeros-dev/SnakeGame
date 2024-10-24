// APP
const map = document.querySelector(".map");
const ctx = map.getContext("2d");
const modal = document.querySelector(".modal");
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", () => {
  modal.style.display = "none";
  snake = [
    { x: 250, y: 250 },
    { x: 260, y: 250 },
    { x: 270, y: 250 },
    { x: 280, y: 250 },
    { x: 290, y: 250 },
    { x: 300, y: 250 },
    { x: 310, y: 250 },
    { x: 320, y: 250 },
    { x: 330, y: 250 },
    { x: 340, y: 250 },
    { x: 350, y: 250 },
  ];
});

function gameLoop() {
  moveSnake();
  drawSnake(ctx, snake);
  wallKill();
  selfCollision();
  drawItem();

  if (snake[0].x === item.x && snake[0].y === item.y) {
    generateItem();
    growSnake();
  }
}

setInterval(gameLoop, 100);

// Item

let item = {
  x: 0,
  y: 0,
};

function drawItem() {
  ctx.fillStyle = "purple";
  ctx.fillRect(item.x, item.y, 10, 10);
}

function generateItem() {
  item.x = Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10;
  item.y = Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10;

  for (let part of snake) {
    if (part.x === item.x && part.y === item.y) {
      generateItem();
      return;
    }
  }
}

generateItem();

// Map

function wallKill() {
  if (
    snake[0].x < 0 ||
    snake[0].x > ctx.canvas.clientWidth ||
    snake[0].y < 0 ||
    snake[0].y > ctx.canvas.clientHeight
  ) {
    modal.style.display = "flex";
  }
}

// Snake

let snake = [
  { x: 250, y: 250 },
  { x: 260, y: 250 },
  { x: 270, y: 250 },
  { x: 280, y: 250 },
  { x: 290, y: 250 },
  { x: 300, y: 250 },
  { x: 310, y: 250 },
  { x: 320, y: 250 },
  { x: 330, y: 250 },
  { x: 340, y: 250 },
  { x: 350, y: 250 },
];

let dx = -10;
let dy = 0;
function drawSnake(ctx, snake) {
  ctx.clearRect(0, 0, map.width, map.height);

  ctx.fillStyle = "white";
  ctx.fillRect(snake[0].x, snake[0].y, 10, 10);

  ctx.fillStyle = "#59FF00";
  for (let i = 1; i < snake.length - 1; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  // si le 3eme param est true augmenter la taille du serpent

  ctx.fillStyle = "white";
  ctx.fillRect(snake[snake.length - 1].x, snake[snake.length - 1].y, 10, 10);
}

function growSnake() {
  const bodyEnd = snake[snake.length - 1];
  snake.push({
    x: bodyEnd.x,
    y: bodyEnd.y,
  });
}

function moveSnake() {
  const newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };

  snake.unshift(newHead);
  snake.pop();
}

document.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = 10;
      }
      break;
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -10;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 10;
        dy = 0;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -10;
        dy = 0;
      }
      break;
    default:
      if (dy !== 0 || dx !== 0) {
        // todo wrong song
      }
  }
});

function selfCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      modal.style.display = "flex";
      snake = [];
      ctx.clearRect(0, 0, 0, 0);
    }
  }
}
