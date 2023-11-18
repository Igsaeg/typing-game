const scoreElement = document.getElementById("score");
const wordElement = document.getElementById("words");
const feedbackElement = document.getElementById("feedback");
const inputElement = document.getElementById("input");
let wordValue = '';
let letterArray = [];
let userInput = '';
let score = 0;
let place = 0;

function initGame() {
    place = 0;
    wordValue = words[Math.floor(Math.random() * words.length)];
    letterArray = wordValue.split('');
    wordElement.innerText = wordValue.toUpperCase();
}
function checkInput() {
    if (userInput == letterArray[place]) {
        place = (place + 1 !== letterArray.length) ? place + 1 : (initGame(), 0);
        let highlighted = letterArray.map((letter, i) => `<span style="${i < place ? 'color: green;' : ''}">${letter}</span>`).join('');
        score += 100;
        wordElement.innerHTML = highlighted.toUpperCase();
        feedbackElement.innerHTML = 'Correct!';
        new Audio('assets/correct.mp3').play();
    } else {
        score = Math.max(0, score - 50);
        feedbackElement.innerHTML = `Wrong, you pressed ${userInput.toUpperCase()}.`;
        new Audio('assets/wrong.mp3').play();
    }
    userInput = '';
    scoreElement.innerHTML = `Score: ${Math.floor(score)}`;
}
setInterval(() => {
    score = Math.max(0, score - 0.1 * score);
    scoreElement.innerHTML = `Score: ${Math.floor(score)}`;
}, 1000);
function mobileMode() {
    inputElement.style.display = (inputElement.style.display == 'block') ? 'none' : 'block';
    document.getElementById('button').classList.toggle('active');
}
document.addEventListener('keydown', (event) => {
    if (letterRegex.test(event.key) && !userInput) {
        userInput = event.key.toLowerCase();
        checkInput();
    }
});
document.addEventListener('keyup', () => { userInput = ''; });
inputElement.addEventListener('input', () => {
    if (letterRegex.test(inputElement.value)) {
        userInput = inputElement.value.toLowerCase();
        checkInput();
    }
    inputElement.value = '';
});
initGame();