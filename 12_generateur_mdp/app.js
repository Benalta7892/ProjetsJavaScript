// function getRandom(min, max) {
//   return Math.trunc(Math.random() * (max - min + 1)) + min;
// }
// console.log(getRandom(1, 100));

function getRandomNumber(min, max) {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];

  // 32 bits = max de 4 294 967 295
  randomNumber = randomNumber / 4294967295;

  return Math.trunc(randomNumber * (max - min + 1)) + min;
}

console.log(getRandomNumber(1, 5));

function addASet(fromCode, toCode) {
  let charactersList = "";
  for (let i = fromCode; i <= toCode; i++) {
    charactersList += String.fromCharCode(i);
  }
  return charactersList;
}
console.log(addASet(50, 56));
const charactersSet = {
  lowercaseChars: addASet(97, 122),
  uppercaseChars: addASet(65, 90),
  numbers: addASet(48, 57),
  symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
};

console.log(charactersSet);
