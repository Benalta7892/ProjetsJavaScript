let workTime = 1800;
let restTime = 300;

function formattedTime(time) {
  return `${Math.trunc(time / 60)}:${time % 60 < 10 ? `${time % 60}` : time % 60}`;
}

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");

displayWork.textContent = formattedTime(workTime);
displayPause.textContent = formattedTime(restTime);

const togglePlayBtn = document.querySelector(".toggle-btn");
togglePlayBtn.addEventListener("click", togglePomodoro);

function togglePomodoro() {
  hundlePlayPause();
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
