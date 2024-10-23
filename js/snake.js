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
  { x: 350, y: 250 }
]

let dx = -10;
let dy = 0;
function drawSnake(ctx, snake) {
  ctx.clearRect(0, 0, map.width, map.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(snake[0].x, snake[0].y, 10, 10);

  ctx.fillStyle = 'green';
  for (let i = 1; i < snake.length - 1; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10)
  }
  // si le 3eme param est true augmenter la taille du serpent

  ctx.fillStyle = 'blue';
  ctx.fillRect(snake[snake.length - 1].x, snake[snake.length - 1].y, 10, 10)
}

function growSnake() {
  const bodyEnd = snake[snake.length - 1];
  snake.push({
    x: bodyEnd.x, y: bodyEnd.y
  })
}

function moveSnake() {
  const newHead = {
    x: snake[0].x + dx, y: snake[0].y + dy
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
    default :
      if (dy !== 0 || dx !== 0) {
        // todo wrong song
      }
  }
})

function selfCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      modal.style.display = "flex";
      snake = [];
      ctx.clearRect(0, 0, 0, 0);
    }
  }
}
