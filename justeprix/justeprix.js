//1/générer un chiffre en aléatoire
//2/l'utilisateur fera des propositions
//3/continuer tant que l'utilisateur n'a pas fait la bonne proposition
//alert("Go");
import { Utils } from "../lib/utils/utils.js";
import { Confetti } from "../lib/utils/confetti.js";

let numberToFind = 0;
// on cible notre div
const titleDiv = document.querySelector(".title-div");
const paragraphDiv = document.querySelector(".paragraph");
const resultDiv = document.getElementById("resultDiv");
const imagejavascript = document.createElement("img");
imagejavascript.src = "/justeprix/assets/img/bravo.jpg";
let audioStart = new Audio("/justeprix/assets/audio/generique.mp3");
audioStart.volume = 0.1;
const reverseCountDiv = document.getElementById("reverseCount");
let restTime = 0;
let counterInterval = 0;
const gamePropalDiv = document.getElementById("gamePropalDiv");
const userPropalDiv = document.getElementById("userPropal");

document.getElementById("beginGame").addEventListener("click", function () {
  paragraphDiv.style.display = "none";
  imagejavascript.style.display = "none";
  resultDiv.innerHTML = "";
  userPropalDiv.value = "";
  launchGame();
});

document
  .getElementById("checkPropalButton")
  .addEventListener("click", function () {
    // quand je clique je veux récupérer la valeur écrite par le user
    checkPropal();
  });

userPropalDiv.addEventListener("keyup", function (event) {
  //on veut savoir sur quelle touche le user appuie
  if (event.key == "Enter") {
    checkPropal();
  }
});

function checkPropal() {
  let numberPropal = document.getElementById("userPropal").value;
  if (numberToFind > numberPropal) {
    //on veut afficher c'est plus sur notre écran
    resultDiv.innerHTML = "c'est plus";
    //on veut aussi aujouter un son en cas d'erreur
    let audioMore = new Audio("/justeprix/assets/audio/wrong.wav");
    audioMore.play();
  } else if (numberToFind < numberPropal) {
    resultDiv.innerHTML = "c'est moins";
    let audioLess = new Audio("/justeprix/assets/audio/pet.wav");
    audioLess.play();
  } else if (numberToFind == numberPropal) {
    victory();
    launchAnimationConfetti();
  } else {
    resultDiv.innerHTML = "tu dois saisir un chiffre compris entre 0 et 1000";
    let audioFart = new Audio("/justeprix/assets/audio/pet.wav");
    audioFart.play();
  }
  userPropalDiv.value = "";
}

function launchGame() {
  //lancer la partie
  //recuperer un chiffre aleatoire
  // resultDiv.style.display = "none";
  // document.body.appendChild(imagejavascript).style.display = "none";

  numberToFind = Utils.getRandomInt(1000);
  gamePropalDiv.style.display = "block";
  restTime = 40;

  if (counterInterval != 0) {
    clearInterval(counterInterval);
  }
  counterInterval = setInterval(() => {
    reverseCountDiv.innerHTML = restTime;
    restTime--;

    if (restTime >= 20) {
      reverseCountDiv.classList.remove("danger");
      reverseCountDiv.classList.remove("warning");
      reverseCountDiv.classList.add("cool");
    } else if (restTime >= 10) {
      reverseCountDiv.classList.remove("cool");
      reverseCountDiv.classList.add("warning");
    } else if (restTime >= 0) {
      reverseCountDiv.classList.remove("warning");
      reverseCountDiv.classList.add("danger");
    } else if (restTime < 0) {
      //partie terminée
      endGame();
    }
  }, 1000);
  audioStart.play();
}

function endGame() {
  reverseCountDiv.innerHTML = "Le temps est écoulé<br>Looser!!";
  clearInterval(counterInterval);
  gamePropalDiv.style.display = "none";
  audioStart.pause();
}

function victory() {
  audioStart.pause();
  resultDiv.innerHTML = "c'est gagné";
  let audioWin = new Audio("assets/audio/win.wav");
  audioWin.play();
  Confetti.launchAnimationConfetti();
  Confetti.launchAnimationConfetti();
  Confetti.launchAnimationConfetti();
  imagejavascript.style.display = "inline-block";
  document.body.appendChild(imagejavascript);
  gamePropalDiv.style.display = "none";
  clearInterval(counterInterval);
}
