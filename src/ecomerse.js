import { initProducts } from './components/other-products.js';
import { initVisualizer } from './components/visualizer.js';
import { initDetails } from './components/details.js';
import { initColors } from './components/colors.js';
import getRandomJoke from './components/randomJoke.js';

const jokeContainer = document.querySelector("#main-joke");
const jokeListItems = document.querySelectorAll("#jokeList p");
const randomJokeButton = document.querySelector("#randomJokeButton");

const urlParams = new URLSearchParams(window.location.search);
const joke = urlParams.get("joke");

if (joke) {
  jokeContainer.textContent = joke;
  jokeListItems.forEach(item => {
    item.textContent = joke;
  });
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
    jokeListItems.forEach(item => {
      item.textContent = joke;
    });
  } catch (error) {
    console.error(error);
    jokeContainer.textContent = "No se pudo obtener el chiste";
    jokeListItems.forEach(item => {
      item.textContent = "No se pudo obtener el chiste";
    });
  }
});

// Constructor de productos
class Product {
  constructor(title, color, price, joke) {
    this.title = title;
    this.color = color;
    this.price = price;
    this.joke = joke;
  }

  // Método para crear el markup del producto en el carrito
  createMarkup() {
    return `<div class="product">
              <h3>${this.title} - ${this.color}</h3>
              <p>Precio: $${this.price}</p>
              <p>Chiste: ${this.joke}</p>
              <button class="remove-btn">Remover</button>
            </div>`;
  }
}

// Módulo para la gestión del carrito
const cartModule = (function () {
  let products = [];

  // Método para agregar un producto al carrito
  function addProduct(product) {
    if (product instanceof Product) {
      products.push(product);
      updateLocalStorage();
    } else {
      console.error('El producto no es una instancia de Product');
    }
  }

  // Método para remover un producto del carrito
  function removeProduct(index) {
    products.splice(index, 1);
    updateLocalStorage();
  }

  // Método para remover todos los productos del carrito
  function removeAllProducts() {
    products = [];
    updateLocalStorage();
  }

  // Método para actualizar la información en localStorage
  function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(products));
  }

  // Método para obtener la lista de productos del carrito
  function getProducts() {
    return products;
  }

  // Método para inicializar el carrito desde localStorage
  function initCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      products = JSON.parse(cartData);
    }
  }

  return {
    addProduct,
    removeProduct,
    removeAllProducts,
    getProducts,
    initCartFromLocalStorage,
  };
})();

// Ejemplo de uso:
cartModule.initCartFromLocalStorage(); // Inicializar el carrito desde localStorage

// Evento para agregar un producto al carrito
document.getElementById('add-to-cart-btn').addEventListener('click', function () {
  const title = document.getElementById('title').textContent;
  const color = document.querySelector('input[name="color"]:checked').getAttribute('data-id');
  const price = parseFloat(document.getElementById('price').textContent.slice(1)); // Eliminar el símbolo "$" antes de convertir a número
  const joke = document.getElementById('main-joke').textContent;

  const product = new Product(title, color, price, joke);
  cartModule.addProduct(product);
  renderCart(); // Actualizar la visualización del carrito
});

// Evento para remover un producto del carrito
document.getElementById('cart-items').addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-btn')) {
    const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
    cartModule.removeProduct(index);
    renderCart(); // Actualizar la visualización del carrito
  }
});

// Evento para remover todos los productos del carrito
document.getElementById('cart-close-button').addEventListener('click', function () {
  cartModule.removeAllProducts();
  renderCart(); // Actualizar la visualización del carrito
});

// Mostrar los productos del carrito
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  const products = cartModule.getProducts();
  for (let i = 0; i < products.length; i++) {
    if (products[i] instanceof Product) {
      const productMarkup = products[i].createMarkup();
      cartContainer.innerHTML += productMarkup;
    } else {
      console.error('El elemento en products no es una instancia de Product');
    }
  }
}

// Renderizar el carrito al cargar la página
renderCart();
