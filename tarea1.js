import render from './modulos/render.js';
import searchJokes from './modulos/searchJokes.js';
import Observer from './modulos/observer.js';
import getRandomJoke from './modulos/apis.js';


const productObservable = new Observer();
const colorObservable = new Observer();
const jokeObservable = new Observer();

let selectedProduct = 'Case de teléfono';
let selectedColor = 'blanco';
let selectedJoke = '';

function renderProductPage() {
  const appContainer = document.querySelector("#app");

  const content = `
    <h1>Producto</h1>
    <div class="product">
      <div class="product-image">
        <img src="product-image-${selectedColor}.jpg" alt="${selectedProduct}" />
      </div>
      <div class="product-info">
        <h2>${selectedProduct} (${selectedColor})</h2>
        <p>Precio: ${getProductPrice(selectedProduct, selectedColor)}</p>
        <p>Chiste seleccionado: ${selectedJoke}</p>
      </div>
    </div>
    <div class="random-joke">
      <h2>Chiste Random</h2>
      <button id="randomButton">Generar Chiste Random</button>
      <p id="randomJoke"></p>
    </div>
    <div class="other-products">
      <h2>Otros productos</h2>
      <ul>
        <li><a href="#" data-product="Case de teléfono">Case de teléfono</a></li>
        <li><a href="#" data-product="Poster">Poster</a></li>
        <li><a href="#" data-product="Camisa">Camisa</a></li>
        <li><a href="#" data-product="Almohada">Almohada</a></li>
      </ul>
    </div>
  `;

  appContainer.innerHTML = content;

  const randomButton = document.getElementById("randomButton");
  const randomJoke = document.getElementById("randomJoke");
  randomButton.addEventListener("click", () => {
    getRandomJoke()
      .then((joke) => {
        randomJoke.textContent = joke;
        selectedJoke = joke;
        jokeObservable.notify(joke);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const productLinks = document.querySelectorAll(".other-products a");
  productLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const product = link.dataset.product;
      selectedProduct = product;
      productObservable.notify(product);
    });
  });
}

render(renderProductPage);

function getProductPrice(product, color) {
  const prices = {
    'Case de teléfono': {
      blanco: '$5',
      negro: '$7',
    },
    'Poster': {
      blanco: '$3',
      negro: '$5',
    },
    'Camisa': {
      blanco: '$10',
      negro: '$13',
    },
    'Almohada': {
      blanco: '$12',
      negro: '$15',
    },
  };

  return prices[product][color] || '';
}
