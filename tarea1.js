import render from "./modulos/render.js";
import getRandomJoke from "./modulos/apis.js";
import searchJokes from "./modulos/searchJokes.js";

import { initProducts } from './src/components/other-products.js';
import { initVisualizer } from './src/components/visualizer.js';
import { initDetails } from './src/components/details.js';
import { initColors } from './src/components/colors.js';

const jokeContainer = document.querySelector("#main-joke");
const jokeList = document.querySelector("#jokeList");
const randomJokeButton = document.querySelector("#randomJokeButton");

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  jokeContainer.textContent = joke;
  jokeList.innerHTML = `<p>${joke}</p>`;
}

getRandomJoke();

initVisualizer();
initDetails();
initProducts();
initColors();

randomJokeButton.addEventListener("click", async () => {
  try {
    const joke = await getRandomJoke();
    jokeContainer.textContent = joke;
    jokeList.innerHTML = `<p>${joke}</p>`;
  } catch (error) {
    console.error(error);
    jokeContainer.textContent = "No se pudo obtener el chiste";
    jokeList.innerHTML = "<p>No se pudo obtener el chiste</p>";
  }
});

render();

const randomButton = document.querySelector("#randomButton");
const searchForm = document.querySelector("#searchForm");

randomButton.addEventListener("click", () => {
  getRandomJoke()
    .then((joke) => {
      jokeContainer.textContent = joke;
      jokeList.innerHTML = `<p>${joke}</p>`;
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
      if (results.length === 0) {
        jokeList.innerHTML = "<p>No hubo resultados</p>";
      } else {
        const jokeLinks = results.map((joke) => `<p>${joke}</p>`);
        jokeList.innerHTML = jokeLinks.join("");
        jokeContainer.textContent = results[0];
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default render;
