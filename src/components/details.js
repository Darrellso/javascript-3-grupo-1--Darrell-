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
  title.innerHTML = `${state.color} ${product} with joke`;
  price.innerHTML = `${prices[product][state.color]}`;
  state.product = product;
}

function handleColorChange(color) {
  title.innerHTML = `${color} ${state.product} with joke`;
  price.innerHTML = `${prices[state.product][color]}`;
  state.color = color;
}

function initDetails() {
  productChange.subscribe(handleProductChange);
  colorChange.subscribe(handleColorChange);
}

export {
  initDetails
}