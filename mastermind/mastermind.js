/** TO DO LIST
 * générer la combinaison secrète (4 couleurs)
 * pouvoir proposer une combinaison
 * confronter la proposition à la combinaison
 * afficher les erreurs et les bonnes réponses
 * gérer début et fin de partie
 */
import { Utils } from "../lib/utils/utils.js";
import { Confetti } from "../lib/utils/confetti.js";

const coverImageDiv = document.getElementById("coverImage");
coverImageDiv.style.display = "block";
const colors = ["white", "red", "blue", "yellow", "green"];
let colorTabToFind = null;
const nbColorToFind = 4;
const allSelectDiv = document.getElementById("allSelect");
let checkAudio = new Audio("assets/audio/check.mp3");
let winAudio = new Audio("assets/audio/applause.mp3");
let backAudio = new Audio("assets/audio/Two Moons.mp3");
backAudio.volume = 0.5;

function getAleaColor() {
  let aleaIndex = Utils.getRandomInt(4);
  let aleaColor = colors[aleaIndex];
  return aleaColor;
}

function setAleaColorTab(size = 4) {
  colorTabToFind = [];
  for (let index = 0; index < size; index++) {
    colorTabToFind.push(getAleaColor());
  }
}

function generateLineSelect() {
  let line = document.createElement("div");
  line.classList.add("lineSelectDiv");
  for (let index = 0; index < nbColorToFind; index++) {
    generateSelect(line);
  }
  let btn = document.createElement("button");
  btn.innerHTML = "OK";
  line.appendChild(btn);
  btn.addEventListener("click", () => {
    checkPropal();
    checkAudio.play();
  });
  allSelectDiv.appendChild(line);
}

function generateSelect(target) {
  let mySelect = document.createElement("select");
  colors.forEach((color) => {
    let colorOption = document.createElement("option");
    colorOption.value = color;
    colorOption.style.background = color;
    mySelect.appendChild(colorOption);
  });
  mySelect.addEventListener("change", (e) => {
    console.log(e.target.value);
    e.target.style.backgroundColor = e.target.value;
  });

  target.appendChild(mySelect);
}

document.getElementById("startButton").addEventListener("click", () => {
  launchGame();
});

function launchGame() {
  allSelectDiv.style.display = "flex";
  coverImageDiv.style.display = "none";
  backAudio.play();
  getAleaColor();
  setAleaColorTab();
  console.log(colorTabToFind);
  allSelectDiv.innerHTML = "";
  generateLineSelect();
}

function checkPropal() {
  // on ne peut pas comparer des tableaux

  let allSelect = allSelectDiv.querySelectorAll("select");
  // on construit un tableau avec tous mes select dont je récupère la valeur sur les quatres dernieres valeurs
  let propal = Array.from(allSelect, (select) => select.value).slice(-4);
  console.log(propal);
  let cptGoodPlace = 0;
  let cptBadPlace = 0;
  // on créé une copie de notre tableau pour pouvoir le comparer et le modifier sans affecter notre tableau de base
  let colorTabToFindCopy = [...colorTabToFind];
  let lineResponse = document.createElement("div");
  lineResponse.classList.add("correction");

  // on parcours le tableau de propositions pour vérifier les élements bien placés
  for (let i = 0; i < propal.length; i++) {
    if (propal[i] == colorTabToFind[i]) {
      // la couleur est bonne et au bon endroit
      cptGoodPlace++;
      colorTabToFindCopy[i] = "trouvé";
      propal[i] = "trouvécotépropal";
    }
  }

  // on parcours le tableau de propositions pour vérifier les élements mal placés
  for (let i = 0; i < propal.length; i++) {
    if (propal[i] != "trouvécotépropal") {
      // on lui demande pour chaque couleur des couleurs à trouver
      for (let j = 0; j < colorTabToFindCopy.length; j++) {
        if (propal[i] == colorTabToFindCopy[j]) {
          // la couleur est bonne mais pas au bon endroit
          cptBadPlace++;
          colorTabToFindCopy[j] = "malplacé";
          propal[i] = "trouvécotépropal";
        }
      }
    }
  }

  lineResponse.innerHTML =
    "Tu as " +
    cptGoodPlace +
    " couleur(s) bien placée(s)<br>Tu as " +
    cptBadPlace +
    " couleur(s) mal placée(s)";
  allSelectDiv.appendChild(lineResponse);

  if (cptGoodPlace == colorTabToFind.length) {
    lineResponse.innerHTML = "Bravo tu as gagné";
    allSelectDiv.style.display = "none";
    Confetti.launchAnimationConfetti();
    winAudio.play();
    backAudio.pause();
  }
  generateLineSelect();
}
