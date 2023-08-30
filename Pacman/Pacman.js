/** TODOLIST
 * créer l'envirronement de jeu cad le plateau avec :
 * -les murs
 * -les cases vides
 * -le pacman
 * -les fruits a manger
 * -les fantomes
 * créer notre parcours
 * gérer les déplacements sans contraintes
 * contraientes de déplacements (murs)
 * pièces à manger
 * gérer les fantomes*/
const headerDiv = document.getElementById("header");
headerDiv.classList.add("header");
headerDiv.style.display = "block";
const gameBoxDiv = document.getElementById("gameBox");
gameBoxDiv.classList.add("gameBox");
gameBoxDiv.style.display = "none";
const gameDiv = document.getElementById("game");
gameDiv.classList.add("game");
gameDiv.style.display = "none";
const endScreen = document.getElementById("endScreen");
endScreen.classList.add("endScreen");
const victory = document.getElementById("victory");
victory.classList.add("victoryScreen");
const buttonStartDiv = document.getElementById("buttonStart");
buttonStartDiv.classList.add("buttonStart");
const mainImageDiv = document.getElementById("mainImage");
const playButton = document.getElementById("play");
playButton.classList.add("playButton");
const scoreDiv = document.getElementById("score");
let score = 0;
const reverseCountDiv = document.getElementById("reverseCount");
let restTime = 0;
let counterInterval = 0;
let pacmanCanEat = false;
let mainAudio = new Audio("assets/audio/pacman-original-theme.mp3");
mainAudio.volume = 0.1;
let invicibleAudio = new Audio("assets/audio/Invincible.mp3");
invicibleAudio.volume = 0.1;
let looseAudio = new Audio("assets/audio/loose.mp3");
let winAudio = new Audio("assets/audio/win.mp3");
let eatAudio = new Audio("assets/audio/eat.mp3");
let pointAudio = new Audio("assets/audio/point.mp3");

const sizeCaseWidth = 28;
let intervalGhost = null;
const directions = {
  up: 1,
  down: 2,
  right: 3,
  left: 4,
};
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 2, 2, 2, 2, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 0, 2, 2, 2, 2, 0, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 0, 2, 2, 2, 2, 0, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 2, 1, 1, 2, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
buttonStartDiv.addEventListener("click", () => {
  headerDiv.style.display = "none";
  mainImageDiv.style.display = "none";
  gameBoxDiv.style.display = "block";
  gameDiv.style.display = "flex";
  buttonStartDiv.style.display = "none";
  launchGame();
});

function launchGame() {
  restTime = 120;
  reverseCount();
  mainAudio.play();
  createPlateau();
  generateGhost();
  // deplacement aleatoire fantome;
  intervalGhost = setInterval(ghostMouvement, 100);
}

function createPlateau() {
  score = 0;
  gameDiv.innerHTML = "";
  let cptCasePlateau = 0;
  endScreen.style.display = "none";
  victory.style.display = "none";

  document.addEventListener("keyup", onKeyUpAction);

  layout.forEach((caseLayout) => {
    let casePlateau = document.createElement("div");
    casePlateau.dataset.numerocase = cptCasePlateau;

    switch (caseLayout) {
      case 0:
        casePlateau.classList.add("pac-dots");
        break;
      case 1:
        casePlateau.classList.add("wall");
        break;
      case 2:
        casePlateau.classList.add("ghost-area");
        break;

      case 3:
        casePlateau.classList.add("power");
        break;
      case 4:
        break;
    }
    gameDiv.appendChild(casePlateau);
    cptCasePlateau++;
  });

  getCaseByIndex(489).classList.add("pacman");
}

function getCaseByIndex(index) {
  let caseStart = document.querySelector("[data-numerocase='" + index + "']");
  return caseStart;
}

function pacmanMoves(direction) {
  let pacmanDiv = document.querySelector(".pacman");
  let pacmanCase = pacmanDiv.dataset.numerocase;
  let caseDestination = null;
  switch (direction) {
    case "ArrowUp":
      // deplacer pacman vers le haut de 1 sauf si y a un mur
      caseDestination = getCaseNumberDestination(pacmanCase, directions.up);
      caseDestination.classList.add("up");
      caseDestination.classList.remove("down");
      caseDestination.classList.remove("right");
      caseDestination.classList.remove("left");
      break;
    case "ArrowDown":
      caseDestination = getCaseNumberDestination(pacmanCase, directions.down);
      caseDestination.classList.add("down");
      caseDestination.classList.remove("up");
      caseDestination.classList.remove("right");
      caseDestination.classList.remove("left");
      break;
    case "ArrowLeft":
      caseDestination = getCaseNumberDestination(pacmanCase, directions.left);
      caseDestination.classList.add("left");
      caseDestination.classList.remove("down");
      caseDestination.classList.remove("right");
      caseDestination.classList.remove("up");
      break;
    case "ArrowRight":
      caseDestination = getCaseNumberDestination(pacmanCase, directions.right);
      caseDestination.classList.add("right");
      caseDestination.classList.remove("down");
      caseDestination.classList.remove("up");
      caseDestination.classList.remove("left");
      break;
    default:
      break;
  }
  if (checkDirectionWall(caseDestination)) {
    pacmanDiv.classList.remove("pacman");
    caseDestination.classList.add("pacman");
    if (caseDestination.classList.contains("power")) {
      // pacman peut manger les fantomes
      caseDestination.classList.remove("power");
      mainAudio.pause();
      invicibleAudio.play();
      pacmanCanEat = true;
    }
    pacmanEatsGhost(caseDestination);
    checkPointEating(caseDestination);
  }
}

function checkDirectionWall(caseDestination) {
  // fonction doit me retourner faux si j'ai pas le droit d'aller qqpart et vrai si j'ai le droit
  if (caseDestination.classList.contains("wall")) {
    return false;
  } else {
    return true;
  }
}
function checkDirectionGhost(caseDestination) {
  // fonction doit me retourner faux si il y a déjà un fantome et vrai si ce n'est pas le cas et donc que la case est libre
  if (caseDestination.classList.contains("ghost")) {
    return false;
  } else {
    return true;
  }
}

function checkPointEating(caseDestination) {
  if (caseDestination.classList.contains("pac-dots")) {
    incrementScore();
    pointAudio.play();
    caseDestination.classList.remove("pac-dots");
  }
}

function incrementScore() {
  score++;
  scoreDiv.innerHTML = score;
  if (score == 238) {
    winAudio.play();
    victory.style.display = "block";
    stopParty();
    score = 0;
  }
}

function generateGhost() {
  // je veux créer 4 fantomes
  for (let i = 0; i < 4; i++) {
    // je sélectionne toutes les cases qui ont une classe gost-area mais pas ghost
    let casePotentialForGhost = document.querySelectorAll(
      ".ghost-area:not(.ghost)"
    );
    // parmis les cases dispos j'en prend une au hasard
    let caseForGhost =
      casePotentialForGhost[
        Math.floor(Math.random() * casePotentialForGhost.length)
      ];
    // je leur ajoute la classe ghost
    caseForGhost.classList.add("ghost");
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function ghostMouvement() {
  // récupérer tous mes fantomes
  let caseDestination = null;
  let allGhost = document.querySelectorAll(".ghost");
  allGhost.forEach((ghost) => {
    let direction = getRandomNumber(4);
    let ghostCaseId = ghost.dataset.numerocase;

    switch (direction) {
      // vers le haut
      case 0:
        caseDestination = getCaseNumberDestination(ghostCaseId, directions.up);
        break;
      // vers le bas
      case 1:
        caseDestination = getCaseNumberDestination(
          ghostCaseId,
          directions.down
        );
        break;
      // vers la droite
      case 2:
        caseDestination = getCaseNumberDestination(
          ghostCaseId,
          directions.right
        );
        caseDestination.classList.add("right");
        caseDestination.classList.remove("left");
        break;
      // vers la gauche
      case 3:
        caseDestination = getCaseNumberDestination(
          ghostCaseId,
          directions.left
        );
        caseDestination.classList.add("left");
        caseDestination.classList.remove("right");
        break;
    }
    // vérifier si je peux aller dans cette direction
    if (
      checkDirectionWall(caseDestination) &&
      checkDirectionGhost(caseDestination)
    ) {
      ghost.classList.remove("ghost");
      caseDestination.classList.add("ghost");
      pacmanEatsGhost(caseDestination);
    }
  });
}

function getCaseNumberDestination(actualCase, direction) {
  let caseDestination = null;
  switch (direction) {
    case directions.up:
      // déplacement du fantome vers le haut
      caseDestination = getCaseByIndex(parseInt(actualCase) - sizeCaseWidth);
      break;
    case directions.down:
      // déplacement du fantome vers le bas
      caseDestination = getCaseByIndex(parseInt(actualCase) + sizeCaseWidth);
      break;
    case directions.left:
      // déplacement du fantome vers la gauche
      caseDestination = getCaseByIndex(parseInt(actualCase) - 1);
      break;
    case directions.right:
      // déplacement du fantome vers la droite
      caseDestination = getCaseByIndex(parseInt(actualCase) + 1);
      break;
  }
  return caseDestination;
}

function pacmanEatsGhost(caseToCheck) {
  if (
    caseToCheck.classList.contains("pacman") &&
    caseToCheck.classList.contains("ghost")
  ) {
    if (pacmanCanEat) {
      eatAudio.play();
      gameDiv.classList.add("pacmanCanEatsGhosts");
      caseToCheck.classList.remove("ghost");
      // au bout de 5 secondes pacman ne peut plus manger un fantome
      setTimeout(() => {
        pacmanCanEat = false;
        invicibleAudio.pause();
        mainAudio.play();
      }, "2000");
    } else {
      stopParty();
    }
  }
}

playButton.addEventListener("click", () => {
  mainImageDiv.style.display = "none";
  gameBoxDiv.style.display = "block";
  gameDiv.style.display = "flex";
  buttonStartDiv.style.display = "none";
  launchGame();
});

function stopParty() {
  mainAudio.pause();
  looseAudio.play();
  endScreen.style.display = "block";
  // supprimer les écouteurs d'évennements sur pacman et les fantomes
  if (intervalGhost != null) {
    clearInterval(intervalGhost);
  }
  document.removeEventListener("keyup", onKeyUpAction);
}

function onKeyUpAction(event) {
  pacmanMoves(event.key);
}

function reverseCount() {
  if (counterInterval != 0) {
    clearInterval(counterInterval);
  }
  counterInterval = setInterval(() => {
    reverseCountDiv.innerHTML = "Temps Restant : " + restTime;
    restTime--;

    if (restTime >= 20) {
      reverseCountDiv.classList.remove("danger");
      reverseCountDiv.classList.remove("warning");
      reverseCountDiv.classList.add("cool");
    } else if (restTime >= 10) {
      reverseCountDiv.classList.remove("cool");
      reverseCountDiv.classList.add("warning");
    } else if (restTime > 0) {
      reverseCountDiv.classList.remove("warning");
      reverseCountDiv.classList.add("danger");
    } else if ((restTime = 0)) {
      //partie terminée
      stopParty();
      reverseCountDiv.innerHTML = "Temps écoulé";
    }
  }, 1000);
}
