// ================= Page Switching =================
window.showPage = (id) => {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
};

// ================= Game Functions =================
window.startGameGlobal = (cardCount) => {
  window.lastCardCount = cardCount;
  resetGame();
  createBoard(cardCount);
  startTimer();
  showPage('game');
};

let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let time = 0;
let timer;
let pairs = 0;
let totalCards = 0;
let lastTime = 0;
let lastMoves = 0;

const availableImages = [
  'Eier1.png','Eier2.png','Eier3.png','Eier4.png',
  'Hase1.png','Hase2.png','Karotten.png',
  'Kueken1.png','Kueken2.png',
  'Osterkorb1.png','Osterkorb2.png','Tulpen.png'
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function resetGame() {
  const board = document.getElementById('board');
  if (board) board.innerHTML = '';
  firstCard = secondCard = null;
  moves = 0;
  time = 0;
  pairs = 0;
  totalCards = window.lastCardCount;
  lock = false;
  const movesSpan = document.getElementById('moves');
  const timeSpan = document.getElementById('time');
  if (movesSpan) movesSpan.textContent = moves;
  if (timeSpan) timeSpan.textContent = time;
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    const timeSpan = document.getElementById('time');
    if (timeSpan) timeSpan.textContent = time;
  }, 1000);
}

function createBoard(count) {
  totalCards = count;
  const board = document.getElementById('board');
  if (!board) return;

  const columns = (count === 12 || count === 16) ? 4 : 6;
  board.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

  const pairCount = count / 2;
  const pool = shuffleArray([...availableImages]);
  const images = shuffleArray([...pool.slice(0, pairCount), ...pool.slice(0, pairCount)]);

  images.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = img;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="/img/${img}" alt="" /></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) firstCard = card;
  else {
    secondCard = card;
    moves++;
    const movesSpan = document.getElementById('moves');
    if (movesSpan) movesSpan.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  lock = true;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    pairs++;
    setTimeout(() => {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      if (pairs * 2 === totalCards) endGame();
      firstCard = secondCard = null;
      lock = false;
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard = secondCard = null;
      lock = false;
    }, 800);
  }
}

function endGame() {
  clearInterval(timer);
  window.lastTime = time;
  window.lastMoves = moves;
  showPage('end');
}