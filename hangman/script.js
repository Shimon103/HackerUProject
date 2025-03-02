const guessWord = document.getElementById('current-word');
let gameWord
const getWord = () => {
    const { word,hint1,hint2 } = wordlist[Math.floor(Math.random() * wordlist.length)]; 
    document.getElementById('hint1').innerText = hint1;
    document.getElementById('hint2').innerText = hint2;
    guessWord.innerHTML =  word.split('').map(()=>'<li class="guessLetter">_</li>').join('');
    gameWord = word
}
const letters = document.querySelectorAll('.letter');
addEventListener('click', (e) => {
    console.log(e.target.id);
    if (gameWord.includes(e.target.id)){
        console.log('yes');
    }
    
    }
)

window.onload = getWord;
