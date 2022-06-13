'use strict';

const btnCheck = document.querySelector('.btn.check');
const btnReset = document.querySelector('.btn.again');

const highScoreEl = document.querySelector('.highscore');
const scoreEl = document.querySelector('.score');
const message = document.querySelector('.message');

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let score = +scoreEl.textContent;
let playerWin = false;




//document.querySelector('.number').textContent = randomNumber

const resetGame = () =>{
    playerWin = false;
    message.textContent = "Start guessing...";
    document.querySelector('body')
        .style.backgroundColor = "#222";
    document.querySelector('.guess').value = "";
    scoreEl.textContent = '20';
    score = 20;
    randomNumber = Math.trunc(Math.random() * 20) + 1;
}


const verifyScore = (text) => {
    message.textContent = `${text}`
    score--;
    scoreEl.textContent = score;
    if (score <= 0) {
        message.textContent = "You lose!";
    }
}

const winFunction = () => {
    message.textContent = "Corect!";
    playerWin = true;
    document.querySelector('body')
        .style.backgroundColor = "#60b347";
    if(score>+highScoreEl.textContent) highScoreEl.textContent = score;
    
}
const checkFunction = () => {
    if (score <= 0 || playerWin) { return; }
    const value = +document.querySelector('.guess').value;
    if (!value) message.textContent = "Please enter a number!";
    if (value === randomNumber) {
        winFunction();
    }
    else if (value < randomNumber) {
        verifyScore("To low");
    }
    else {
        verifyScore("To high!");
    }

}


// const userInput = document.querySelector('.guess');

btnCheck.addEventListener('click', checkFunction);
btnReset.addEventListener('click', resetGame);
