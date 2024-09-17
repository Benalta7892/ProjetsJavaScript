const colorLabels = [...document.querySelectorAll(".input-group label")];
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")];
const rangeLabelValue = document.querySelector(".orientation-value");

const gradientData = {
  angle: 90,
  colors: ["#FF5F6D", "#FFC371"],
};

function populateUI() {
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];

  colorPickerInputs[0].value = gradientData.colors[0];
  colorPickerInputs[1].value = gradientData.colors[1];

  colorLabels[0].style.background = gradientData.colors[0];
  colorLabels[1].style.background = gradientData.colors[1];

  document.body.style.background = `
  linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  rangeLabelValue.textContent = `${gradientData.angle}°`;

  adaptInputColor();
}

populateUI();

function adaptInputColor() {
  colorLabels.forEach((label) => {
    const hexColor = label.textContent.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
    console.log(yiq);

    if (yiq >= 128) {
      label.style.color = "#111";
    } else {
      label.style.color = "#f1f1f1";
    }
  });
}

const rangeInput = document.querySelector(".inp-range");
rangeInput.addEventListener("input", handleInclination);

function handleInclination() {
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle}°`;
  populateUI();
}

colorPickerInputs.forEach((input) => input.addEventListener("input", colorInputModification));

function colorInputModification(e) {
  const currentInput = e.target;
  const currentIndex = colorPickerInputs.indexOf(currentInput);
  console.log(currentIndex);

  gradientData.colors[currentIndex] = currentInput.value.toUpperCase();
  populateUI();
}
