const video = document.querySelector(".video");
const playToggler = document.querySelector(".play-toggler");
const togglerImg = document.querySelector(".play-toggler img");

video.addEventListener("click", togglePlay);
playToggler.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    togglerImg.src = "ressources/pause.svg";
    video.play();
  } else {
    togglerImg.src = "ressources/play.svg";
    video.pause();
  }
}

const timersDisplay = document.querySelectorAll(".time-display");

video.addEventListener("loadeddata", fillDurationVariable); // Actualisation de la page de façon asynchrone
window.addEventListener("load", fillDurationVariable); // Actualisation classique de la page

let current;
let totalDuration;

function fillDurationVariable(e) {
  if (Number.isNaN(video.duration)) return;
  console.log(e.type);

  current = video.currentTime;
  totalDuration = video.duration;
  console.log(totalDuration);

  formatValue(current, timersDisplay[0]);
  formatValue(totalDuration, timersDisplay[1]);

  video.removeEventListener("loadeddata", fillDurationVariable);
  window.removeEventListener("load", fillDurationVariable);
}

function formatValue(val, element) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  // if (currentMin < 10) {
  //   currentMin = `0${currentMin}`;
  // }

  element.textContent = `${currentMin}:${currentSec}`;
}

const progress = document.querySelector(".progress");

video.addEventListener("timeupdate", handleTimeUpdate);

function handleTimeUpdate() {
  current = video.currentTime;

  formatValue(current, timersDisplay[0]);

  // Pour avoir la position de la barre de progression
  const progressPosition = current / totalDuration;
  progress.style.transform = `scaleX(${progressPosition})`;

  if (video.ended) {
    togglerImg.src = "ressources/play.svg";
  }
}

const muteBtn = document.querySelector(".mute-btn");
const muteIcon = document.querySelector(".mute-btn img");

muteBtn.addEventListener("click", handleMute);

function handleMute() {
  if (video.muted) {
    video.muted = false;
    muteIcon.src = "ressources/unmute.svg";
  } else {
    video.muted = true;
    muteIcon.src = "ressources/mute.svg";
  }
}

const volumeSlider = document.querySelector(".volume-slider");

volumeSlider.addEventListener("input", handleVolumeModification);

function handleVolumeModification() {
  video.volume = volumeSlider.value / 100;

  if (video.volume === 0) {
    muteIcon.src = "ressources/mute.svg";
  } else {
    muteIcon.src = "ressources/unmute.svg";
  }
}

const progressBar = document.querySelector(".progress-bar");

let rect = progressBar.getBoundingClientRect();
let largeur = rect.width;
window.addEventListener("resize", handleResize);

function handleResize() {
  rect = progressBar.getBoundingClientRect();
  largeur = rect.width;
}

progressBar.addEventListener("click", handleProgressNavigation);

function handleProgressNavigation(e) {
  const x = e.clientX - rect.left;

  const widthPercent = x / largeur;

  video.currentTime = video.duration * widthPercent;
}

const fullScreenToggler = document.querySelector(".fullscreen-toggler");
const videoContainer = document.querySelector(".video-container");

video.addEventListener("dblclick", toggleFullScreen);
fullScreenToggler.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}
