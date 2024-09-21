let dataArray;

async function getUsers() {
  try {
    const response = await fetch("https://randomuser.me/api/?nat=fr&results=50");

    const { results } = await response.json();
    orderList(results);
    dataArray = results;
    createUserList(dataArray);
  } catch (error) {
    console.error(error);
  }
}

getUsers();

function orderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
}

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.className = "table-item";

    listItem.innerHTML = `

        <p class="main-info">
          <img src=${user.picture.thumbnail} alt="avatar picture">
          <span>
            ${user.name.last} ${user.name.first}
          </span>
        </p>
        <p class="email">${user.mail}</p>
        <p class="phone">${user.phone}</p>

    `;
    tableResults.appendChild(listItem);
  });
}
