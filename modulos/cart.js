class Cart {
    constructor() {
      this.products = [];
      this.cartElement = document.querySelector("#cart");
      this.cartItemsElement = document.querySelector("#cart-items");
      this.cartOpenButton = document.querySelector("#cart-open-button");
      this.cartCloseButton = document.querySelector("#cart-close-button");
  
      this.cartOpenButton.addEventListener("click", this.openCart.bind(this));
      this.cartCloseButton.addEventListener("click", this.closeCart.bind(this));
  
      this.loadCartFromLocalStorage();
    }
  
    loadCartFromLocalStorage() {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      this.products = cartItems.map(
        (item) =>
          new Product(item.title, item.color, item.price, item.joke)
      );
      this.renderCart();
    }
  
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
  
    addProduct(product) {
      this.products.push(product);
      this.saveCartToLocalStorage();
      this.renderCart();
    }
  
    removeProduct(index) {
      this.products.splice(index, 1);
      this.saveCartToLocalStorage();
      this.renderCart();
    }
  
    clearCart() {
      this.products = [];
      this.saveCartToLocalStorage();
      this.renderCart();
    }
  
    renderCart() {
      this.cartItemsElement.innerHTML = "";
      this.products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = product.createMarkup();
        const removeButton = productElement.querySelector(".remove-product");
        removeButton.addEventListener("click", () => this.removeProduct(index));
        this.cartItemsElement.appendChild(productElement);
      });
    }
  
    openCart() {
      this.cartElement.classList.add("open");
    }
  
    closeCart() {
      this.cartElement.classList.remove("open");
    }
  }
  
  export default Cart;
  