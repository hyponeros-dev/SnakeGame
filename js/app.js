const map = document.querySelector(".map");
const ctx = map.getContext("2d");
const modal = document.querySelector(".modal");
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", () => {
  modal.style.display = "none";

  snake = [
    { x: 240, y: 240 },
    { x: 260, y: 240 },
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
