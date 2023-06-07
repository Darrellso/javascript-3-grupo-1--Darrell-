class Product {
  constructor(title, color, price, joke) {
    this.title = title;
    this.color = color;
    this.price = price;
    this.joke = joke;
  }

  render() {
    // Generar el markup del producto en el carrito
    // Puedes utilizar template literals o manipulación del DOM para crear el HTML
    // Por ejemplo:
    return `<div class="cart-product">
              <h3>${this.title} (${this.color})</h3>
              <p>Price: ${this.price}</p>
              <p>Joke: ${this.joke}</p>
              <button class="remove-button">Remove</button>
            </div>`;
  }
}

export default Product;
