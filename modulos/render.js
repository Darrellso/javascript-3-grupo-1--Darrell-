function render(callback) {
  const appContainer = document.querySelector('#app');

  const content = `
    <h1>Chistes</h1>
    <div id="productInfo">
      <h2 id="productTitle"></h2>
      <img id="productImage" src="" alt="">
      <p>Precio: <span id="productPrice"></span></p>
      <p>Chiste seleccionado: <span id="selectedJoke"></span></p>
    </div>
    <div id="productOptions">
      <h2>Opciones de producto</h2>
      <div>
        <label for="colorSelect">Color:</label>
        <select id="colorSelect">
          <option value="blanco">Blanco</option>
          <option value="negro">Negro</option>
        </select>
      </div>
      <h3>Chistes</h3>
      <button id="randomButton">Chiste Random</button>
      <form id="searchForm">
        <input type="text" id="searchTerm" placeholder="Buscar chistes" />
        <button type="submit">Buscar</button>
      </form>
      <ul id="jokeList"></ul>
    </div>
    <div id="otherProducts" class="other-products">
      <a href="#" data-product="Poster">Ver Poster</a>
      <a href="#" data-product="Camisa">Ver Camisa</a>
      <a href="#" data-product="Almohada">Ver Almohada</a>
    </div>
  `;

  appContainer.innerHTML = content;

  const productImage = document.getElementById('productImage');
  productImage.src = 'product-case-white.jpg';

  callback();
}

export default render;
