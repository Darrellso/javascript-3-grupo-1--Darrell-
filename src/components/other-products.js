import config from '../config.js';
import Publisher from '../Publisher.js';
const wrap = document.querySelector('#other-products-wrap');

const productChange = new Publisher();

function handleProductChange(event) {
  productChange.publish(event.currentTarget.dataset.productid);
}

function initProducts() {
  const products = Object.keys(config);
  products.shift();
  products.forEach((prod) => {
    const btn = document.createElement('button');
    btn.classList.add('other-products__btn');
    btn.dataset.productid = prod;
    btn.addEventListener('click', handleProductChange);
    btn.innerHTML = `<img src="images/product-${prod}-white.jpg" alt="">`;
    wrap.appendChild(btn);
  });
}

export {
  initProducts,
  productChange,
}