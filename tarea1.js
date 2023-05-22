import render from './modulos/render.js';
import getRandomJoke from './modulos/apis.js';
import searchJokes from './modulos/searchJokes.js';
import Observer from './modulos/observer.js';

// Crear instancia de Observer
const productObservable = new Observer();

// Variables globales
let selectedProduct = 'Case de teléfono';
let selectedColor = 'blanco';
let selectedJoke = '';

// Funciones auxiliares
function getProductPrice(product, color) {
  const prices = {
    'Case de teléfono': {
      blanco: '$5',
      negro: '$7',
    },
    Poster: {
      blanco: '$3',
      negro: '$5',
    },
    Camisa: {
      blanco: '$10',
      negro: '$13',
    },
    Almohada: {
      blanco: '$12',
      negro: '$15',
    },
  };

  return prices[product][color] || '';
}

function getProductInfo() {
  const products = {
    'Case de teléfono': {
      image: './img/phone-case.jpg',
      price: getProductPrice('Case de teléfono', selectedColor),
      joke: selectedJoke,
    },
    Poster: {
      image: './img/poster.jpg',
      price: getProductPrice('Poster', selectedColor),
      joke: selectedJoke,
    },
    Camisa: {
      image: './img/t-shirt.jpg',
      price: getProductPrice('Camisa', selectedColor),
      joke: selectedJoke,
    },
    Almohada: {
      image: './img/pillow.jpg',
      price: getProductPrice('Almohada', selectedColor),
      joke: selectedJoke,
    },
  };

  return products[selectedProduct];
}

// Renderizar la página principal
render(() => {
  // Obtener referencia a los elementos del DOM
  const productTitle = document.getElementById('productTitle');
  const productPrice = document.getElementById('productPrice');
  const productImage = document.getElementById('productImage');
  const randomButton = document.getElementById('randomButton');
  const colorSelect = document.getElementById('colorSelect');
  const jokeList = document.getElementById('jokeList');
  const searchForm = document.getElementById('searchForm');
  const searchTermInput = document.getElementById('searchTerm');

  // Función para renderizar la información del producto
  function renderProductInfo() {
    productTitle.textContent = `${selectedProduct} - ${selectedColor}`;
    productPrice.textContent = getProductPrice(selectedProduct, selectedColor);
    productImage.src = getProductInfo().image;
  }

  // Función para renderizar el chiste seleccionado
  function renderSelectedJoke() {
    const jokeContainer = document.getElementById('selectedJoke');
    jokeContainer.textContent = selectedJoke;
  }

  // Función para renderizar la lista de chistes
  function renderJokeList(jokes) {
    jokeList.innerHTML = '';

    jokes.forEach((joke) => {
      const listItem = document.createElement('li');
      listItem.textContent = joke;
      jokeList.appendChild(listItem);
    });
  }

  // Función para realizar la búsqueda de chistes
  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchTermInput.value.trim();

    searchJokes(searchTerm)
      .then((jokes) => {
        renderJokeList(jokes);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Suscribir los componentes al Observer
  productObservable.subscribe('product', () => {
    renderProductInfo();
    renderSelectedJoke();
  });

  productObservable.subscribe('color', () => {
    renderProductInfo();
  });

  productObservable.subscribe('joke', () => {
    renderSelectedJoke();
  });

  // Obtener un chiste aleatorio y renderizar la página inicial
  getRandomJoke()
    .then((joke) => {
      selectedJoke = joke;
      renderProductInfo();
      renderSelectedJoke();
    })
    .catch((error) => {
      console.log(error.message);
    });

  // Evento para generar un chiste aleatorio
  randomButton.addEventListener('click', () => {
    getRandomJoke()
      .then((joke) => {
        selectedJoke = joke;
        productObservable.notify('joke');
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // Evento para cambiar el color del producto
  colorSelect.addEventListener('change', (event) => {
    selectedColor = event.target.value;
    productObservable.notify('color');
  });

  // Evento para buscar chistes
  searchForm.addEventListener('submit', handleSearch);
});
