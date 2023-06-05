import { initProducts } from './components/other-products.js';
import { initVisualizer } from './components/visualizer.js';
import { initDetails } from './components/details.js';
import { initColors } from './components/colors.js';

const jokeContainer = document.querySelector("#main-joke");

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  jokeContainer.textContent = joke;
}


initVisualizer();
initDetails();
initProducts();
initColors();