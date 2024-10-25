const map = document.querySelector(".map");
const ctx = map.getContext("2d");
const modal = document.querySelector(".modal");
const resetButton = document.querySelector(".reset-button");

// Récupérer l'élément audio
const backgroundMusic = document.getElementById("background-music");

// Récupérer l'icône du bouton mute
const muteIcon = document.getElementById("mute-icon");

// Initialiser l'état de la musique
let isPlaying = false;
let isMuted = false;

// Fonction pour jouer ou arrêter la musique au premier clic
function toggleMusic() {
  if (!isPlaying) {
    backgroundMusic.play();
    muteIcon.src = "img/mute.png"; // Icône pour musique activée
    isPlaying = true;
  } else {
    toggleMute();
  }
}

// Fonction pour mute/unmute la musique après démarrage
function toggleMute() {
  if (isMuted) {
    backgroundMusic.muted = false;
    muteIcon.src = "img/mute.png"; // Icône pour musique activée
  } else {
    backgroundMusic.muted = true;
    muteIcon.src = "img/unmute.png"; // Icône pour musique désactivée
  }
  isMuted = !isMuted;
}

// Événement pour gérer le clic sur l'icône (démarrer et mute/unmute)
document.getElementById("music-toggle").addEventListener("click", toggleMusic);

// Permet de contrer la blocage de la musique par Chrome en appuyant sur une touche
window.addEventListener("keydown", () => {
  if (backgroundMusic.paused) {
    playBackgroundMusic();
  }
});

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
