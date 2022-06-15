'use strict';
let winGame = false;
let playerTurn = 0;
let playersScores = [0, 0];
let currentScore = 0;


const players = document.querySelectorAll(".player")
const primaryScores = document.querySelectorAll(".score");
const currentScores = document.querySelectorAll(".current-score");
const diceImg = document.querySelector('.dice');

const btnRollDice = document.querySelector('.btn.btn--roll');
const btnHold = document.querySelector('.btn.btn--hold');
const btnReset = document.querySelector('.btn.btn--new');

const switchPlayer = () => {
    currentScore = 0;
    currentScores[playerTurn].textContent = 0;
    players[playerTurn].classList.remove('player--active');
    playerTurn = playerTurn === 0 ? 1 : 0;
    players[playerTurn].classList.add('player--active');
}


const diceOne = () => {

    currentScores[playerTurn].textContent = 0;
    switchPlayer();
}

const addScore = (diceValue) => {
    currentScore += diceValue;
    currentScores[playerTurn].textContent = currentScore;
}

const playerHold = () => {
    if (!winGame) {
        playersScores[playerTurn] += currentScore;
        primaryScores[playerTurn].textContent = playersScores[playerTurn];
        if (playersScores[playerTurn] > 100) {
            players[playerTurn].classList.add("player--winner");
            winGame = true;
            diceImg.classList.add("hidden");
            //resetGame();
        }
        else
            switchPlayer();
    }
}

const rollDice = () => {
    if (!winGame) {
        if(diceImg.classList.contains = "hidden")diceImg.classList.remove("hidden");
        const diceNumber = Math.floor(Math.random() * 6) + 1;
        diceImg.setAttribute("src", `img/dice-${diceNumber}.png`);

        if (diceNumber > 1) addScore(diceNumber);
        else diceOne();
    }
}

const resetGame = () => {
    winGame = false;
    currentScore = 0;
    playersScores = [0, 0];
    diceImg.classList.add("hidden");
    players[playerTurn].classList.remove("player--winner");
    players.forEach(player => player.classList.remove('player--active'));
    primaryScores.forEach(player => player.textContent = 0);
    currentScores.forEach(player => player.textContent = 0);

    playerTurn = 0;
    players[playerTurn].classList.add('player--active');
}

btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', playerHold);
btnReset.addEventListener('click', resetGame);







