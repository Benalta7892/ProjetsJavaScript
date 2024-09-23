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

// push down button
heroPushLink.addEventListener("click", slideDown);

function slideDown(e) {
  e.preventDefault();
  window.scrollTo({
    top: document.querySelector(`${e.target.getAttribute("href")}`).offsetTop,
    behavior: "smooth",
  });
  // document.querySelector(`${e.target.getAttribute("href")}`).scrollIntoView({ behavior: "smooth" });
  // La methode scrollIntoView alternative mais ce n'ai pas encore supporté par tous les navigateurs
}

// Scroll animations

const generalAnimatedElements = [...document.querySelectorAll("h2"), ...document.querySelectorAll(".section-subtitle")];

const discoverSectionElements = [
  document.querySelector(".text-discover-content h3"),
  document.querySelector(".text-discover-content p"),
  document.querySelector(".discover-link"),
  document.querySelector(".discover-main-img"),
];

const slideInContent = [...document.querySelectorAll(".side-apparition-container")];

const animatedContent = [...generalAnimatedElements, ...discoverSectionElements, ...slideInContent];

const intersectionObserver = new IntersectionObserver(handleintersect, { rootMargin: "-10%" });

animatedContent.forEach((el) => intersectionObserver.observe(el));

function handleintersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      intersectionObserver.unobserve(entry.target);
    }
  });
}
