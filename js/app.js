const map = document.querySelector('.map');
const ctx = map.getContext('2d');
const modal = document.querySelector('.modal')
const resetButton = document.querySelector('.reset-button')

resetButton.addEventListener('click', () => {
  modal.style.display = 'none';
  snake  = [
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
})

function gameLoop() {
  moveSnake();
  drawSnake(ctx,snake);
  wallKill();
  selfCollision();
  drawItem()

  if (snake[0].x === item.x && snake[0].y === item.y) {
    generateItem()
    growSnake()
  }
}



setInterval(gameLoop, 100)
