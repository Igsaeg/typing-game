const scoreElement = document.getElementById("score");
const wordElement = document.getElementById("words");
const inputElement = document.getElementById("input");
let wordValue = '';
let letterArray = [];
let userInput = '';
let score = 0;
let place = 0;

function initGame() {
    place = 0;
    wordValue = sentences[Math.floor(Math.random() * sentences.length)];
    letterArray = wordValue.split('');
    wordElement.innerText = wordValue;
}
function checkInput() {
    if (userInput == letterArray[place]) {
        place = (place + 1 !== letterArray.length) ? place + 1 : (initGame(), 0);
        let highlighted = letterArray.map((letter, i) => `<span style="${i < place ? 'color: green;' : ''}">${letter}</span>`).join('');
        score += 100;
        wordElement.innerHTML = highlighted;
        new Audio('assets/correct.mp3').play();
    } else {
        let highlighted = letterArray.map((letter, i) => {
            if (letter === ' ') { return '_<wbr>'; }
            else { return `<span style="${i < place ? 'color: green;' : (i == place ? 'color: red;' : '')}">${letter}</span>`; }
        }).join('');
        score = Math.max(0, score - 50);
        wordElement.innerHTML = highlighted;
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
    if (letterRegex.test(event.key) && !userInput && !specialKeys.includes(event.key)) {
        userInput = event.key;
        checkInput();
    }
});
document.addEventListener('keyup', () => { userInput = ''; });
inputElement.addEventListener('input', () => {
    if (letterRegex.test(inputElement.value)) {
        userInput = inputElement.value;
        checkInput();
    }
    inputElement.value = '';
});
initGame();