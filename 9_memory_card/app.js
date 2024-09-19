const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach((card) => {
    const randomPos = Math.trunc(Math.random() * 12);
    console.log(randomPos);
    card.style.order = randomPos;
  });
}

shuffleCards();

cards.forEach((card) => card.addEventListener("click", flipCard));

let locked = false;
let cardsPicked = [];
function flipCard(e) {
  if (locked) return;

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length === 2) result();
}

function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
  console.log(cardsPicked);
}

function result() {
  saveNumberOfTries();
  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener("click", flipCard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipCard);
    cardsPicked = [];
    return;
  }

  locked = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    locked = false;
  }, 1000);
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score");

let numberOfTries = 0;
function saveNumberOfTries() {
  numberOfTries++;
  const checkForEnd = innerCards.filter((card) => !card.classList.contains("active"));
  if (!checkForEnd.length) {
    advice.textContent = "Bravo ! appuyez sur 'espace' pour relancer une partie";
    score.textContent = `Votre score final : ${numberOfTries}`;
    return;
  }
  score.textContent = `Nombre de coups : ${numberOfTries}`;
}
