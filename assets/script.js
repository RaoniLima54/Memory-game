const correctSound = new Audio('assets/sounds/certo.mp3');
const wrongSound = new Audio('assets/sounds/errado.mp3');


function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector('.card-back img').src;
  const img2 = card2.querySelector('.card-back img').src;

  if (img1 === img2) {
    correctSound.play();
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === images.length) {
      message.textContent = '🎉 PARABÉNS! Você encontrou todos os pares!';
      history.push(attempts);
      localStorage.setItem('memoryGameHistory', JSON.stringify(history));
      renderHistory();
    }
  } else {
    wrongSound.play();
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 500);
  }
}


const images = [
  'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  'https://cdn-icons-png.flaticon.com/512/616/616430.png',
  'https://cdn-icons-png.flaticon.com/512/616/616440.png'
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let history = JSON.parse(localStorage.getItem('memoryGameHistory')) || [];

const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const historyDiv = document.getElementById('history');

function initGame() {

  cards = [...images, ...images].sort(() => 0.5 - Math.random());
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  attempts = 0;
  message.textContent = '';
  renderHistory();

  cards.forEach((src, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const img = document.createElement('img');
    img.src = src;

    cardBack.appendChild(img);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attempts++;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector('.card-back img').src;
  const img2 = card2.querySelector('.card-back img').src;

  if (img1 === img2) {
    correctSound.play();
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === images.length) {
      message.textContent = '🎉 PARABÉNS! Você encontrou todos os pares!';
      history.push(attempts);
      localStorage.setItem('memoryGameHistory', JSON.stringify(history));
      renderHistory();
    }
  } else {
    wrongSound.play();
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 500);
  }
}

function resetGame() {
  initGame();
}

function renderHistory() {
  historyDiv.innerHTML = '<strong>Histórico de tentativas:</strong><br>' +
    history.map((att, i) => `Rodada ${i + 1}: ${att} tentativas`).join('<br>');
}

initGame();


