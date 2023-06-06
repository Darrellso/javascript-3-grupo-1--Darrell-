import config from '../config.js';
import Publisher from '../Publisher.js';

const wrap = document.querySelector('#other-products-wrap');
const productChange = new Publisher();

function handleProductChange(event) {
  const productId = event.currentTarget.dataset.productid;
  productChange.publish(productId);
}

function createProductButton(productId) {
  const btn = document.createElement('button');
  btn.classList.add('other-products__btn');
  btn.dataset.productid = productId;
  btn.addEventListener('click', handleProductChange);
  btn.innerHTML = `<img src="images/product-${productId}-white.jpg" alt="">`;
  return btn;
}

function initProducts() {
  const products = Object.keys(config);
  products.shift();
  products.forEach((prod) => {
    const productButton = createProductButton(prod);
    wrap.appendChild(productButton);
  });
}

export {
  initProducts,
  productChange,
};
