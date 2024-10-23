function wallKill() {
  if (snake[0].x < 0 || snake[0].x > ctx.canvas.clientWidth ||
    snake[0].y < 0 || snake[0].y > ctx.canvas.clientHeight
  ) {
    modal.style.display = 'flex';
  }
}

