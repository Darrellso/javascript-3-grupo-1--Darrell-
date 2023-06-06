import { productChange } from './other-products.js';
import { colorChange } from './colors.js';

const image = document.querySelector('#main-img');
const joke = document.querySelector('#main-joke');
let state = {
  color: 'white',
  product: 'shirt'
};

function handleProductChange(product) {
  updateImageSource(product, state.color);
  state.product = product;
}

function handleColorChange(color) {
  updateImageSource(state.product, color);
  updateJokeClass(color);
  state.color = color;
}

function updateImageSource(product, color) {
  image.setAttribute('src', `images/product-${product}-${color}.jpg`);
}

function updateJokeClass(color) {
  joke.classList.remove(`with-${state.color}-img`);
  joke.classList.add(`with-${color}-img`);
}

function initVisualizer() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

export {
  initVisualizer
};
