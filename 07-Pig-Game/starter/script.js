'use strict';

const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.getElementById('score--1');
const currentScorePlayer1 = document.getElementById('current--0');
const currentScorePlayer2 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer, playing;

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const init = function () {
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    scorePlayer1.textContent = 0;
    scorePlayer2.textContent = 0;
    currentScorePlayer1.textContent = 0;
    currentScorePlayer2.textContent = 0;
    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

};
init();



const switchPlayer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');

}

//Rolling a dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        //Generating a random number on dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        //console.log(dice);

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Check if rolled 1. If yes, Switch player and if no add dice score to current score 
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }

    }
});

btnNew.addEventListener('click', init);