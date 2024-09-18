let workTime = 3;
let restTime = 3;

function formattedTime(time) {
  return `${Math.trunc(time / 60)}:${time % 60 < 10 ? `${time % 60}` : time % 60}`;
}

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");

displayWork.textContent = formattedTime(workTime);
displayPause.textContent = formattedTime(restTime);

const togglePlayBtn = document.querySelector(".toggle-btn");
togglePlayBtn.addEventListener("click", togglePomodoro);

let currentInterval = false;
let timerID;

function togglePomodoro() {
  hundlePlayPause();

  if (currentInterval) return;
  currentInterval = true;

  workTime--;
  displayWork.textContent = formattedTime(workTime);

  timerID = setInterval(handleTicks, 1000);
}

let pause = true;
function hundlePlayPause() {
  if (togglePlayBtn.getAttribute("data-toggle") === "play") {
    pause = false;
    togglePlayBtn.firstElementChild.src = "ressources/pause.svg";
    togglePlayBtn.setAttribute("data-toggle", "pause");
  } else {
    pause = true;
    togglePlayBtn.firstElementChild.src = "ressources/play.svg";
    togglePlayBtn.setAttribute("data-toggle", "play");
  }
}

const cycles = document.querySelector(".cycles");
let cyclesNumber = 0;

function handleTicks() {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formattedTime(workTime);
  } else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayPause.textContent = formattedTime(restTime);
  } else if (!pause && !workTime && !restTime) {
    workTime = 3 - 1;
    restTime = 3;
    displayWork.textContent = formattedTime(workTime);
    displayPause.textContent = formattedTime(restTime);

    cyclesNumber++;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`;
  }
}
