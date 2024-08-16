'use strict';

// Calling HTML Elements

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// defualt values
let score = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;

let playing = true;

dice.classList.add('hidden');

let currentScore = 0;

let activePlayer = 0;

let randomNum = 0;

// change active player

const changeActive = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

// update score

const updateScore = function () {
  score[`${activePlayer}`] += Number(
    document.querySelector(`#current--${activePlayer}`).textContent
  );
  score0El.textContent = score[0];
  score1El.textContent = score[1];
};

// reset current score

const restCurrentScore = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

// roll dice

btnRoll.addEventListener('click', () => {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    randomNum = diceNumber;
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNum}.png`;

    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      restCurrentScore();

      changeActive();
    }
  }
});

// holding score

btnHold.addEventListener('click', () => {
  if (playing) {
    if (
      score[`${activePlayer}`] +
        Number(
          document.querySelector(`#current--${activePlayer}`).textContent
        ) <
      100
    ) {
      updateScore();

      restCurrentScore();

      changeActive();
    } else {
      updateScore();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      dice.classList.add('hidden');

      playing = false;
    }
  }
});

// reset game

btnNew.addEventListener('click', () => {
  playing = true;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  currentScore = 0;
  activePlayer = 0;
  randomNum = 0;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
});
