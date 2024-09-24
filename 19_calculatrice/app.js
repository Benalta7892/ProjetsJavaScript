const calculatorData = {
  calculation: "",
  result: "",
  displayedResults: false,
};

const buttons = [...document.querySelectorAll("[data-action]")];
const digitsBtns = buttons.filter((button) => /[0-9]/.test(button.getAttribute("data-action")));

digitsBtns.forEach((btn) => btn.addEventListener("click", handleDigits));

const calculationDisplay = document.querySelector(".calculation");
const resultDisplay = document.querySelector(".result");

// Fonction pour gerer les chiffres de la calculatrice et les afficher dans le display
function handleDigits(e) {
  const buttonValue = e.target.getAttribute("data-action");

  // Pour gerer le cas ou le premier chiffre est 0 pour ne pas l'afficher dans le calcul
  if (calculatorData.calculation === "0") calculatorData.calculation = "";

  //  Pour gerer le cas ou le resultat est affiché et on veut continuer le calcul
  calculatorData.calculation += buttonValue;
  resultDisplay.textContent = calculatorData.calculation;
}

const operatorsBtns = buttons.filter((button) => /[\/+*-]/.test(button.getAttribute("data-action")));

operatorsBtns.forEach((btn) => btn.addEventListener("click", handleOperators));

// Fonction pour gerer les operateurs de la calculatrice et les afficher dans le display
function handleOperators(e) {
  const buttonValue = e.target.getAttribute("data-action");

  if (!calculatorData.calculation && buttonValue === "-") {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    return;
  } else if (!calculatorData.calculation) {
    return;
  } else if (calculatorData.calculation.slice(-1).match(/[\/+*-]/)) {
    calculatorData.calculation = calculatorData.calculation.slice(0, -1) + buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
  } else {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
  }
}
