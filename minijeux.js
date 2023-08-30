const audioButton = document.getElementById("audioPlay");
audioButton.classList.add("audioButton");
// const birdDiv = document.getElementById("bird");
// birdDiv.classList.add("bird");
let ouvertureAudio = new Audio("/assets/audio/ouverture.mp3");

audioButton.addEventListener("click", () => {
  ouvertureAudio.play();
});
