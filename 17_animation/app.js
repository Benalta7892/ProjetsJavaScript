const customCursor = document.querySelector(".custom-cursor");

window.addEventListener("mousemove", handleCustomCursor);

function handleCustomCursor(e) {
  customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const heroPushLink = document.querySelector(".hero-push-link");
const txt = "Porsche, set free.";

function typeWriter(text, index) {
  if (index > 3) subtitle.classList.add("active");
  if (index > 6) heroPushLink.classList.add("active");
  if (index < text.length) {
    setTimeout(() => {
      title.innerHTML += `<span>${text[index]}</span>`;
      typeWriter(text, index + 1);
    }, 200);
  }
}

setTimeout(() => {
  typeWriter(txt, 0);
}, 300);
