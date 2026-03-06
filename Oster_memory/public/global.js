let firstCard = null;
let secondCard = null;
let lock = false;

let moves = 0;
let time = 0;
let pairs = 0;

let timer;

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".js-card");
  const totalCards = cards.length;

  const movesSpan = document.getElementById("moves");
  const timeSpan = document.getElementById("time");

  startTimer();

  cards.forEach(card => {
    card.addEventListener("click", () => flipCard(card, totalCards, movesSpan));
  });

});

function startTimer() {
  timer = setInterval(() => {
    time++;
    const timeSpan = document.getElementById("time");
    if (timeSpan) timeSpan.textContent = time;
  }, 1000);
}

function flipCard(card, totalCards, movesSpan) {

  if (lock) return;
  if (card.classList.contains("flipped")) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  moves++;
  if (movesSpan) movesSpan.textContent = moves;

  checkMatch(totalCards);
}

function checkMatch(totalCards) {

  lock = true;

  if (firstCard.dataset.value === secondCard.dataset.value) {

    pairs++;

    setTimeout(() => {

      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      resetTurn();

      if (pairs * 2 === totalCards) {
        endGame();
      }

    }, 400);

  } else {

    setTimeout(() => {

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetTurn();

    }, 700);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

function endGame() {
  clearInterval(timer);
  alert("Gewonnen! 🎉");
}