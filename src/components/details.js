import { productChange } from './other-products.js';
import prices from '../config.js';
import { colorChange } from './colors.js';

const title = document.querySelector('#title');
const price = document.querySelector('#price');
const joke = document.querySelector('#selected-joke');
let state = {
  color: 'white',
  product: 'shirt'
};

function handleProductChange(product) {
  updateDetails(product, state.color);
}

function handleColorChange(color) {
  updateDetails(state.product, color);
}

function updateDetails(product, color) {
  const productPrice = prices[product][color];

  title.innerHTML = `${color} ${product} with joke`;
  price.innerHTML = `${productPrice}`;
  state = {
    product: product,
    color: color
  };
}

function initDetails() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

export {
  initDetails
};
