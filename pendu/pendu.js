// générer un mot aléatoire
// afficher le mot en masqué
// pouvoir proposer des lettres
// afficher les lettres trouvées
// gérer un nombre d'erreurs max
import { Utils } from "../lib/utils/utils.js";
import { Confetti } from "../lib/utils/confetti.js";

const buttonPlay = document.querySelector("#beginGame");
const wordToFindDiv = document.querySelector("#wordToFindDiv");
const keyBoardDiv = document.querySelector("#keyBoard");
const mistakesCounterDiv = document.querySelector("#mistakesCounter");
const letterFoundCounterDiv = document.querySelector("#letterFoundCounter");
const endGameDiv = document.querySelector("#endGame");
const mainDiv = document.getElementById("main");

let wordToFind;
let wordToFindArray;
let audioBack = new Audio("assets/audio/backgroundmusic.mp3");
let cptLetterFound;
let cptErreur;
let audioCorrect = new Audio("assets/audio/success.mp3");
let audioError = new Audio("assets/audio/fatalerror.mp3");
let audioEndGame = new Audio("assets/audio/looser.mp3");
let audioVictory = new Audio("assets/audio/victory.mp3");
const allWords = [
  "chien",
  "meduse",
  "violet",
  "voiture",
  "musique",
  "champignon",
  "football",
  "basket",
  "chaussure",
  "gendarme",
  "coccinelle",
  "pizza",
  "piscine",
  "plage",
  "grenier",
  "television",
  "vacances",
  "jambon",
  "trampoline",
  "toilettes",
  "douche",
  "garage",
  "assiette",
  "livre",
  "guitare",
  "pantalon",
  "cochon",
  "ordinateur",
  "fleur",
  "fusee",
  "yaourt",
  "chocolat",
  "film",
  "guirlande",
  "trottinette",
  "devinette",
  "gourmand",
  "chat",
  "concombre",
  "moustache",
  "cheval",
  "wagon",
  "zebre",
  "yoyo",
  "pain",
  "piano",
  "batterie",
  "casserole",
  "escalier",
];

mistakesCounterDiv.classList.add("mistakes");
endGameDiv.classList.add("endGame");
endGameDiv.style.visibility = "hidden";
audioBack.volume = 0.1;

buttonPlay.addEventListener("click", function () {
  mainDiv.classList.add("mainStart");
  cptErreur = 0;
  cptLetterFound = 0;
  wordToFindDiv.style.display = "block";
  endGameDiv.style.visibility = "hidden";
  keyBoardDiv.style.display = "flex";
  letterFoundCounterDiv.style.display = "block";
  mistakesCounterDiv.style.display = "block";
  launchGame();
});

function launchGame() {
  // commencer la partie
  audioBack.play();
  letterFoundCounterDiv.innerHTML = "";
  mistakesCounterDiv.innerHTML = "";
  wordToFindDiv.innerHTML = "";
  wordToFind = generateWord();
  console.log(wordToFind);
  // afficher le mot généré de façon aléatoire
  // wordToFindDiv.innerHTML = wordToFind;
  // mettre ce mot sous forme d'un tableau pour pouvoir identifier chaque lettre
  wordToFindArray = Array.from(wordToFind);

  let table = document.createElement("table");
  let line = document.createElement("tr");
  line.id = "LineOfWord";
  wordToFindArray.forEach((letter) => {
    // creer un td (case du tableau) par lettre
    let td = document.createElement("td");
    td.dataset.letter = letter;
    td.innerText = "_";
    line.appendChild(td);
  });

  table.appendChild(line);
  wordToFindDiv.appendChild(table);

  generateKeyBoard();
}

function generateKeyBoard() {
  // on vide l'alphabet automatique avant de recommencer une nouvelle partie
  keyBoardDiv.innerHTML = "";
  let alphabet = generateAlphabet();
  alphabet.forEach((letter) => {
    let letterDiv = document.createElement("div");
    letterDiv.innerHTML = letter;
    letterDiv.classList.add("letterKeyBoard");
    keyBoardDiv.appendChild(letterDiv);

    letterDiv.addEventListener("click", function () {
      if (checkLetterInWord(letter)) {
        // afficher la lettre dans le mot masqué
        let lineWord = document.getElementById("LineOfWord");
        let allTdOfWord = lineWord.children;

        Array.from(allTdOfWord).forEach((td) => {
          if (td.dataset.letter == letter) {
            td.innerHTML = letter;
            cptLetterFound++;
            letterFoundCounterDiv.innerHTML =
              "Bravo tu as trouvé " + cptLetterFound + " lettre(s)";
            letterFoundCounterDiv.classList.add("letterFound");
          }
        });

        if (cptLetterFound == wordToFindArray.length) {
          keyBoardDiv.innerHTML = "";
          audioVictory.play();
          mistakesCounterDiv.innerHTML =
            "Bravo !!! Tu as trouvé le mot en " +
            cptErreur +
            " erreurs <br> Tu es un grand maitre !!";
          Confetti.launchAnimationConfetti();
        }
      } else {
        // incrémenter le compteur d'erreur
        cptErreur++;
        audioError.play();
        mistakesCounterDiv.innerHTML = cptErreur + " erreur(s)";
        if (cptErreur >= 4 && cptErreur < 6) {
          mistakesCounterDiv.innerHTML =
            cptErreur +
            " erreurs<br> Attention ça sent la défaite à plein nez !!";
        } else if (cptErreur == 6) {
          mainDiv.classList.remove("mainStart");
          mainDiv.classList.add("mainEnd");
          endGameDiv.style.visibility = "visible";
          audioEndGame.play();
          wordToFindDiv.style.display = "none";
          keyBoardDiv.style.display = "none";
          mistakesCounterDiv.style.display = "none";
          letterFoundCounterDiv.style.display = "none";
        }
      }
      letterDiv.style.visibility = "hidden";
    });
  });
}

function generateAlphabet(capital = false) {
  let tab = [];
  let i = 65;
  if (!capital) {
    i += 32;
  }
  let finish = i + 26;
  for (i; i < finish; i++) {
    tab.push(String.fromCharCode(i));
  }
  return tab;
}

function generateWord() {
  let indexWord = Utils.getRandomInt(allWords.length);
  return allWords[indexWord];
}

function checkLetterInWord(letter) {
  let findLetter = false;
  wordToFindArray.forEach((letterOfWord) => {
    if (letter == letterOfWord) {
      findLetter = true;
      audioCorrect.play();
    }
  });
  return findLetter;
}
