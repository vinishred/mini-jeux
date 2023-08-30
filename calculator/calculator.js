/** TO DO LIST
 * mettre un timer
 * générer un calcul (deux chiffres aléatoires + ou - ou *)
 * laisser l'utilisateur mettre sa réponse
 * confronter sa réponse avec la solution
 * relancer un nouveau calcul jusqu'a la fin du timer
 */
const timerDiv = document.getElementById("timer");
const calculDiv = document.getElementById("calcul");
const propalDiv = document.getElementById("resultPropal");
const messengerDiv = document.getElementById("messenger");
const allOnGameDiv = document.querySelectorAll(".onGameDiv");
const nbSecondGameInput = document.getElementById("nbSecondGame");
const maxNumberCalcInput = document.getElementById("maxNumberCalc");

let calculInProgress = null;
let counterInterval = null;
let cptBadAnswer;
let cptCalculs = 0;
let cptGoodAnswer;
let maxCalculNumber = 20;
let rate = 0;
let restTime = 30;
let mainAudio = new Audio("assets/audio/lotus.mp3");
let goodAnswer = new Audio("assets/audio/good.mp3");
let badAnswer = new Audio("assets/audio/false.mp3");

document.getElementById("beginGame").addEventListener("click", function () {
  if (nbSecondGameInput.value != undefined) {
    restTime = nbSecondGameInput.value;
  }
  if (maxNumberCalcInput.value != undefined) {
    maxCalculNumber = maxNumberCalcInput.value;
  }
  messengerDiv.innerHTML = "";
  cptBadAnswer = 0;
  cptGoodAnswer = 0;
  mainAudio.play();
  launchTimer();
  generateCalcul();
  displayPayingDiv(true);
  document.getElementById("checkPropal").addEventListener("click", () => {
    checkPropal();
  });
  document
    .getElementById("resultPropal")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        checkPropal();
      }
    });
});

function launchTimer() {
  counterInterval = setInterval(() => {
    timerDiv.innerHTML = restTime;
    restTime--;
    if (restTime >= 30) {
      timerDiv.classList.remove("danger");
      timerDiv.classList.remove("warning");
      timerDiv.classList.add("cool");
    } else if (restTime >= 15) {
      timerDiv.classList.remove("cool");
      timerDiv.classList.add("warning");
    } else if (restTime >= 0) {
      timerDiv.classList.remove("warning");
      timerDiv.classList.add("danger");
    } else if (restTime < 0) {
      //partie terminée
      displayPayingDiv(false);
      cptCalculs = cptBadAnswer + cptGoodAnswer;
      rate = (cptGoodAnswer / cptCalculs) * 100;
      messengerDiv.innerHTML =
        "Bonne(s) réponse(s) : " + cptGoodAnswer + "<br>";
      messengerDiv.innerHTML +=
        "Mauvaise(s) réponse(s) : " + cptBadAnswer + "<br>";
      messengerDiv.innerHTML += "nombre de calculs : " + cptCalculs + "<br>";
      messengerDiv.innerHTML += "Pourcentage de réussite : " + rate + " %";
      clearInterval(counterInterval);
      nbSecondGameInput.value = "";
      maxNumberCalcInput.value = "";
    }
  }, 1000);
}

function generateCalcul() {
  calculInProgress = new Calcul();
  calculDiv.innerText = calculInProgress.showCalcul;
}

class Calcul {
  #operators = ["+", "-", "*"];
  nombre1;
  nombre2;
  operator;

  constructor() {
    this.nombre1 = this.#getRandomInt(10);
    this.nombre2 = this.#getRandomInt(10);
    // operator = un opérateur aléatoire dans operators
    this.operator = this.#operators[this.#getRandomInt(3)];
  }

  get result() {
    return eval(this.nombre1 + this.operator + this.nombre2);
  }

  get showCalcul() {
    return `${this.nombre1} ${this.operator} ${this.nombre2} `;
  }

  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

function checkPropal() {
  if (propalDiv.value == calculInProgress.result) {
    document.getElementById("messenger").innerHTML = "Bien joué";
    cptGoodAnswer++;
    goodAnswer.play();
  } else {
    document.getElementById("messenger").innerHTML =
      "C'est faux, la bonne réponsé était " + calculInProgress.result;
    cptBadAnswer++;
    badAnswer.play();
  }
  propalDiv.value = "";
  generateCalcul();
}

function displayPayingDiv(show) {
  let displayProperty = "none";
  if (show) {
    displayProperty = "block";
  }

  allOnGameDiv.forEach((element) => {
    element.style.display = displayProperty;
  });
}
