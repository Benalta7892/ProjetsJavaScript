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

let cardsPicked = [];
function flipCard(e) {
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
  // Verifier si les cartes sont identiques
}
