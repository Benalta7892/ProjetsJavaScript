const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=YuJ_6_dWx2uQXLXA9I0z07kKEbdj5NH191AZKCYa_jU`
    );

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const data = await response.json();

    if (!data.total) {
      imagesList.textContent = "";
      throw new Error("Wopsy, rien de tel dans notre base de données... tentez un mot clé plus précis !");
    }

    console.log(data);
    createImages(data.results);
  } catch (error) {
    errorMsg.textContent = `${error}`;
  }
}

fetchData();

function createImages(data) {
  data.forEach((img) => {
    const newImg = document.createElement("img");
    newImg.src = img.urls.regular;
    imagesList.appendChild(newImg);
  });
}
