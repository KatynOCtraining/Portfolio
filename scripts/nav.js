// Sélection des boutons de navigation
const btnHome = document.getElementById("btnHome");
const btnProjets = document.getElementById("btnProjets");
const btnInfos = document.getElementById("btnInfos");
const btnContact = document.getElementById("btnContact");

// Sélection des div de chaque section
const sectionHome = document.getElementById("Home");
const sectionProjets = document.getElementById("Projets");
const sectionInfos = document.getElementById("Infos");
const sectionContact = document.getElementById("Contact");

// Fonctions pour afficher/cacher les sections
function showSection(section) {
  section.style.display = "block";
}

function hideSections() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

// Écouteurs d'événements pour les clics sur les boutons de navigation
btnHome.addEventListener("click", function () {
  hideSections();
  showSection(sectionHome);
});

btnProjets.addEventListener("click", function () {
  hideSections();
  showSection(sectionProjets);
});

btnInfos.addEventListener("click", function () {
  hideSections();
  showSection(sectionInfos);
});

btnContact.addEventListener("click", function () {
  hideSections();
  showSection(sectionContact);
});

// Afficher la section Home par défaut
showSection(sectionHome);

// DINOGAME
const canvas = document.getElementById("dinoGame");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 20, height: 20, dy: 0 }; // Taille réduite
let gravity = 0.5;
let jumpStrength = -10;
let isJumping = false;
let jumpDuration = 0;
let maxJumpDuration = 15; // Réduire la durée maximale du saut
let jumpTime = 0; // Durée du saut
let jumpKeyPressed = false; // Variable pour vérifier si la touche de saut est maintenue

let obstacles = [];
let speed = 3; // Vitesse initiale réduite pour un démarrage plus progressif
let score = 0;
let collectibles = 0;
const totalCollectibles = 5; // Total de collectibles à récupérer pour gagner
let highscore = localStorage.getItem("highscore") || 0; // Récupération du highscore

function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.x -= speed;
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    if (obstacle.x + obstacle.width < 0) {
      obstacles.shift();
      score++;
      generateCollectible(); // Générez un collectible lorsque l'obstacle est passé
    }

    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      resetGame();
    }
  });
}

function updateDino() {
  if (isJumping) {
    dino.dy = jumpStrength;
    isJumping = false;
    jumpDuration = maxJumpDuration; // Reset du compteur de saut
  }

  // Si la touche de saut est maintenue, le dino saute plus haut
  if (jumpKeyPressed && jumpDuration > 0) {
    jumpTime++; // Compte le temps de saut
    dino.dy = jumpStrength * (1 + jumpTime / maxJumpDuration); // Force de saut étendue, maximale jusqu'à 1,6x
    jumpDuration--;

    // Limiter la hauteur du saut
    if (jumpTime > maxJumpDuration) {
      jumpKeyPressed = false; // Arrêter d'augmenter le saut
    }
  } else {
    dino.dy += gravity; // Applique la gravité
    jumpTime = 0; // Réinitialise le temps de saut
  }

  dino.y += dino.dy;

  // Limiter la position du dino dans le canevas
  if (dino.y > 150) {
    dino.y = 150;
    dino.dy = 0;
  }
}

function generateObstacle() {
  let height = Math.random() * 30 + 30; // Réduction de la taille max des obstacles
  let gap = Math.random() * 100 + 200; // Augmentation de l'espacement entre les obstacles
  obstacles.push({ x: canvas.width + gap, y: 200 - height, width: 20, height });
}

function resetGame() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore); // Mettez à jour le highscore
  }

  dino.y = 150;
  dino.dy = 0;
  obstacles = [];
  score = 0;
  speed = 3;
  collectibles = 0;

  // Retirer l'effet de hover
  removeAllHovers();
}

function generateCollectible() {
  if (score % 5 === 0 && collectibles < totalCollectibles) {
    collectibles++;
    // Déclencher l'effet de hover pour le projet correspondant
    triggerProjectHover(collectibles);
    console.log("Collectible obtenu : ", collectibles);
  }
}

function triggerProjectHover(collectibles) {
  let projectItems = document.querySelectorAll(".projet_content_item h3");
  if (projectItems[collectibles - 1]) {
    projectItems[collectibles - 1].classList.add("hover"); // Simule l'effet de hover
    console.log("Hover activé pour le projet : ", collectibles);

    // Retirer l'effet de hover après avoir atteint 9 points
    if (collectibles < 5) {
      setTimeout(() => {
        removeHover(collectibles);
      }, 1000); // Laisser le hover visible pendant 1 seconde
    }
  }
}

function removeHover(collectibles) {
  let projectItems = document.querySelectorAll(".projet_content_item h3");
  if (projectItems[collectibles - 1]) {
    projectItems[collectibles - 1].classList.remove("hover"); // Retire l'effet de hover
    console.log("Hover retiré pour le projet : ", collectibles);
  }
}

function removeAllHovers() {
  let projectItems = document.querySelectorAll(".projet_content_item h3");
  projectItems.forEach((item) => {
    item.classList.remove("hover"); // Retire tous les effets de hover
  });
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Highscore: " + highscore, 10, 40); // Affiche le highscore
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDino();
  drawObstacles();
  updateDino();
  drawScore(); // Affiche le score à l'écran

  if (Math.random() < 0.01) {
    // Réduit la fréquence de génération des obstacles
    generateObstacle();
  }

  speed += 0.0005; // Progression plus lente de la vitesse
  requestAnimationFrame(gameLoop);
}

// Gérer les événements de la touche
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (dino.y >= 150) {
      isJumping = true;
    }
    jumpKeyPressed = true; // Marquer que la touche de saut est enfoncée
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    jumpKeyPressed = false; // Réinitialiser quand la touche est relâchée
  }
});

gameLoop();
