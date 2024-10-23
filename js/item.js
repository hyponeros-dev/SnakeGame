let item = {
  x: 0, y: 0
}


function drawItem() {
  ctx.fillStyle = 'purple';
  ctx.fillRect(item.x, item.y, 10, 10);
}

function generateItem() {
  item.x = Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10;
  item.y = Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10;

  for (let part of snake) {
    if (part.x === item.x && part.y === item.y ) {
      generateItem();
      return;
    }
  }
}


generateItem()
