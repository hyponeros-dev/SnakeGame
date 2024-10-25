let snake = [
  { x: 240, y: 240 },
  { x: 260, y: 240 },
];

// Augmenter la taille de chaque unité du quadrillage (serpent et item)
const GRID_SIZE = 20;

let dx = -GRID_SIZE;
let dy = 0;

function drawSnake(ctx, snake) {
  ctx.clearRect(0, 0, map.width, map.height);

  // Dessiner la tête du serpent (premier segment) avec des yeux orientés selon la direction
  drawSnakeHead(ctx, snake[0]);

  // Parcourir chaque segment du serpent sauf la tête pour dessiner le corps
  for (let i = 1; i < snake.length; i++) {
    const segment = snake[i];

    // Créer un dégradé linéaire dynamique pour chaque segment
    let gradient = ctx.createLinearGradient(
      segment.x,
      segment.y,
      segment.x + GRID_SIZE,
      segment.y + GRID_SIZE
    );

    // Calculer la position du dégradé en fonction de l'indice du segment
    let colorStop = i / (snake.length - 1); // Proportion de la couleur le long du serpent

    // Ajouter les couleurs au dégradé (du blanc au vert "#59FF00")
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, `rgba(89, 255, 0, ${1 - colorStop})`); // Couleur plus intense vers la queue

    // Appliquer le dégradé pour chaque segment du serpent
    ctx.fillStyle = gradient;
    ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
  }
}

// Fonction pour dessiner la tête du serpent avec des yeux orientés
function drawSnakeHead(ctx, head) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(head.x + 10, head.y + 10, 10, 0, Math.PI * 2); // Tête circulaire
  ctx.fill();
  ctx.closePath();

  // Dessiner les yeux selon la direction du serpent
  ctx.fillStyle = "black";
  if (dx === GRID_SIZE) {
    // Tête vers la droite
    drawEye(ctx, head.x + 14, head.y + 7); // Oeil droit
    drawEye(ctx, head.x + 14, head.y + 13); // Oeil gauche
  } else if (dx === -GRID_SIZE) {
    // Tête vers la gauche
    drawEye(ctx, head.x + 6, head.y + 7); // Oeil droit
    drawEye(ctx, head.x + 6, head.y + 13); // Oeil gauche
  } else if (dy === GRID_SIZE) {
    // Tête vers le bas
    drawEye(ctx, head.x + 7, head.y + 14); // Oeil droit
    drawEye(ctx, head.x + 13, head.y + 14); // Oeil gauche
  } else if (dy === -GRID_SIZE) {
    // Tête vers le haut
    drawEye(ctx, head.x + 7, head.y + 6); // Oeil droit
    drawEye(ctx, head.x + 13, head.y + 6); // Oeil gauche
  }
}

// Fonction utilitaire pour dessiner un œil
function drawEye(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2); // Cercle de l'œil
  ctx.fill();
  ctx.closePath();
}

// Fonction pour faire grandir le serpent
function growSnake() {
  const bodyEnd = snake[snake.length - 1];
  snake.push({
    x: bodyEnd.x,
    y: bodyEnd.y,
  });
}

// Fonction pour déplacer le serpent
function moveSnake() {
  const newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };

  snake.unshift(newHead);
  snake.pop();
}

// Écoute des événements de touches pour changer la direction du serpent
document.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = GRID_SIZE;
      }
      break;
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -GRID_SIZE;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = GRID_SIZE;
        dy = 0;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -GRID_SIZE;
        dy = 0;
      }
      break;
    default:
      if (dy !== 0 || dx !== 0) {
        // todo wrong song
      }
  }
});

// Fonction pour vérifier la collision avec soi-même
function selfCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      modal.style.display = "flex";
      snake = [];
      ctx.clearRect(0, 0, 0, 0);
    }
  }
}
