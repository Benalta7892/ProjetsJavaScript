const sentence = document.querySelector(".sentence-to-write");
const textareaToTest = document.querySelector(".textarea-to-test");
let spansFromAPISentence;

const APIEndpoint = "http://api.quotable.io/random";

async function getNewSentence() {
  try {
    const response = await fetch(APIEndpoint);

    if (!response.ok) throw new Error();

    const { content } = await response.json();

    sentence.textContent = "";

    content.split("").forEach((character) => {
      const spanCharacter = document.createElement("span");
      spanCharacter.textContent = character;
      sentence.appendChild(spanCharacter);
    });

    spansFromAPISentence = sentence.querySelectorAll("sentence-to-write span");
  } catch (error) {
    console.log(error);
  }
}

getNewSentence();

const timeDisplayed = document.querySelector(".time");
const scoreDisplayed = document.querySelector(".score");

window.addEventListener("keydown", handleStart);

let time = 60;
let score = 0;

function handleStart(e) {
  if (e.key === "Escape") {
    time = 60;
    score = 0;

    timeDisplayed.classList.add("active");
    scoreDisplayed.classList.add("active");

    timeDisplayed.textContent = `Temps : ${time}`;
    scoreDisplayed.textContent = `Score : ${score}`;
    textareaToTest.value = "";

    spansFromAPISentence.forEach((span) => (span.className = ""));

    textareaToTest.addEventListener("input", handleTyping);
    textareaToTest.focus();
  }
}

function handleTyping(e) {
  const checkedSpans = checkSpans();
}

function checkSpans() {}
