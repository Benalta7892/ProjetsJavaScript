// function getRandom(min, max) {
//   return Math.trunc(Math.random() * (max - min + 1)) + min;
// }
// console.log(getRandom(1, 100));

function getRandomNumber(min, max) {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];

  // 32 bits = de 0 à max de 4 294 967 295
  randomNumber = randomNumber / 4294967296;

  return Math.trunc(randomNumber * (max - min + 1)) + min;
}

function addASet(fromCode, toCode) {
  let charactersList = "";
  for (let i = fromCode; i <= toCode; i++) {
    charactersList += String.fromCharCode(i);
  }
  return charactersList;
}
const charactersSet = {
  lowerCaseChars: addASet(97, 122),
  upperCaseChars: addASet(65, 90),
  numbers: addASet(48, 57),
  symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
};

const passwordContent = document.querySelector(".password-content");
const errorMsg = document.querySelector(".error-msg");
const generateBtn = document.querySelector(".generate-password-btn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
let passwordLength = 10;
generateBtn.addEventListener("click", createPassword);

function createPassword() {
  const checkedDataSets = checkedSets();

  if (!checkedDataSets.length) {
    errorMsg.textContent = "Au moins une case doit être cochée !";
    return;
  } else errorMsg.textContent = "";

  const concatenatedDataSet = checkedDataSets.reduce((acc, cur) => acc + cur);

  let password = "";

  let passwordBase = [];
  for (let i = 0; i < checkedDataSets.length; i++) {
    passwordBase.push(checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)]);
  }

  for (let i = checkedDataSets.length; i < passwordLength; i++) {
    password += concatenatedDataSet[getRandomNumber(0, concatenatedDataSet.length - 1)];
  }

  passwordBase.forEach((item, index) => {
    const randomIndex = getRandomNumber(0, password.length);
    // Pour insérer un élément dans un tableau à un index donné
    password = password.slice(0, randomIndex) + passwordBase[index] + password.slice(randomIndex);
  });
  console.log(password);
}
createPassword();

function checkedSets() {
  const checkedSets = [];
  checkboxes.forEach((checkbox) => checkbox.checked && checkedSets.push(charactersSet[checkbox.id]));

  return checkedSets;
}

console.log(checkedSets());
