function render(callback) {
  const appContainer = document.querySelector("#app");

  const content = `
    <h1>Chistes</h1>
    <button id="randomButton">Chiste Random</button>
    <form id="searchForm">
      <input type="text" id="searchTerm" placeholder="Buscar chistes" />
      <button type="submit">Buscar</button>
    </form>
    <ul id="jokeList"></ul>
  `;

  appContainer.innerHTML = content;

  const searchForm = document.getElementById("searchForm");
  const searchTermInput = document.getElementById("searchTerm");
  const jokeList = document.getElementById("jokeList");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchTermInput.value;
    searchJokes(searchTerm)
      .then((jokes) => {
        renderJokes(jokes);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  if (typeof callback === "function") {
    callback();
  }
}

function renderJokes(jokes) {
  const jokeList = document.getElementById("jokeList");
  jokeList.innerHTML = "";
  jokes.forEach((joke) => {
    const li = document.createElement("li");
    li.textContent = joke;
    jokeList.appendChild(li);
  });
}

export default render;
