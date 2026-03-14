const deckImagePath = "cards/deck.png";

const cardImage = document.getElementById("card-image");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnNewGame = document.getElementById("btn-new-game");
const btnRules = document.getElementById("btn-rules");
const btnCloseRules = document.getElementById("btn-close-rules");
const rulesOverlay = document.getElementById("rules-overlay");

let deck = [];
let currentIndex = -1; // -1 = Deckblatt wird angezeigt

function createShuffledDeck() {
  const cards = [];
  for (let i = 1; i <= 48; i++) {
    const num = String(i).padStart(2, "0");
    cards.push(`cards/${num}.png`);
  }

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function startNewGame() {
  deck = createShuffledDeck();
  currentIndex = -1;
  cardImage.src = deckImagePath;
  updateButtons();
}

function showNextCard() {
  if (currentIndex < deck.length - 1) {
    currentIndex++;
    cardImage.src = deck[currentIndex];
    updateButtons();
  }
}

function showPreviousCard() {
  if (currentIndex > -1) {
    currentIndex--;
    if (currentIndex === -1) {
      cardImage.src = deckImagePath;
    } else {
      cardImage.src = deck[currentIndex];
    }
    updateButtons();
  }
}

function updateButtons() {
  btnPrev.disabled = currentIndex <= -1;
  btnNext.disabled = currentIndex >= deck.length - 1;
}

btnNext.addEventListener("click", showNextCard);
btnPrev.addEventListener("click", showPreviousCard);
btnNewGame.addEventListener("click", startNewGame);

btnRules.addEventListener("click", () => {
  rulesOverlay.classList.remove("hidden");
});

btnCloseRules.addEventListener("click", () => {
  rulesOverlay.classList.add("hidden");
});

rulesOverlay.addEventListener("click", (event) => {
  if (event.target === rulesOverlay) {
    rulesOverlay.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  startNewGame();
});