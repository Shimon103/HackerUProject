// hangman

const guessWord = document.getElementById('current-word');
const lettersGuessed = document.getElementById('letters-guessed');
const remainingGuessesElement = document.getElementById('guesses-remaining');
const hangedManImg = document.getElementById('hangedManImg');
const winMessage = document.getElementById('winMessage');
const loseMessage = document.getElementById('loseMessage');
const overlay = document.getElementById('overlay');
const resetBtn = document.getElementById('resetBtn');

let gameWord = '';
let guessedLetters = [];
let remainingGuesses = 6;
let correctGuesses = 0;
let wrongGuesses = 0;

const getWord = () => {
    const { word, hint1, hint2 } = wordlist[Math.floor(Math.random() * wordlist.length)];
    gameWord = word;
    guessedLetters = [];
    correctGuesses = 0;
    remainingGuesses = 6;
    wrongGuesses = 0;
    remainingGuessesElement.innerText = `${remainingGuesses}/6`;
    lettersGuessed.innerText = '';
    winMessage.classList.add('hidden');
    loseMessage.classList.add('hidden');
    overlay.style.visibility = 'hidden'; 
    hangedManImg.src = `./assets/hangman-${6 - remainingGuesses}.svg`;
    document.getElementById('hint1').innerText = hint1;
    document.getElementById('hint2').innerText = ''; 
    guessWord.innerHTML = word.split('').map(char => 
        char === ' ' ? '<li class="guessLetter"> </li>' : '<li class="guessLetter">_</li>'
    ).join('');
};

const updateHangmanImage = () => {
    hangedManImg.src = `./assets/hangman-${6 - remainingGuesses}.svg`;
};

const updateGuessedLetters = () => {
    lettersGuessed.innerText = guessedLetters.join(', ');
};

const handleGuess = (e) => {
    const letter = e.target.id;

    e.target.disabled = true;
    e.target.style.backgroundColor = 'grey'; 
    e.target.style.cursor = 'not-allowed';

    // Prevent repeating guesses
    if (guessedLetters.includes(letter)) {
        return;
    }

    guessedLetters.push(letter);
    updateGuessedLetters();

    let letterFound = false; 

    const wordArray = gameWord.split('');
    const guessLetters = guessWord.getElementsByClassName('guessLetter');

    wordArray.forEach((char, index) => {
        if (char.toLowerCase() === letter.toLowerCase()) {
            guessLetters[index].innerText = letter;
            correctGuesses++;
            letterFound = true;
        }
    });

    if (correctGuesses === gameWord.replace(/ /g, '').length) {
        winMessage.classList.remove('hidden');
        overlay.style.visibility = 'visible';
        return;
    }

    if (!letterFound) {
        remainingGuesses--;
        wrongGuesses++; 
        remainingGuessesElement.innerText = `${remainingGuesses}/6`;
        updateHangmanImage();

        if (wrongGuesses >= 3 && document.getElementById('hint2').innerText === '') {
            document.getElementById('hint2').innerText = wordlist.find(wordObj => wordObj.word === gameWord).hint2;
        }

        if (remainingGuesses === 0) {
            loseMessage.classList.remove('hidden');
            overlay.style.visibility = 'visible';
            return;
        }
    }
};

resetBtn.addEventListener('click', () => {
    getWord();
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '#2980B9'; 
        button.style.cursor = 'pointer';
    });
});

document.querySelectorAll('.letter').forEach(button => {
    button.addEventListener('click', handleGuess);
});

window.onload = getWord;
