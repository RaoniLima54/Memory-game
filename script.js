
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
    // Cria 2 cópias de cada imagem e embaralha
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

      const img = document.createElement('img');
      img.src = src;
      img.style.display = 'none';

      card.appendChild(img);
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;

    const index = this.dataset.index;
    this.classList.add('flipped');
    this.querySelector('img').style.display = 'block';
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      attempts++;
      setTimeout(checkMatch, 1000);
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === images.length) {
        message.textContent = '🎉 PARABÉNS! Você encontrou todos os pares!';
        history.push(attempts);
        localStorage.setItem('memoryGameHistory', JSON.stringify(history));
        renderHistory();
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.querySelector('img').style.display = 'none';
      card2.querySelector('img').style.display = 'none';
      flippedCards = [];
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
