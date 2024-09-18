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
    if (validationTexts[index]) validationTexts[index].style.display = "none";
  } else {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/error.svg";
    if (validationTexts[index]) validationTexts[index].style.display = "none";
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

const pswInput = document.querySelector(".input-group:nth-child(3) input");

pswInput.addEventListener("blur", passwordValidation);
pswInput.addEventListener("input", passwordValidation);

const passwordVerification = {
  length: false,
  symbol: false,
  number: false,
};

const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/,
};

let passwordValue;

function passwordValidation(e) {
  passwordValue = pswInput.value;
  let validationResult = 0;

  for (const prop in passwordVerification) {
    if (prop === "length") {
      if (passwordValue.length < 6) {
        passwordVerification.length = false;
      } else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    if (regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }
  }

  if (validationResult !== 3) {
    showValidation({ index: 2, validation: false });
  } else {
    showValidation({ index: 2, validation: true });
  }
}
