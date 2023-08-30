/**
 * TO DO LIST
 * déroulement d'un tour:
 * générer des cartes aléatoirement
 * laisser les cartes visibles pendant 5 secondes
 * laisser 3 secondes au joueur pour choisir une carte
 * si gagné recommencer le tour
 * si perdu fin de la partie
 */
import { Utils } from "../lib/utils/utils.js";
import { Confetti } from "../lib/utils/confetti.js";

const elementToFindDiv = document.getElementById("elementToFind");
elementToFindDiv.classList.add("elementToFind");
const plateau = document.getElementById("cardsPlateau");
const reverseCountDiv = document.getElementById("reverseCount");
reverseCountDiv.style.display = "none";
const messengerDiv = document.getElementById("messenger");
messengerDiv.classList.add("messenger");
const startButtonDiv = document.getElementById("startButton");
let mainAudio = new Audio("assets/audio/main.mp3");
mainAudio.volume = 0.1;
let looseAudio = new Audio("assets/audio/loose.mp3");
mainAudio.volume = 0.1;
let winAudio = new Audio("assets/audio/win.mp3");
mainAudio.volume = 0.1;

let classCardToFind = 0;
let counterInterval = 0;
let nbCardsParam = 2;
let restTime = 0;

startButtonDiv.addEventListener("click", () => {
  mainAudio.play();
  launchGame();
});

function launchGame() {
  plateau.innerHTML = "";
  reverseCountDiv.style.display = "block";
  clearInterval(counterInterval);
  generateCards(nbCardsParam);
  elementToFindDiv.innerHTML = "";
  elementToFindDiv.classList.add("reverseCard");

  restTime = 5;
  let nbCardToFind = Utils.getRandomInt(nbCardsParam);
  let cardsPlateau = plateau.querySelectorAll(".perso");
  classCardToFind = cardsPlateau[nbCardToFind].classList;
  console.log(classCardToFind);

  Timer();
  HiddenCard();
}

function generateCards(nbCards) {
  // on crée une fonction qui dit que pour le nombre de cartes différentes que l'on souhaite créer (c'est à dire 24 car on a 24 personnages différents) à chaque fois on crée une div qui aura la classe perso et la classe perso+nombre corespondant au personnage

  for (let i = 0; i < nbCards; i++) {
    // je crée la div
    let newCard = document.createElement("div");
    newCard.classList.add("perso");
    // on génère un chiffre aléatoire et on l'attribut à la classe du personnage corespondant
    let nbPersoAlea = Utils.getRandomInt(24);
    newCard.classList.add("perso" + nbPersoAlea);

    // j'ajoute chaque carte au plateau
    plateau.appendChild(newCard);
  }
}
function HiddenCard() {
  setTimeout(() => {
    let allCards = document.querySelectorAll(".perso");
    allCards.forEach((card) => {
      card.classList.add("reverseCard");
      gameInProgress(card);
    });
    let newCardToFind = document.createElement("div");
    newCardToFind.classList = classCardToFind;
    elementToFindDiv.classList.remove("reverseCard");
    newCardToFind.classList.remove("reverseCard");
    newCardToFind.classList.add("cardFind");
    elementToFindDiv.appendChild(newCardToFind);
  }, "6000");
}

function Timer() {
  counterInterval = setInterval(() => {
    reverseCountDiv.innerHTML = restTime;
    reverseCountDiv.classList.add("reverseCount");
    restTime--;
    if (restTime < 0) {
      //au joueur de jouer
      reverseCountDiv.innerHTML = "0";
    }
  }, 1000);
}
function gameInProgress(card) {
  card.addEventListener("click", () => {
    if (classCardToFind.value == card.classList.value) {
      card.classList.remove("reverseCard");
      winAudio.play();
      messengerDiv.innerHTML = "Bien joué";
      Confetti.launchAnimationConfetti();
      newTour();
    } else {
      card.classList.remove("reverseCard");
      messengerDiv.innerHTML = "Perdu";
      endGame();
    }
  });
}

function newTour() {
  let endGameDiv = document.createElement("div");
  endGameDiv.classList.add("endGameDiv");
  endGameDiv.innerHTML = "Partie terminée votre score est de " + nbCardsParam;
  messengerDiv.appendChild(endGameDiv);

  let replayButton = document.createElement("button");
  replayButton.classList.add("replayButton");
  replayButton.innerHTML = "Niveau Suivant";
  messengerDiv.appendChild(replayButton);

  replayButton.addEventListener("click", () => {
    replayButton.innerHTML = " ";
    endGameDiv.innerHTML = " ";
    messengerDiv.innerHTML = " ";
    nbCardsParam++;
    launchGame();
  });
}

function endGame() {
  looseAudio.play();
  let endGameDiv = document.createElement("div");
  endGameDiv.classList.add("endGameDiv");
  endGameDiv.innerHTML = "Partie terminée votre score est de " + nbCardsParam;
  messengerDiv.appendChild(endGameDiv);

  let replayButton = document.createElement("button");
  replayButton.classList.add("replayButton");
  replayButton.innerHTML = "Rejouer";
  messengerDiv.appendChild(replayButton);

  replayButton.addEventListener("click", () => {
    replayButton.innerHTML = " ";
    endGameDiv.innerHTML = " ";
    messengerDiv.innerHTML = " ";
    nbCardsParam = 2;
    launchGame();
  });
}
