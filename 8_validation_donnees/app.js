const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-verif");

const userInput = document.querySelector(".input-group:nth-child(1) input");

userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if (userInput.value.length >= 3) {
    showValidation({ index: 0, validation: true });
  } else {
    showValidation({ index: 0, validation: false });
  }
}

function showValidation({ index, validation }) {
  if (validation) {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/check.svg";
    validationTexts[index].style.display = "none";
  } else {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/error.svg";
    validationTexts[index].style.display = "none";
  }
}

const mailInput = document.querySelector(".input-group:nth-child(2) input");

mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function mailValidation() {
  if (regexEmail.test(mailInput.value)) {
    showValidation({ index: 1, validation: true });
  } else {
    showValidation({ index: 1, validation: false });
  }
}
