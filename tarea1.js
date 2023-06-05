import render from "./modulos/render.js";
import getRandomJoke from "./modulos/apis.js";
import searchJokes from "./modulos/searchJokes.js";

render();

const randomButton = document.querySelector("#randomButton");
const searchForm = document.querySelector("#searchForm");

randomButton.addEventListener("click", () => {
  getRandomJoke()
    .then((joke) => {
      const jokeList = document.querySelector("#jokeList");
      jokeList.innerHTML = `<a href="ecomerse.html?joke=${encodeURIComponent(joke)}">${joke}</a>`;
      window.location.href = `ecomerse.html?joke=${encodeURIComponent(joke)}`;
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

  searchJokes(searchTerm)
    .then((results) => {
      const jokeList = document.querySelector("#jokeList");

      if (results.length === 0) {
        jokeList.innerHTML = "<li>No hubo resultados</li>";
      } else {
        const jokeLinks = results.map((joke) => `<a href="ecomerse.html?joke=${encodeURIComponent(joke)}">${joke}</a>`);
        jokeList.innerHTML = jokeLinks.join("");
        window.location.href = `ecomerse.html?joke=${encodeURIComponent(results[0])}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default render;
