let snake = [
  { x: 240, y: 240 },
  { x: 260, y: 240 },
];

let dx = -20;
let dy = 0;

function drawSnake(ctx, snake) {
  ctx.clearRect(0, 0, map.width, map.height);

  // Parcourir chaque segment du serpent
  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];

    // Créer un dégradé linéaire dynamique pour chaque segment
    let gradient = ctx.createLinearGradient(
      segment.x,
      segment.y,
      segment.x + 20,
      segment.y + 20
    );

    // Calculer la position du dégradé en fonction de l'indice du segment
    let colorStop = i / (snake.length - 1); // Proportion de la couleur le long du serpent

    // Ajouter les couleurs au dégradé (du blanc au vert "#59FF00")
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, `rgba(89, 255, 0, ${1 - colorStop})`); // Couleur plus intense vers la queue

    // Appliquer le dégradé pour chaque segment du serpent
    ctx.fillStyle = gradient;
    ctx.fillRect(segment.x, segment.y, 20, 20);
  }
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
        dy = 20;
      }
      break;
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -20;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 20;
        dy = 0;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -20;
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
