import { initProducts } from './components/other-products.js';
import { initVisualizer } from './components/visualizer.js';
import { initDetails } from './components/details.js';
import { initColors } from './components/colors.js';
import getRandomJoke from './components/randomJoke.js';

const jokeContainer = document.querySelector("#main-joke");
const randomJokeButton = document.querySelector("#randomJokeButton");

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  jokeContainer.textContent = joke;
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
  } catch (error) {
    console.error(error);
    jokeContainer.textContent = "No se pudo obtener el chiste";
  }
});
