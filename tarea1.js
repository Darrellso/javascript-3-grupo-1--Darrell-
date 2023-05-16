const appContainer = document.querySelector("#app");

function render() {
  const content = `
    <h1>Chistes</h1>
    <button class="randomButton" id="randomButton">Chiste Random</button>
    <form id="searchForm">
      <input type="text" id="searchTerm" placeholder="Buscar chistes" />
      <button type="submit">Buscar</button>
    </form>
    <ul id="jokeList"></ul>
  `;
  
  appContainer.innerHTML = content;
}

render();

const randomButton = document.querySelector("#randomButton");
const searchForm = document.querySelector("#searchForm");

randomButton.addEventListener("click", () => {
  fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jokeList = document.querySelector("#jokeList");
      jokeList.innerHTML = `<li>${data.joke}</li>`;
    })
    .catch((error) => {
      console.log(error);
    });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const searchTerm = document.querySelector("#searchTerm").value;
  if (!searchTerm) {
    return;
  }
  
  fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jokeList = document.querySelector("#jokeList");
      
      if (data.results.length === 0) {
        jokeList.innerHTML = "<li>No hubo resultados</li>";
      } else {
        jokeList.innerHTML = data.results
          .map((result) => `<li>${result.joke}</li>`)
          .join("");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
