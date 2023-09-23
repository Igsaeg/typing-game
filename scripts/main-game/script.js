// Elements
const scoreElement = document.getElementById("score");
const wordElement = document.getElementById("words");
const feedbackElement = document.getElementById("feedback");
const mobileInputElement = document.getElementById("mobileInput");
const buttonElement = document.getElementById("button");

// Constants
const words = [
  "apple","banana","chocolate","dog",
  "furniture","grape","happiness",
  "igloo","jazz","kangaroo","lemon","mango",
  "notebook","ocean","penguin","quilt","rainbow",
  "strawberry","tiger","umbrella","violin","watermelon",
  "xylophone","yacht","zebra","butterfly","carrot",
  "dolphin","eagle","fireworks","giraffe","helicopter",
  "ice cream","jigsaw","kiwi","lighthouse","mountain",
  "narwhal","octopus","peacock","quokka","rhinoceros",
  "saxophone","tornado","vampire","waffle",
  "x-ray","yeti","zucchini","accordion","bicycle","cactus",
  "dandelion","flamingo","guitar","hedgehog",
  "iguana","jellyfish","koala","lemur","macaw","opera",
  "panda","quasar","rocket","squirrel","turtle",
  "volcano","whale","xenophobe","yak","zeppelin"
];
const letterRegex = /^[a-zA-Z]$/;

// Variables
let wordValue = "";
let letterArray = [];
let userInput = "";
let score = 0;
let keyPressed = false;
let mobileMode = false;
let displaySwitch = 0;

// Functions
function initGame() {
  place = 0;
  let wordRan = Math.floor(Math.random() * words.length);
  wordValue = words[wordRan];
  letterArray = wordValue.split('');
  wordElement.innerHTML = `${wordValue}`.toUpperCase();
}

function checkInput() {
  if (userInput === letterArray[place]) {
    if (place+1 !== letterArray.length) {
      place++;
    } else {
      initGame();
    }
    let highlighted = "";
    for (let i = 0; i < wordValue.length; i++) {
      const colorStyle = i < place ? 'color: green;' : '';
      highlighted += `<span style="${colorStyle}">${wordValue[i]}</span>`;
    }
    score += 100;
    wordElement.innerHTML = highlighted.toUpperCase();
    feedbackElement.innerHTML = `Correct!`;
    const sound1 = new Audio("audio/correct.mp3");
    sound1.play();
  } else {
    score -= 50;
    feedbackElement.innerHTML = `Wrong, you pressed ${userInput.toUpperCase()}.`;
    const sound1 = new Audio("audio/wrong.mp3");
    sound1.play();
  }
  userInput = "";
  score0Handler();
  scoreElement.innerHTML = `Score: ${score}`;
}

function score0Handler() {
  if (score <= 0) {
    score = 0;
  }
}

setInterval(() => {
  score -= 10;
  score0Handler();
  scoreElement.innerHTML = `Score: ${score}`;
}, 1000);

function toggleMobileMode() {
  if (displaySwitch === 0) {
    mobileInputElement.style.display = "block";
    displaySwitch = 1;
  } else {
    mobileInputElement.style.display = "none";
    displaySwitch = 0;
  }
  buttonElement.classList.toggle("active");
}

// Event Listiners
document.addEventListener('keydown', function (event) {
  if (!keyPressed && letterRegex.test(event.key)) {
    userInput = event.key.toLowerCase();
    keyPressed = true;
    checkInput();
  }
});
document.addEventListener('keyup', function (event) {
  if (keyPressed) {
    keyPressed = false;
  }
});

mobileInputElement.addEventListener('input', function (event) {
  if (letterRegex.test(mobileInputElement.value)) {
    userInput = mobileInputElement.value.toLowerCase();
    checkInput();
  }
  mobileInputElement.value = "";
});

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    initGame();
  }, 2000);
});