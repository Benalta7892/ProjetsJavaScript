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

  if (calculatorData.displayedResults) {
    calculatorData.textContent = "";
    calculatorData.calculation = "";
    calculatorData.displayedResults = false;
  } else if (calculatorData.calculation === "0") {
    // Pour gerer le cas ou le premier chiffre est 0 pour ne pas l'afficher dans le calcul
    calculatorData.calculation = "";
  }

  //  Pour gerer le cas ou le resultat est affiché et on veut continuer le calcul
  calculatorData.calculation += buttonValue;
  resultDisplay.textContent = calculatorData.calculation;
}

const operatorsBtns = buttons.filter((button) => /[\/+*-]/.test(button.getAttribute("data-action")));

operatorsBtns.forEach((btn) => btn.addEventListener("click", handleOperators));

// Fonction pour gerer les operateurs de la calculatrice et les afficher dans le display
function handleOperators(e) {
  const buttonValue = e.target.getAttribute("data-action");

  if (calculatorData.displayedResults) {
    calculationDisplay.textContent = "";
    calculatorData.calculation = calculatorData.result += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    calculatorData.displayedResults = false;
    return;
  } else if (!calculatorData.calculation && buttonValue === "-") {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
    return;
  } else if (!calculatorData.calculation) {
    return;
  } else if (calculatorData.calculation.slice(-1).match(/[\/+*-]/) && calculatorData.calculation.length !== 1) {
    calculatorData.calculation = calculatorData.calculation.slice(0, -1) + buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
  } else if (calculatorData.calculation.length !== 1) {
    calculatorData.calculation += buttonValue;
    resultDisplay.textContent = calculatorData.calculation;
  }
}
const decimalButton = document.querySelector("[data-action='.']");

decimalButton.addEventListener("click", handleDecimal);

// Fonction pour gerer le cas ou on veut ajouter un point decimal
function handleDecimal() {
  if (!calculatorData.calculation) return;

  let lastSetOfNumbers = "";

  for (let i = calculatorData.calculation.length - 1; i >= 0; i--) {
    if (/[\/+*-]/.test(calculatorData.calculation[i])) {
      break;
    } else {
      lastSetOfNumbers += calculatorData.calculation[i];
    }
  }

  if (!lastSetOfNumbers.includes(".")) {
    calculatorData.calculation += ".";
    resultDisplay.textContent = calculatorData.calculation;
  }
}

const equalBtn = document.querySelector("[data-action='=']");
equalBtn.addEventListener("click", handleEqualBtn);

// Fonction pour gerer le cas ou on veut afficher le resultat du calcul
function handleEqualBtn() {
  if (/[\/+*-.]/.test(calculatorData.calculation.slice(-1))) {
    calculationDisplay.textContent = "Terminez le calcul avec un chiffre.";
    setTimeout(() => {
      calculationDisplay.textContent = "";
    }, 2500);
    return;
  } else if (!calculatorData.displayedResults) {
    calculatorData.result = customEval(calculatorData.calculation);
    resultDisplay.textContent = calculatorData.result;
    calculationDisplay.textContent = calculatorData.calculation;
    calculatorData.displayedResults = true;
  }
}

// console.log(customEval("11/2"));
// Fonction pour evaluer le calcul
function customEval(calculation) {
  if (!/[\/+*-]/.test(calculation.slice(1))) return calculation;

  // 550 * 60
  let operator;
  let operatorIndex;

  if (/[\/*]/.test(calculation.slice(1))) {
    for (let i = 1; i < calculation.length; i++) {
      if (/[\/*]/.test(calculation[i])) {
        operator = calculation[i];
        operatorIndex = i;
        break;
      }
    }
  } else {
    for (let i = 1; i < calculation.length; i++) {
      if (/[+-]/.test(calculation[i])) {
        operator = calculation[i];
        operatorIndex = i;
        break;
      }
    }
  }
  const operandsInfo = getIndexes(operatorIndex, calculation);
  console.log(operandsInfo);

  let currentCalculationResult;

  switch (operator) {
    case "+":
      currentCalculationResult = Number(operandsInfo.leftOperand) + Number(operandsInfo.rightOperand);
      break;
    case "-":
      currentCalculationResult = Number(operandsInfo.leftOperand) - Number(operandsInfo.rightOperand);
      break;
    case "*":
      currentCalculationResult = Number(operandsInfo.leftOperand) * Number(operandsInfo.rightOperand);
      break;
    case "/":
      currentCalculationResult = Number(operandsInfo.leftOperand) / Number(operandsInfo.rightOperand);
      break;
  }

  let updatedCalculation = calculation.replace(
    calculation.slice(operandsInfo.startIntervalIndex, operandsInfo.lastRightOperandCharacter),
    currentCalculationResult.toString()
  );

  if (/[\/+*-]/.test(updatedCalculation.slice(1))) {
    customEval(updatedCalculation);
  }

  console.log(updatedCalculation.split("."));

  if (updatedCalculation.includes(".")) {
    if (updatedCalculation.split(".")[1].length === 1) {
      return Number(updatedCalculation).toString();
    } else if (updatedCalculation.split(".")[1].length > 1) {
      return Number(updatedCalculation).toFixed(2).toString();
    }
  } else {
    return updatedCalculation;
  }
}

// Fonction pour recuperer les index des operandes
// 5500 * 50
function getIndexes(operatorIndex, calculation) {
  let rightOperand = "";
  let lastRightOperandCharacter;

  for (let i = operatorIndex + 1; i <= calculation.length; i++) {
    if (i === calculation.length) {
      lastRightOperandCharacter = calculation.length;
      break;
    } else if (/[\/+*-]/.test(calculation[i])) {
      lastRightOperandCharacter = i;
      break;
    } else {
      rightOperand += calculation[i];
    }
  }

  let leftOperand = "";
  let startIntervalIndex;

  for (let i = operatorIndex - 1; i >= 0; i--) {
    if (i === 0 && /[-]/.test(calculation[i])) {
      startIntervalIndex = 0;
      leftOperand += "-";
      break;
    } else if (i === 0) {
      startIntervalIndex = 0;
      leftOperand += calculation[i];
      break;
    } else if (/[\/+*-]/.test(calculation[i])) {
      startIntervalIndex = i + 1;
      break;
    } else {
      leftOperand += calculation[i];
    }
  }

  leftOperand = leftOperand.split("").reverse().join("");

  return {
    leftOperand,
    rightOperand,
    startIntervalIndex,
    lastRightOperandCharacter,
  };
}

const resetButton = document.querySelector("[data-action='c']");

resetButton.addEventListener("click", reset);

function reset() {
  calculatorData.calculation = "";
  calculatorData.displayedResults = false;
  calculatorData.result = "";
  resultDisplay.textContent = "0";
  calculationDisplay.textContent = "";
}

const clearEntryButton = document.querySelector("[data-action='ce']");

clearEntryButton.addEventListener("click", clearEntry);

function clearEntry() {
  if (!calculatorData.displayedResults) {
    if (resultDisplay.textContent[0] === "0") {
      return;
    } else if (resultDisplay.textContent.length === 1) {
      calculatorData.calculation = "0";
    } else {
      calculatorData.calculation = calculatorData.calculation.slice(0, -1);
    }
    resultDisplay.textContent = calculatorData.calculation;
  }
}
