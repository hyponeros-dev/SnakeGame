let item = {
  x: 0,
  y: 0,
};

let sparkleTime = Math.floor(Math.random() * 5000); // Prochaine apparition de l'éclat (entre 0 et 5 secondes)

function drawItem() {
  const radius = GRID_SIZE / 2;
  const centerX = item.x + radius;
  const centerY = item.y + radius;

  // Dessiner le contour (bord) de la pièce
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#333"; // Couleur du bord (un gris sombre ici)
  ctx.fill();
  ctx.closePath();

  // Créer un gradient radial pour l'effet de brillance sur la pièce
  let gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius / 3,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "yellow");
  gradient.addColorStop(1, "goldenrod");

  // Dessiner un cercle pour la pièce
  ctx.beginPath();
  // ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2); // Réduire un peu la taille pour laisser apparaître le bord
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();

  // Ajouter un effet de brillance supplémentaire avec un petit reflet blanc
  ctx.beginPath();
  ctx.arc(
    centerX - radius / 3,
    centerY - radius / 3,
    radius / 4,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fill();
  ctx.closePath();

  // Ajouter un éclat aléatoire (éclair)
  if (sparkleTime <= 0) {
    ctx.beginPath();
    ctx.arc(
      centerX + radius / 3,
      centerY + radius / 3,
      radius / 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
    ctx.closePath();

    // Redéfinir le temps pour la prochaine apparition de l'éclat
    sparkleTime = Math.floor(Math.random() * 5000);
  } else {
    sparkleTime -= 100; // Diminuer le temps restant
  }
}

function generateItem() {
  item.x =
    Math.floor(Math.random() * (ctx.canvas.width / GRID_SIZE)) * GRID_SIZE;
  item.y =
    Math.floor(Math.random() * (ctx.canvas.height / GRID_SIZE)) * GRID_SIZE;

  // Assurer que l'item ne se génère pas sur le corps du serpent
  for (let part of snake) {
    if (part.x === item.x && part.y === item.y) {
      generateItem();
      return;
    }
  }
}

generateItem();
